import { NextResponse } from "next/server" // APIレスポンスを作成するために使用
import { PrismaClient } from "../../generated/prisma" // PrismaClientを使用してデータベースに接続

// データベース操作に使うクライアントインスタンスを作成
const prisma = new PrismaClient()

// データベースに接続するための非同期関数
export async function main() {
  try {
    // データベースに接続
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました")
  }
}

// GET ブログの全記事取得
export const GET = async (req: Request, res:NextResponse) => {
    try {
        await main();
        // データベースのpostテーブルから全ての記事を取得し、date（日付）の昇順で並べ替
        const posts = await prisma.post.findMany({orderBy: {date: "asc"}});

        // 取得した記事をJSON形式で返す。HTTPステータスコード: 200 (OK)
        return NextResponse.json({message: "Success", posts}, {status: 200});
    } catch (err) {
        // エラーが発生した場合、エラーメッセージとエラー内容をJSON形式で返す。HTTPステータスコード: 500 (Internal Server Error)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        // データベース接続を切断
        await prisma.$disconnect()
    }
}

// Post ブログ記事の作成
export const POST = async (req: Request, res:NextResponse) => {
    console.log("POST");
    try {
        // リクエストボディからtitle（タイトル）とdescription（説明）を取得
        const { title, description } = await req.json()
        // データベースに接続
        await main();
        // データベースのpostテーブルに新しい記事を作成
        const post = await prisma.post.create({data: {title, description}})
        
        // 作成した記事をJSON形式で返す。HTTPステータスコード: 201 (Created)
        return NextResponse.json({message: "Success", post}, {status: 201});
    } catch (err) {
        // エラーが発生した場合、エラーメッセージとエラー内容をJSON形式で返す。HTTPステータスコード: 500 (Internal Server Error)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        // 接続を切断
        await prisma.$disconnect();
    }
}