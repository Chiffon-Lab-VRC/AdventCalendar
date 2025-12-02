import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/posts';
import { Sidebar } from '@/components/layout/Sidebar';
import { notFound } from "next/navigation";

export default async function Home() {
  const post = await getPostBySlug("index").catch(() => null);

  if (!post) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold">記事が見つかりません</h1>
        <p className="text-muted-foreground">
          <code>posts/index.mdx</code> を作成してください。
        </p>
      </div>
    );
  }

  const { Component, metadata } = post;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-24">
      {/* ヘッダー部分（タイトル・日付・概要） */}
      <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center space-y-8 text-center">
        <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
          <time dateTime={metadata.date}>{metadata.date}</time>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
          {metadata.title}
        </h1>
        <p className="text-xl leading-relaxed text-neutral-600">
          {metadata.description}
        </p>
      </div>

      <hr className="mb-16 border-orange-100" />

      {/* 2カラムレイアウト */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
        {/* 本文 */}
        <article className="prose prose-lg prose-neutral mx-auto dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-neutral-900 prose-p:leading-relaxed prose-p:text-neutral-800 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-strong:text-neutral-900 prose-li:text-neutral-800 prose-pre:bg-neutral-900 prose-pre:text-neutral-50">
          <Component />
        </article>

        {/* サイドバー（デスクトップのみ表示） */}
        <div className="hidden lg:block">
          <Sidebar
            authorName="犬ヶ崎しふぉん"
            authorBio="バーチャルの世界でかわいいを育てています。インフラやくざを目指して生きています。自宅で100GbEを構築するのが夢。"
          />
        </div>
      </div>
    </div>
  );
}
