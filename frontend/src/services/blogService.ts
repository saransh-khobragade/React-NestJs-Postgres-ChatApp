import { api } from './api';

export interface BlogSummary {
  id: string;
  title: string;
  contentPreview: string;
  authorName: string;
  createdAt: string;
}

export interface BlogDetail {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

interface ApiUser { id: number; name: string; }
interface ApiBlog { id: number; title: string; content: string; createdAt: string; author: ApiUser; }
interface ApiResponse<T> { success: boolean; data?: T; message?: string }

const toSummary = (b: ApiBlog): BlogSummary => ({
  id: String(b.id),
  title: b.title,
  contentPreview: b.content.replace(/<[^>]+>/g, '').slice(0, 160),
  authorName: b.author?.name ?? 'Unknown',
  createdAt: b.createdAt,
});

const toDetail = (b: ApiBlog): BlogDetail => ({
  id: String(b.id),
  title: b.title,
  content: b.content,
  authorName: b.author?.name ?? 'Unknown',
  createdAt: b.createdAt,
});

export const blogService = {
  async list(): Promise<BlogSummary[]> {
    const res = await api.get<ApiResponse<ApiBlog[]>>('/api/blogs');
    if (!res.success || !res.data) throw new Error(res.message ?? 'Failed to fetch blogs');
    return res.data.map(toSummary);
  },
  async get(id: string): Promise<BlogDetail> {
    const res = await api.get<ApiResponse<ApiBlog>>(`/api/blogs/${id}`);
    if (!res.success || !res.data) throw new Error(res.message ?? 'Blog not found');
    return toDetail(res.data);
  },
  async create(input: { title: string; content: string }): Promise<BlogDetail> {
    const res = await api.post<ApiResponse<ApiBlog>>('/api/blogs', input);
    if (!res.success || !res.data) throw new Error(res.message ?? 'Failed to create blog');
    return toDetail(res.data);
  },
};

