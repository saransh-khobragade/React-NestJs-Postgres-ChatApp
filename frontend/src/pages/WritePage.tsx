import React, { useRef, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { blogService } from '@/services/blogService';

export const WritePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (): Promise<void> => {
    setSaving(true);
    try {
      const created = await blogService.create({ title, content });
      window.location.href = `/blogs/${created.id}`;
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />
      <main className='container mx-auto px-4 py-8 max-w-3xl'>
        <h1 className='text-3xl font-semibold mb-6'>Write a story</h1>
        <input
          className='w-full text-3xl font-semibold bg-transparent outline-none border-b mb-6 pb-2'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div
          ref={editorRef}
          className='w-full min-h-[300px] leading-7 bg-transparent outline-none focus:outline-none border-b pb-4 whitespace-pre-wrap'
          contentEditable
          onInput={() => setContent(editorRef.current?.innerHTML ?? '')}
          data-placeholder='Tell your story...'
          suppressContentEditableWarning
        />
        <div className='mt-6'>
          <Button onClick={submit} disabled={saving || !title || !content}>
            {saving ? 'Publishing…' : 'Publish'}
          </Button>
        </div>
      </main>
    </div>
  );
};

