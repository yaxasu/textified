import React from 'react';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

type Props = {
    params: {
        chatId: string
    }
}

const ChatPage = async ({ params: { chatId } }: Props) => {
    const {userId} = await auth()

    if (!userId) {
        return redirect('/sign-in')
    }

    return (
        <div>{chatId}</div>
    );
}

export default ChatPage;
