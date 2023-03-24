import FormTweet from "@/components/FormTweet";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  return (
    <div className="text-3xl text-sky-500">
      <Header showBackArrow={true} label="Home"/>
      <FormTweet placeholder="What's happening?"/>
      <PostFeed />
    </div>
  )
}
