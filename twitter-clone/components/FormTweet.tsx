import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { ChangeEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";
import Avatar from "./Avatar";
import Button from "./Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const FormTweet: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser, isLoading: loadUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);
  const { mutate: mutatePost } = usePost(postId as string);
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const LengthError = new Error("overflow length");
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";
      const textToast = isComment ? "Your repply is ready" : "Tweet Created";
      if (body.length >= 255) {
        throw LengthError;
      }
      await axios.post(url, { body });
      toast.success(textToast);
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      let text;
      if (error == LengthError) {
        toast.error("max length is 255");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, mutatePost, isComment, postId]);
  if (loadUser) {
    return null;
  }
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4 ">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>{
                if(body.length <= 255){
                  setBody(e.target.value)
                }else{
                  setBody(e.target.value.substring(0,255))
                }
              }
              }
              value={body.substring(0,254)}
              className="
                disabled:opacity-80
                peer
                resize-none
                mt-3
                w-full
                bg-black
                ring-0
                outline-none
                text-[20px]
                placeholder-neutral-500
                text-white

              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                    opacity-0
                    peer-focus:opacity-100
                    h-[1px]
                    w-full
                    border-neutral-800
                    transition
                "
            />
            <div
              className="
                    mt-4
                    flex
                    flex-row
                    justify-end

                "
            >
              <div
                className="
                  w-full
                  h-full
                  flex
                  flex-row
                  items-start

                "
              >
                <p
                  className={`
                    ${ body.length >= 255 ? 'text-red-500': body.length >= 240 ? 'text-orange-500' :'text-white'}
                    text-sm
                  `}
                >
                  {body.length}
                </p>
                <p
                  className="
                  text-white
                    text-sm
                  "
                >
                  /255
                </p>
              </div>
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Text"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1
            className="
                            text-white
                            text-2xl
                            text-center
                            mb-4
                            font-bold
                        "
          >
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" secondary onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};
export default FormTweet;
