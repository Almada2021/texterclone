import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useMemo } from "react";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Avatar from "../Avatar";

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}
const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );
  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/posts/${data?.id}`);
    },
    [router, data?.id]
  );
  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      loginModal.onOpen();
    },
    [loginModal]
  );
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);
  return (
    <div
      onClick={goToPost}
      className="
                border-b-[1px]
                border-neutral-800
                p-5
                hover:bg-neutral-900
                transition
            "
    >
      <div
        className="
                    flex
                    flex-row
                    items-start gap-3
                "
      >
        <Avatar userId={data?.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer text-md"
            >
              {data?.user.name}
              <span
                onClick={goToUser}
                className="
                            text-neutral-500
                            cursor-pointer
                            hover:underline
                            hidden
                            md:block
                            lg:text-sm
                        "
              >
                @{data?.user.username}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-white mt-1">{data?.body}</div>
      <div className="flex flex-row  justify-end items-center w-full">
        <div className="flex flex-row w-full h-10 text-sm gap-1">
          <div
            className="
                    flex
                    flex-row
                    items-center
                    text-neutral-500
                    gap-1
                    cursor-pointer
                    transition
                    hover:text-sky-500
                "
          >
            <AiOutlineMessage size={30} />
            <p className="text-lg">{data.comments?.length || 0}</p>
          </div>
          <div
            onClick={onLike}
            className={`
                    flex
                    flex-row
                    items-center
                    text-neutral-500
                    gap-2
                    cursor-pointer
                    transition
                    hover:text-red-500
                `}
          >
            <AiOutlineHeart size={30} />
            <p className="text-lg">{data.comments?.length || 0}</p>
          </div>
        </div>
        <span className="flex flex-row items-center w-20 text-neutral-500 h-10 text-sm">
          {createdAt}
        </span>
      </div>
    </div>
  );
};
export default PostItem;
