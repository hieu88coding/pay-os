import type {NextApiRequest,NextApiResponse} from 'next'
import { NextResponse } from 'next/server'
type ResponseData = {
  message: any
}
 
export  async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await new Response(req.body).json()
  console.log("body", req.body);
  // Thực hiện chuyển hướng đến một trang khác
  //NextResponse.redirect("http://localhost:3000/qr-screen");
  return NextResponse.json({ message: data })
}

export  async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  NextResponse.json({ message: 'Hello from Next.js!' })
}