import ArticlePreview from "@/components/ArticlePreview/ArticlePreview";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import { ProfileProps } from "../_usernameClient";

const PostSection: FunctionComponent<ProfileProps> = ({
  profile,
  isOwner,
  session,
}) => {
  const { name, username, image, bio, posts, websiteUrl, id, accountLocked } =
    profile;
  return (
    <motion.section
      id="posts"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {posts.length ? (
        posts.map(({ slug, title, excerpt, readTimeMins, published, id }) => {
          if (!published) return;
          return (
            <ArticlePreview
              key={slug}
              slug={slug}
              title={title}
              excerpt={excerpt}
              name={name}
              username={username || ""}
              image={image}
              date={published}
              readTime={readTimeMins}
              menuOptions={
                isOwner
                  ? [
                      {
                        label: "Edit",
                        href: `/create/${id}`,
                        postId: id,
                      },
                    ]
                  : undefined
              }
              showBookmark={!isOwner}
              id={id}
            />
          );
        })
      ) : (
        <p className="font-medium py-4">Nothing published yet... 🥲</p>
      )}
    </motion.section>
  );
};

export default PostSection;
