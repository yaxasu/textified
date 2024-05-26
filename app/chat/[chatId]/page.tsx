import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";
import { checkSubscription } from "@/lib/subscription";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="w-full pt-2 pl-2">
          <Sheet>
            <SheetTrigger className="flex flex-row">
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
              <h3 className="text-xl font-bold ml-">Chat</h3>
            </SheetTrigger>
            <SheetContent className="bg-gray-900 border-none pb-10">
              <ChatSideBar
                chats={_chats}
                chatId={parseInt(chatId)}
                isPro={isPro}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop View */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-full overflow-hidden">
          {/* Chat Sidebar */}
          <div className="flex-[1] max-w-xs hidden md:flex">
            <ChatSideBar
              chats={_chats}
              chatId={parseInt(chatId)}
              isPro={isPro}
            />
          </div>

          {/* PDF Viewer */}
          <div className="flex-[4] hidden md:flex overflow-auto">
            <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
          </div>

          {/* Chat Component */}
          <div className="flex-[4] border-l-4 border-slate-200 flex flex-col">
            <ChatComponent chatId={parseInt(chatId)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
