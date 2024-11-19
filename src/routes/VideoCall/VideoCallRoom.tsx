import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RoomContext } from "../../context/RoomContext"
import { VideoPlayer } from "../../components/VideoPlayer"
import { ShareScreenButton } from "../../components/ShareScreenButton"
import { PeerState } from "../../context/peerReducer"

export const Room = () => {
    const { id } = useParams()
    const { ws, me, stream, peers, shareScreen } = useContext(RoomContext)
    console.log(peers)

   useEffect(() => {
    if (me && stream) {
        ws.emit("join-room", { roomId: id, peerId: me.id });
    }
}, [id, me, stream, ws]);


return (
    <>
        Room id Number: {ws.id}
        <div className="grid grid-cols-4 gap-4">
            {stream && <VideoPlayer stream={stream} />}
            {Object.values(peers as PeerState).map((peer) =>
                peer.stream ? <VideoPlayer stream={peer.stream} key={peer.stream.id} /> : null
            )}
        </div>
        <div className="fixed bottom-0 p-6 w-full flex justify-center border-t-2">
            <ShareScreenButton onClick={shareScreen} />
        </div>
    </>
);

}
