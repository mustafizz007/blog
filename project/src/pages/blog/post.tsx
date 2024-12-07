import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { calculateReadingTime } from "../../lib/utils";
import { Post } from "../../types";
import moment from "moment";

// Mock post data - replace with actual API call
const MOCK_POST = {
  id: "1",
  title: "Getting Started with React and TypeScript",
  slug: "getting-started-with-react-typescript",
  content: `
# Getting Started with React and TypeScript

React and TypeScript are a powerful combination for building robust web applications. This guide will help you get started with this excellent duo.

## Why TypeScript?

TypeScript adds static typing to JavaScript, which helps catch errors early in development and improves the development experience with better tooling support.

## Setting Up Your Project

First, create a new React project with TypeScript support using Vite:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## Key Benefits

1. Better IDE Support
2. Catch Errors Early
3. Improved Maintainability
4. Enhanced Developer Experience
  `,
  excerpt:
    "Learn how to set up a new React project with TypeScript and best practices.",
  coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  author: {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Full-stack developer passionate about React and TypeScript",
    createdAt: new Date(),
  },
  tags: ["react", "typescript", "webdev"],
  category: "Programming",
  status: "published" as const,
  publishedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function PostPage() {
  const { id } = useParams();
  //   const post = MOCK_POST; // Replace with actual post fetch

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:5001/api/posts/${id}`);
      setPost(response.data);
    };
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>Post not found</div>;
  }

  const author = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    createdAt: new Date(),
  };

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-6">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
          </Avatar>

          <div>
            <p className="font-medium">{author.name}</p>
            <div className="text-sm text-neutral-600">
              <span>
                {moment(post.publishedAt || post.createdAt).format(
                  "MMM DD, YYYY"
                )}
              </span>
              <span className="mx-2">•</span>
              <span>{calculateReadingTime(post.content)} min read</span>
            </div>
          </div>
        </div>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}
      </header>

      <div className="prose prose-neutral max-w-none">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <footer className="border-t pt-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
