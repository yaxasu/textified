import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import {FileUp, LogIn} from 'lucide-react'
import FileUpload from '@/components/FileUpload'

const Home = async () => {
  const {userId} = await auth()
  const isAuth = !!userId

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 flex justify-center items-center'>
        <div className="flex flex-col items-center text-center">
          <div className='flex items-center mb-4'>
            <h1 className='mr-3 text-5xl font-semibold'>Chat with any PDF</h1>
            <UserButton afterSignOutUrl='/'/>
          </div>
          <div className="flex mt-2">
            {isAuth && <Button>Go to chats</Button>}
          </div>
          <p className='max-w-xl mt-1 lext-lg text-slate-600'>
            Join millions of students, researchers, and professionals to instantly
            answer questions and understand research with Artificial Intelligence
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) :
             (<Link href='/sign-in'>
              <Button>
                Login to get Started!
                <LogIn className='w-4 h-4 ml-2'/>
              </Button>
             </Link>)}
          </div>
        </div>
    </div>
  )
}

export default Home