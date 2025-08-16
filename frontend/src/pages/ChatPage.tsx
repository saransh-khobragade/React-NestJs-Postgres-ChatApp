import { useEffect, useMemo, useRef, useState } from 'react';
import { chatService, ConversationDto, MessageDto } from '@/services/chatService';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { io, Socket } from 'socket.io-client';

export function ChatPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationDto[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [text, setText] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const cs = await chatService.listConversations(user.id);
      setConversations(cs);
      if (cs.length > 0) setActiveId(cs[0].id);
    })();
  }, [user]);

  useEffect(() => {
    if (!activeId || !user) return;
    void (async () => {
      const ms = await chatService.listMessages(activeId);
      setMessages(ms);
    })();
  }, [activeId, user]);

  const token = useMemo(() => {
    try { return localStorage.getItem('token') ?? ''; } catch { return ''; }
  }, []);

  useEffect(() => {
    if (!token) return;
    const url = import.meta.env['VITE_API_URL'] as string;
    const socket = io(url, { auth: { token } });
    socketRef.current = socket;
    socket.on('message.receive', (message: MessageDto) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    if (activeId) socket.emit('conversation.join', { conversationId: activeId });
    return () => {
      if (activeId) socket.emit('conversation.leave', { conversationId: activeId });
    };
  }, [activeId]);

  const send = () => {
    const socket = socketRef.current;
    if (!socket || !activeId || text.trim() === '') return;
    socket.emit('message.send', { conversationId: activeId, content: text });
    setText('');
  };

  return (
    <div className="flex h-screen">
      <aside className="w-80 border-r p-3 space-y-2 overflow-y-auto">
        {conversations.map((c) => (
          <div key={c.id} className={`p-2 rounded cursor-pointer ${activeId === c.id ? 'bg-muted' : ''}`} onClick={() => setActiveId(c.id)}>
            <div className="font-medium">Conversation #{c.id}</div>
            <div className="text-xs opacity-70">{c.participants.map((p) => p.name).join(', ')}</div>
          </div>
        ))}
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-3 py-2 rounded-xl max-w-[70%] ${m.senderId === user?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{m.content}</div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" onKeyDown={(e) => { if (e.key === 'Enter') send(); }} />
          <Button onClick={send}>Send</Button>
        </div>
      </main>
    </div>
  );
}

