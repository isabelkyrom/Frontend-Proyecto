import { apiFetch } from '@/lib/apiExterna';

export async function getComments(postID) {
  return await apiFetch(`/posts/${postID}/comments`);
}