import { useEffect, useState } from 'react';

import { useRollbar } from '../../Rollbar';

const host = 'https://jsonplaceholder.typicode.com';
const incorrectHost = 'https://jsonplaceholder-wrong-url.typicode.com';

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

const errorPost: Post = {
  body:
    "Sorry, we're having some issues fetching the post you requested. Please try again later.",
  title: 'Opps, something went wrong!',
  userId: -1,
  id: -1,
  loading: false,
};

function randomBoolean(min, max): boolean {
  const n = Math.floor(Math.random() * (max + 1 - min) + min);
  return n === max;
}

export default function usePosts(id: number) {
  const [state, setState] = useState<Post>(loadingPost);
  const rollbar = useRollbar();

  const _fetch = async (id: number): Promise<void> => {
    rollbar.log('Crash Report: Fetching Posts');
    setState(loadingPost);
    try {
      // NOTE: 1/6 chance of causing a network failure
      const origin = randomBoolean(1, 6) ? incorrectHost : host;
      const response = await fetch(`${origin}/posts/${id}`);
      if (response.status !== 200) {
        throw new Error();
      }
      rollbar.log('Crash Report: Posts Fetched');
      const result = await response.json();
      rollbar.log('Crash Report: Posts Parsed');
      setState({ ...result, loading: false } as Post);
    } catch (e) {
      rollbar.error(`Crash Report: Failed to Fetch`);
      setState(errorPost);
    }
  };

  useEffect(() => {
    void _fetch(id);
  }, [id]);

  return state;
}
