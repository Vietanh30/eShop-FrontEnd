"use client";

import {
  AiOutlineEllipsis,
  AiOutlineClose,
  AiOutlineSend,
} from "react-icons/ai";
import chatAvatar1 from "../../../src/image/chatbot/chatAvatar1.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { getMessage, sendMessage } from "@/app/api/messageApi";
import { useRouter } from "next/navigation";
import { getProductById } from "@/app/api/productApi";
import BotMessage from "./botMessage";

const ChatBotButton = () => {
  const { isOpen, setStateChat } = useChat();

  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [input, setInput] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [messages, setMessages] = useState([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("user-token");
      if (token) {
        setIsLogin(true);
        const res = await getMessage(token);
        setMessages(res);
      }
    })();
  }, [isLoadingChat]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input !== "") {
      const token = localStorage.getItem("user-token");

      setInput("");
      setIsLoadingChat(true);
      const res = await sendMessage(token, input);
      setIsLoadingChat(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  return isOpen ? (
    <div className="fixed max-[600px]:right-2 max-[600px]:left-2 right-4 bottom-4 py-2 bg-white drop-shadow-lg rounded-xl border-2 border-blue-300 z-50 max-[600px]:w-[94%] w-[280px] h-[400px]">
      <div
        onClick={() => setStateChat(!isOpen)}
        className="flex justify-between items-center border-b border-blue-300 pb-2 px-4"
      >
        <AiOutlineEllipsis className="text-[#667085] cursor-pointer" />
        <p className="text-[#667085] font-medium text-xs">E-Mobile Chat</p>
        <AiOutlineClose className="text-[#667085] cursor-pointer" />
      </div>
      <div className="overflow-y-auto w-full pb-4 px-2 h-[323px] rounded-b-xl bg-[#F5F5F5]">
        {messages?.map((message, index) => {
          return (
            <div
              key={index}
              className={
                !(index % 2)
                  ? "mr-0 ml-auto w-[80%] my-2 text-right"
                  : "flex items-start w-[90%] my-2"
              }
            >
              {!(index % 2) ? (
                <p className="py-1.5 px-3 break-all text-xs text-white bg-[#003DF5] rounded-xl inline-block">
                  {message?.content}
                </p>
              ) : (
                <BotMessage message={message} />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white border-t border-blue-300 h-[40px] rounded-b-xl flex justify-between items-center px-4">
        <input
          value={input}
          type="text"
          name="message"
          id="message"
          className="text-xs text-[#333] w-[80%] outline-none text-balance"
          placeholder="Nhập tin nhắn"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <AiOutlineSend
          className="text-[#003DF5] cursor-pointer"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  ) : (
    <div
      className="cursor-pointer animate-bounce fixed right-4 bottom-16 px-4 py-2 bg-white drop-shadow-lg rounded-3xl border-2 border-blue-300 z-50"
      onClick={() => {
        if (!isLogin) router.push("/login");
        else setStateChat(!isOpen);
      }}
    >
      <div className="flex flex-row items-center gap-x-2 relative">
        <span className="h-4 w-4 rounded-full bg-green-700 absolute -bottom-4 -right-3 border border-blue-300"></span>
        <p className="font-semibold text-blue-300">ChatAI</p>
        <div className="p-2 rounded-full bg-blue-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatBotButton;
