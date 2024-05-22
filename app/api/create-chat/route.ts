import { NextResponse, NextRequest} from "next/server"

export async function POST(req: NextRequest, res: NextResponse){
    try {
        const body = await req.json()
        const {file_key, file_name} = body
        console.log(file_key, file_name)
        return NextResponse.json({message: "Success"})
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error: "Internal server error"},
            {status:500}
        )
    }
}