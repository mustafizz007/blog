import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditor } from "@mdxeditor/editor";
import axios from "axios";
import {
  Bold,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(200, "Excerpt is too long"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Must be a valid URL").optional(),
  tags: z.string().min(1, "At least one tag is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["draft", "published", "scheduled"]),
  scheduledAt: z.date().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

const CATEGORIES = [
  "Programming",
  "Design",
  "Technology",
  "Business",
  "Marketing",
  "Lifestyle",
  "Other",
];

export function PostEditor() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const editorRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      status: "draft",
    },
  });

  const status = watch("status");

  const onSubmit = async (data: PostFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Post data:", data);

      const response = await axios.post(
        "http://localhost:5001/api/posts",
        data
      );

      if (response.status === 201) {
        toast({
          title: "Success!",
          description:
            data.status === "published"
              ? "Your post has been published."
              : data.status === "scheduled"
              ? "Your post has been scheduled."
              : "Your post has been saved as a draft.",
        });
        navigate("/");
      }

      navigate("/");
    } catch (error) {
      console.error("Failed to save post:", error);
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditorChange = (content: string) => {
    setValue("content", content);
  };

  const toolbarItems = [
    { icon: <Bold className="h-4 w-4" />, action: "bold", tooltip: "Bold" },
    {
      icon: <Italic className="h-4 w-4" />,
      action: "italic",
      tooltip: "Italic",
    },
    {
      icon: <List className="h-4 w-4" />,
      action: "bullet-list",
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      action: "ordered-list",
      tooltip: "Numbered List",
    },
    {
      icon: <Link2 className="h-4 w-4" />,
      action: "link",
      tooltip: "Insert Link",
    },
    {
      icon: <ImagePlus className="h-4 w-4" />,
      action: "image",
      tooltip: "Insert Image",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter your post title"
            {...register("title")}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            placeholder="Write a brief summary of your post"
            {...register("excerpt")}
            className={errors.excerpt ? "border-red-500" : ""}
          />
          {errors.excerpt && (
            <p className="mt-1 text-sm text-red-500">
              {errors.excerpt.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            placeholder="https://example.com/image.jpg"
            {...register("coverImage")}
            className={errors.coverImage ? "border-red-500" : ""}
          />
          {errors.coverImage && (
            <p className="mt-1 text-sm text-red-500">
              {errors.coverImage.message}
            </p>
          )}
          {watch("coverImage") && (
            <img
              src={watch("coverImage")}
              alt="Cover preview"
              className="mt-2 h-48 w-full rounded-md object-cover"
            />
          )}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            placeholder="react, typescript, webdev (comma separated)"
            {...register("tags")}
            className={errors.tags ? "border-red-500" : ""}
          />
          {errors.tags && (
            <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
          )}
        </div>

        <div>
          <Label>Content</Label>
          <div className="min-h-[400px] rounded-lg border">
            <div className="border-b bg-neutral-50 p-2">
              <div className="flex gap-2">
                {toolbarItems.map((item) => (
                  <Button
                    key={item.action}
                    variant="ghost"
                    size="sm"
                    type="button"
                    title={item.tooltip}
                    onClick={() => {
                      // Handle toolbar actions
                    }}
                  >
                    {item.icon}
                  </Button>
                ))}
              </div>
            </div>
            <MDXEditor
              ref={editorRef}
              onChange={handleEditorChange}
              markdown=""
              placeholder="Write your post content here..."
              className="min-h-[350px] p-4"
            />
          </div>
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
        </div>

        {status === "scheduled" && (
          <div>
            <Label htmlFor="scheduledAt">Schedule Publication</Label>
            <Input
              type="datetime-local"
              id="scheduledAt"
              {...register("scheduledAt", {
                setValueAs: (value) => (value ? new Date(value) : undefined),
              })}
              min={new Date().toISOString().slice(0, 16)}
              className={errors.scheduledAt ? "border-red-500" : ""}
            />
            {errors.scheduledAt && (
              <p className="mt-1 text-sm text-red-500">
                {errors.scheduledAt.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setValue("status", "draft")}
          disabled={isSubmitting}
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setValue("status", "scheduled")}
          disabled={isSubmitting}
        >
          Schedule
        </Button>
        <Button
          type="submit"
          onClick={() => setValue("status", "published")}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing..." : "Publish Now"}
        </Button>
      </div>
    </form>
  );
}
