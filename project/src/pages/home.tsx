import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../components/blog/post-card";
import { toast } from "../hooks/use-toast";
import { useAuthStore } from "../store";
import { Post } from "../types";
const MOCK_POSTS = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    slug: "getting-started-with-react-typescript",
    content: "Lorem ipsum dolor sit amet...",
    excerpt:
      "Learn how to set up a new React project with TypeScript and best practices.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    author: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      createdAt: new Date(),
    },
    tags: ["react", "typescript", "webdev"],
    category: "Programming",
    status: "published" as const,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Building Modern UIs with Tailwind CSS",
    slug: "building-modern-uis-with-tailwind-css",
    content: "Lorem ipsum dolor sit amet...",
    excerpt:
      "Discover how to create beautiful user interfaces using Tailwind CSS.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    author: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      createdAt: new Date(),
    },
    tags: ["tailwindcss", "css", "webdev"],
    category: "Design",
    status: "published" as const,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "State Management with Zustand",
    slug: "state-management-with-zustand",
    content: "Lorem ipsum dolor sit amet...",
    excerpt: "Learn how to manage application state effectively using Zustand.",
    coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
    author: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      createdAt: new Date(),
    },
    tags: ["react", "zustand", "state-management"],
    category: "Programming",
    status: "published" as const,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
// interface Post {
//   _id: string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   coverImage: string;
//   author: {
//     id: string;
//     name: string;
//   };
//   tags: string[];
//   category: string;
//   status: "draft" | "published" | "scheduled";
//   publishedAt: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

export function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5001/api/posts");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const { isAuthenticated } = useAuthStore();
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold">Welcome to ModernBlog</h1>
        <p className="mt-4 text-xl text-neutral-600">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          <select className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm">
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-neutral-100 p-8 text-center">
        <h2 className="text-2xl font-semibold">Start Writing Today</h2>
        <p className="mt-2 text-neutral-600">
          Share your thoughts, experiences, and expertise with our community.
        </p>

        <button
          onClick={() => {
            if (isAuthenticated) {
              navigate("/new-post");
            } else {
              toast({
                title: "Login required",
                description: "Please login to create a post.",
              });
              navigate("/login");
            }
          }}
          className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
        >
          Create Your First Post
        </button>
      </section>
    </div>
  );
}
