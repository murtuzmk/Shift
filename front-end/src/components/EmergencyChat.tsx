import React, {useState, ChangeEvent, FormEvent, useRef, useEffect}from "react";
import { set } from "react-hook-form";

/* Emergency Chat Component on Sidebar Visible on all pages */
const EmergencyChat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [numMessage, setNumMessage] = useState(0);

    const maxCount = 6;
    const handleSend = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Stop refresh
        /* Way to clear the chat box - Change later*/
        if (newMessage === "clear") {
            setMessages([]);
            return;
        }
        /* Dont add empty messages*/
        if (newMessage.trim() !== "") {
            setNumMessage(numMessage + 1);
            /* spamming */
            if (numMessage >= maxCount) {
                // Remove the first message
                window.alert("You are sending too many messages!");
                return;
            } else {
                setTimeout(() => {
                    setNumMessage(numMessage - 1);
                }, 30000);
            }
            // Adding that new message to the feed basically
            setMessages([...messages, newMessage]);
            setNewMessage("");
        }
    }
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    }

    useEffect(() => {
        // Scroll to the bottom every time messages update
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="fixed bottom-0 left-0 w-64 bg-white border-t border-gray-300 shadow-lg z-50">
            <ul className="list-none m-0 p-2 overflow-y-auto max-h-32">
                {messages.map((message, index) => (
                    <li key={index} className="bg-gray-100 rounded-full px-4 py-2 mb-2 break-words">
                        {message}
                    </li>
                ))}
                <div ref={messagesEndRef} />
            </ul>
            <form onSubmit={handleSend} className="flex justify-between items-center p-2">
                <input
                    type="text"
                    className="flex-grow mr-2 p-2 border-none"
                    value={newMessage}
                    onChange={handleChange}
                    placeholder="Emergency Chat"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send
                </button>
            </form>
        </div>
    );
}
export default EmergencyChat;