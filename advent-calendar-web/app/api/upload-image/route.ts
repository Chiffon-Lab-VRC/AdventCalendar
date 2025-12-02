import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No image file provided' },
                { status: 400 }
            );
        }

        // ファイル名をユニークにする（タイムスタンプを使用）
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, '-');
        const filename = `${timestamp}-${originalName}`;

        // 画像を保存するディレクトリを作成（存在しない場合）
        const uploadDir = path.join(process.cwd(), 'public', 'images');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            // ディレクトリが既に存在する場合はエラーを無視
        }

        // ファイルをバイト配列に変換
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // ファイルを保存
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // 保存したファイルのパスを返す
        return NextResponse.json({
            success: true,
            filename: filename,
            path: `/images/${filename}`,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}
