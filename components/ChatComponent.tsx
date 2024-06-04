"use client";
import React from "react";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import Input from "./Input";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Header */}
      <div className="sticky top-0 inset-x-0 p-4 bg-white shadow-md z-10 rounded-lg hidden md:block">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* Message List */}
      <div id="message-container" className="flex-1 overflow-auto p-2">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="sticky bottom-0 inset-x-0 p-2">
        <div className="flex items-center">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 mr-2 text-white"
          />
          <Button type="submit" className="bg-gray-900 text-white">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
