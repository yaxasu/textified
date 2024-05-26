import React from 'react';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import ChatSideBar from '@/components/ChatSideBar';
import PDFViewer from '@/components/PDFViewer';
import ChatComponent from '@/components/ChatComponent';
import { checkSubscription } from '@/lib/subscription';
import { Sheet, SheetTrigger, SheetContent } from '../../../components/ui/sheet'
import Image from 'next/image'

type Props = {
    params: {
        chatId: string
    }
}

const ChatPage = async ({ params: { chatId } }: Props) => {
    const { userId } = await auth()

    if (!userId) {
        return redirect('/sign-in')
    }

    const _chats = await db.select().from(chats).where(eq(chats.userId, userId))
    if (!_chats) {
        return redirect('/')
    }
    if (!_chats.find(chat => chat.id === parseInt(chatId))) {
        return redirect('/')
    }

    const currentChat = _chats.find(chat => chat.id === parseInt(chatId))
    const isPro = await checkSubscription()

    return (
        <div>
            {/* Mobile View */}
            <div className='md:hidden'>
                <div className='w-full pt-2 pl-2'>
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src='/assets/icons/menu.svg'
                                alt='menu'
                                width={32}
                                height={32}
                                className='cursor-pointer'
                            />
                        </SheetTrigger>
                        <SheetContent className='bg-gray-900 bordeer-none'>
                            <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            {/* Desktop View */}
            <div className='flex max-h-screen overflow-scroll'>
                <div className='flex w-full max-h-screen overflow-scroll'>
                    {/* Chat Sidebar */}
                    <div className='flex-[1] max-w-xs hidden md:flex'>
                        <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
                    </div>

                    {/* pdf Viewer */}
                    <div className='max-h-screen p-4 overflow-scroll flex-[5] hidden md:flex'>
                        <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
                    </div>

                    {/* Chat Component */}
                    <div className='flex-[3] border-l-4 border-slate-200'>
                        <ChatComponent chatId={parseInt(chatId)} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ChatPage;
