import React from 'react';
import { PostEditor } from '../../components/blog/post-editor';

export function NewPostPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold">Create New Post</h1>
      <PostEditor />
    </div>
  );
}