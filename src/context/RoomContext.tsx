import Peer, { MediaConnection } from 'peerjs';
import React, { createContext, useEffect, useState, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { v4 as uuidV4 } from "uuid";
import { peersReducer } from './peerReducer';
import { addPeerAction, removePeerAction } from './peerActions';

const WS = 'http://127.0.0.1:8000';
export const RoomContext = createContext<null | any>(null);
const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const navigate = useNavigate();
    const [me, setMe] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [screenSharingId, setScreenSharingId] = useState<string>();
    const peerConnectionsRef = useRef<Map<string, MediaConnection>>(new Map());

    const enterRoom = ({ roomId }: { roomId: string }) => {
        console.log({ roomId });
        navigate(`/room/${roomId}`);
    };

    const getUsers = ({ participants }: { participants: string[] }) => {
        const uniqueParticipants = Array.from(new Set(participants));
        uniqueParticipants.forEach((peerId) => {
            if (peerId !== me?.id && !peerConnectionsRef.current.has(peerId)) {
                console.log("User joined:", peerId);
                const call = me?.call(peerId, stream!);
                call?.on("stream", (peerStream) => {
                    dispatch(addPeerAction(peerId, peerStream));
                });

                if (call) {
                    peerConnectionsRef.current.set(peerId, call);
                }
            }
        });

        console.log("Participants:", uniqueParticipants);
    };

    const removePeer = (peerId: string) => {
        dispatch(removePeerAction(peerId));
        peerConnectionsRef.current.delete(peerId);
    };

    const switchStream = (stream: MediaStream) => {
        setStream(stream);
        setScreenSharingId(me?.id || "");

        peerConnectionsRef.current.forEach((connection) => {
            const videoTrack = stream.getTracks().find(track => track.kind === "video");
            const sender = connection.peerConnection.getSenders().find(s => s.track?.kind === "video");

            if (sender && videoTrack) {
                sender.replaceTrack(videoTrack).catch((error) => console.error(error));
            }
        });
    };

    const shareScreen = () => {
        if (screenSharingId) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(switchStream);
        } else {
            navigator.mediaDevices.getDisplayMedia({}).then(switchStream);
        }
    };

    useEffect(() => {
        const setupPeerAndStream = async () => {
            const peer = new Peer(uuidV4());
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    
            setMe(peer);
            setStream(userStream);
    
            peer.on("call", (call) => {
                call.answer(userStream);
                call.on("stream", (peerStream) => {
                    dispatch(addPeerAction(call.peer, peerStream));
                });
                peerConnectionsRef.current.set(call.peer, call);
            });
        };
    
        setupPeerAndStream().catch((error) =>
            console.error("Erro ao configurar Peer e Stream:", error)
        );
    
        ws.on("room-created", enterRoom);
        ws.on("get-users", getUsers);
        ws.on("user-disconnected", removePeer);
    
        return () => {
            ws.off("room-created", enterRoom);
            ws.off("get-users", getUsers);
            ws.off("user-disconnected", removePeer);
        };
    }, []);
    

    useEffect(() => {
        if (!me || !stream) return;

        const handleUserJoined = ({ peerId }: { peerId: string }) => {
            if (!peerConnectionsRef.current.has(peerId)) {
                const call = me.call(peerId, stream);
                call?.on("stream", (peerStream) => {
                    dispatch(addPeerAction(peerId, peerStream));
                });

                if (call) {
                    peerConnectionsRef.current.set(peerId, call);
                }
            }
        };

        const handleIncomingCall = (call: MediaConnection) => {
            call.answer(stream);
            call.on("stream", (peerStream) => {
                dispatch(addPeerAction(call.peer, peerStream));
            });

            peerConnectionsRef.current.set(call.peer, call);
        };

        ws.on("user-joined", handleUserJoined);
        me.on("call", handleIncomingCall);

        return () => {
            ws.off("user-joined", handleUserJoined);
            me.off("call", handleIncomingCall);
        };
    }, [me, stream]);

    useEffect(() => {
        console.log({ peers });
    }, [peers]);

    return (
        <RoomContext.Provider value={{ ws, me, stream, peers, shareScreen }}>
            {children}
        </RoomContext.Provider>
    );
};
