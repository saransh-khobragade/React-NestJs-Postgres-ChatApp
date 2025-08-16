import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { blogService } from '@/services/blogService';
import type { BlogSummary } from '@/services/blogService';
import { Button } from '@/components/ui/button';

export const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogService.list()
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar onCreate={() => { window.location.href = '/write'; }} />
      <main className='container mx-auto px-4 py-8 max-w-3xl'>
        <h1 className='text-3xl font-semibold mb-8'>Latest stories</h1>
        <div className='mb-6'>
          <Button variant='secondary' onClick={() => { window.location.href = '/chat'; }}>Open Chat</Button>
        </div>
        {loading ? (
          <div>Loading…</div>
        ) : (
          <div className='space-y-10'>
            {blogs.map(b => (
              <article key={b.id} className='border-b pb-6'>
                <a href={`/blogs/${b.id}`} className='block'>
                  <h2 className='text-2xl font-semibold mb-2'>{b.title}</h2>
                </a>
                <div className='text-sm text-muted-foreground mb-3'>
                  By {b.authorName} · {new Date(b.createdAt).toLocaleDateString()}
                </div>
                <p className='text-base leading-7 text-muted-foreground'>{b.contentPreview}…</p>
                <div className='mt-3'>
                  <Button variant='link' className='px-0' asChild>
                    <a href={`/blogs/${b.id}`}>Read more</a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

