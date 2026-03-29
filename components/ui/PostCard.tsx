import { MessageCircle, ThumbsUp } from "lucide-react";
import { postPlaceholder, profilePlaceholder, post2 } from "@/public/images";
import Image from "next/image";
import { useAuthStore } from "@/store/auth.store";
import React, { useState } from "react";
import Link from "next/link";
import { likePost } from "@/lib/actions/post-actions";
import { useLikePost } from "@/lib/react-queries/posts.query";
// import { toast } from "sonner";
import toast from "react-hot-toast";
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
  // Added fields to track likes
  likes?: { userId: string }[];
  _count?: {
    likes: number;
    comments: number;
  };
  isLikedByCurrentUser?: boolean;
}

interface PostCardProps {
  data: PostData;
}



const PostCard = ({ data }: PostCardProps) => {
  const { session } = useAuthStore();
  const { mutate: toggleLike, isPending: isLiking } = useLikePost();

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      toast.error("Please sign in to like posts");
      return;
    }

    toggleLike({
      postId: data.id,
      userId: session.user.id,
    });
  };

  const likeCount = data._count?.likes ?? 0;
  const isLiked = data.isLikedByCurrentUser ?? false;

  return (
 

     
      <div className=" space-y-5 border-b border-zinc-300 py-4">
           <Link href={`/stories/${data.slug}`} className="space-y-5">
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
          </Link>

          <div className="flex justify-between text-sm items-center">
            <div className="flex gap-2 items-center">
              <button 
                onClick={handleLike}
                disabled={isLiking || !session?.user?.id}
                className="cursor-pointer transition-colors duration-200 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                title={session?.user?.id ? "Like this post" : "Sign in to like"}
              >
                <ThumbsUp 
                  strokeWidth={1} 
                  className="w-5" 
                  fill={isLiked ? "currentColor" : "none"}
                />
                <span className="text-xs">{likeCount}</span>
              </button>

              <Link href={`/stories/${data.slug}`} className="cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <MessageCircle strokeWidth={1} className="w-5" />
                    <span className="text-xs">{data._count?.comments ?? 0}</span>
              </Link>

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
   
  );
};

export default PostCard;
