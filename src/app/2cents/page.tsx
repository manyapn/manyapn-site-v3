import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import PostsArchive from "@/components/PostsArchive";
import { landscapes } from "@/data/landscapes";
import { posts } from "@/data/posts";

export const metadata = {
  title: "2 cents | manya pradeep narayan",
  description: "things manya thinks about.",
};

export default function TwoCentsPage() {
  const land = landscapes.palouse;
  return (
    <Page land={land}>
      <PageHead land={land} title="2cents" aside={`${posts.length} posts`} />
      <div className="wrap enter-2">
        <PostsArchive />
      </div>
    </Page>
  );
}
