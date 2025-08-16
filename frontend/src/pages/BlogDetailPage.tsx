import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { blogService } from '@/services/blogService';
import type { BlogDetail } from '@/services/blogService';

export const BlogDetailPage: React.FC = () => {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.location.pathname.split('/').pop() as string;
    blogService.get(id)
      .then(setBlog)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar onCreate={() => { window.location.href = '/write'; }} />
      <main className='container mx-auto px-4 py-10 max-w-3xl'>
        {loading || !blog ? (
          <div>Loading…</div>
        ) : (
          <article className='max-w-none'>
            <h1 className='text-4xl font-semibold tracking-tight'>{blog.title}</h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              By {blog.authorName} · {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <div className='mt-8 text-lg leading-8 space-y-6' dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
        )}
      </main>
    </div>
  );
};

