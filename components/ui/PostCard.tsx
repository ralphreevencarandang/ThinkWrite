import { MessageCircle, ThumbsUp } from "lucide-react";
import { postPlaceholder, profilePlaceholder, post2 } from "@/public/images";
import Image from "next/image";
import { useAuthStore } from "@/store/auth.store";
import React from "react";
import Link from "next/link";
interface PostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: string;
  author: {
    name: string;
    image: string;
  };
  slug: string;
  isPublish: boolean;
}

interface PostCardProps {
  data: PostData;
}

const PostCard = ({ data }: PostCardProps) => {
  const { session } = useAuthStore();

  return (
    <Link
      href={`/stories/${data.slug}`}
      
    >
      <div className=" space-y-5 border-b border-zinc-300 py-4">
        <div className="flex flex-nowrap items-center gap-2">
          <Image
            src={data?.author?.image || profilePlaceholder}
            alt="profile-img"
            width={30}
            height={30}
            className="rounded-full w-7 h-7 object-cover"
          />
          <p className="text-sm">{data?.author?.name || "Unknown"}</p>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between ">
          <div className="lg:order-2 lg:w-[50%] relative h-50 ">
            <Image
              src={data?.featuredImage || postPlaceholder}
              alt="post-image"
              fill
              className="object-cover rounded"
            />
          </div>

          <div className="space-y-2 lg:w-[50%] ">
            <h2 className="font-bold text-xl text-black">{data?.title}</h2>
            <p className="text-sm">{data?.excerpt} </p>
          </div>
        </div>

        <div className="flex justify-between text-sm items-center">
          <div className="space-x-2">
            <button className="cursor-pointer">
              <ThumbsUp strokeWidth={1} className="w-5" />
            </button>
            <button className="cursor-pointer">
              <MessageCircle strokeWidth={1} className="w-5" />
            </button>
          </div>
          <p className="text-xs text-zinc-500">
            {new Date(data?.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
