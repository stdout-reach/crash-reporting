import { useEffect, useState } from 'react';

const host = 'https://jsonplaceholder.typicode.com';

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
  loading: boolean;
}

const loadingPost: Post = {
  body: '',
  id: -1,
  title: '',
  userId: -1,
  loading: true,
};

export default function usePosts(id: number) {
  const [state, setState] = useState<Post>(loadingPost);

  const _fetch = async (id: number): Promise<void> => {
    setState(loadingPost);
    const response = await fetch(`${host}/posts/${id}`);
    const result = await response.json();
    setState({ ...result, loading: false } as Post);
  };

  useEffect(() => {
    void _fetch(id);
  }, [id]);

  return state;
}
