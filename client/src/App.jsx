import {useState} from 'react'
import './App.css'
import {io} from "socket.io-client";
import Chat from "./Chat.jsx";

const socket = io("http://localhost:5002");

function App() {
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [showChat, setShowChat] = useState(false);
    const joinRoom = () => {
        if(userName !== "" && roomName!== "") {
            socket.emit("join_room", roomName);
            setShowChat(true);
        }
    }
    return (
        <>
            <div className="App">
                {!showChat ? (
                    <div className="joinChatContainer">
                        <h3>Join Chat</h3>
                        <input type={'text'} placeholder={'John...'} value={userName}
                               onChange={e => setUserName(e.target.value)}/>
                        <input type={'text'} placeholder={'Room Id...'} value={roomName}
                               onChange={e => setRoomName(e.target.value)}/>
                        <button onClick={joinRoom}>Join A Room</button>
                    </div>
                ) : <Chat socket={socket} username={userName} room={roomName} />
                }

            </div>
        </>
    )
}

export default App
