import moment from "moment";
import { Link } from "react-router-dom";
import { calculateReadingTime } from "../../lib/utils";
import { Post } from "../../types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative rounded-lg border bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mb-4 h-48 w-full rounded-md object-cover"
        />
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span>
            {moment(post.publishedAt || post.createdAt).format("MMM DD, YYYY")}
          </span>
          <span>•</span>
          <span>{calculateReadingTime(post.content)} min read</span>
        </div>
        <h2 className="text-xl font-semibold group-hover:text-neutral-600">
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h2>
        <p className="text-neutral-600">{post.excerpt}</p>
        <div className="flex items-center gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${tag}`}
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
