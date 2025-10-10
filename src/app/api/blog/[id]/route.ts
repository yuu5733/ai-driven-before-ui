import { NextResponse } from "next/server"; // Next.jsのAPIレスポンスを生成するために使用
import { PrismaClient } from "../../../../generated/prisma"; // PrismaClientを使用してデータベースに接続（操作）

import { main } from "../route"; // データベースに接続するための非同期関数

// データベース操作に使用するPrismaクライアントを初期化
const prisma = new PrismaClient();

// GET ブログ記事の取得
export const GET = async (req: Request, res:NextResponse) => {
    try {
        // リクエストURLから記事のidを取得
        const id:number = parseInt(req.url.split("/blog/")[1]);

        // データベースに接続
        await main();

        // データベースのpostテーブルからidが一致する記事を取得
        const post = await prisma.post.findFirst({where: {id}});

        if(!post) {
            // 記事が見つからなかった場合、エラーメッセージをJSON形式で返す。HTTPステータスコード: 404 (Not Found)
            return NextResponse.json({message: "Not Found"}, {status: 404});
        }

        // 取得した記事をJSON形式で返す。HTTPステータスコード: 200 (OK)
        return NextResponse.json({message: "Success", post}, {status: 200});
    } catch (err) {
        // エラーが発生した場合、エラーメッセージとエラー内容をJSON形式で返す。HTTPステータスコード: 500 (Internal Server Error)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        // 接続を切断
        await prisma.$disconnect();
    }
};

// PUT ブログ記事の更新
export const PUT = async (req: Request, res:NextResponse) => {
    try {
        // リクエストURLから記事のidを取得
        const id:number = parseInt(req.url.split("/blog/")[1]);
        
        // リクエストボディからtitle（タイトル）とdescription（説明）を取得
        const { title, description } = await req.json();
        
        // データベースに接続
        await main();
        
        // データベースのpostテーブルを更新し、idが一致する記事を更新
        const post = await prisma.post.update({
            data: {title, description},
            where: {id}
        });

        // 更新した記事をJSON形式で返す。HTTPステータスコード: 200 (OK)
        return NextResponse.json({message: "Success", post}, {status: 200});
    } catch (err) {
        // エラーが発生した場合、エラーメッセージとエラー内容をJSON形式で返す。HTTPステータスコード: 500 (Internal Server Error)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        // 接続を切断
        await prisma.$disconnect();
    }
}

// DELETE ブログ記事の削除
export const DELETE = async (req: Request, res:NextResponse) => {
    try {
        // リクエストURLから記事のidを取得
        const id:number = parseInt(req.url.split("/blog/")[1]);

        // データベースに接続
        await main();
        
        // データベースのpostテーブルを削除し、idが一致する記事を削除
        const post = await prisma.post.delete({
            where: {id}
        });

        // 削除した記事をJSON形式で返す。HTTPステータスコード: 200 (OK)
        return NextResponse.json({message: "Success", post}, {status: 200});
    } catch (err) {
        // エラーが発生した場合、エラーメッセージとエラー内容をJSON形式で返す。HTTPステータスコード: 500 (Internal Server Error)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        // 接続を切断
        await prisma.$disconnect();
    }
}