"use client";
import { DrizzleChat } from '@/lib/db/schema';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import SubscriptionButton from './SubscriptionButton';

type Props = {
  chats: DrizzleChat[],
  chatId: number,
  isPro: boolean,
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col w-full h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-solid border-white border mb-4 hover:text-gray-400">
          <PlusCircle className="mr-2 w-4 h-4" />
          <p>New Chat</p>
        </Button>
      </Link>
      <div className="flex flex-col gap-2 flex-grow overflow-y-auto">
        {chats.map(chat => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div className={cn('rounded-lg p-3 text-slate-300 flex items-center', {
              'bg-white text-gray-700': chat.id === chatId,
              'hover:text-white': chat.id !== chatId
            })}>
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">{chat.pdfName}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 mb-4"> {/* Added mb-4 for bottom space */}
        <Link href="/">
          <Button className="hover:cursor-pointer">
            Home
          </Button>
        </Link>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default ChatSideBar;
