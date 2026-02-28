import { apiFetch } from '@/lib/apiExterna';

export async function getPosts() {
  return await apiFetch('/posts');
}