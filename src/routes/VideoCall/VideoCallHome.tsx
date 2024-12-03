import { useEffect } from "react";
import { Join } from "../../components/CreateButton";
import { RoomProvider } from "../../context/RoomContext";
import { useSocket } from "../../context/SocketContext";

export const VideoCallHome = () => {

    return (
        <div className="App flex items-center justify-center w-screen h-screen">
            <RoomProvider>
                <Join />
            </RoomProvider>
            
        </div>
    );
};