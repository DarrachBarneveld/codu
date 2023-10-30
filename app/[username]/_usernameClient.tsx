"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import Head from "next/head";
import { LinkIcon } from "@heroicons/react/outline";
import { api } from "@/server/trpc/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import ProfileHeader from "./ProfileHeader";
import ProfileNavigation from "./ProfileNavigation";
import PostSection from "./sections/PostsSection";
import CommentSection from "./sections/DummySection";
import DummySection from "./sections/DummySection";

export type ProfileProps = {
  session: Session | null;
  isOwner: boolean;
  profile: {
    posts: {
      published: string | undefined;
      title: string;
      excerpt: string;
      slug: string;
      readTimeMins: number;
      id: string;
    }[];
    accountLocked: boolean;
    id: string;
    username: string | null;
    name: string;
    image: string;
    bio: string;
    websiteUrl: string;
  };
};

const Profile = ({ profile, isOwner, session }: ProfileProps) => {
  const router = useRouter();
  const [section, setSection] = useState("posts");
  const [heading, setHeading] = useState({
    title: "Published Posts",
    count: 4,
  });

  const { mutate: banUser } = api.admin.ban.useMutation({
    onSettled() {
      router.refresh();
    },
  });

  const { mutate: unbanUser } = api.admin.unban.useMutation({
    onSettled() {
      router.refresh();
    },
  });

  if (!profile) return null; // Should never happen because of serverside fetch or redirect

  const { name, username, image, bio, posts, websiteUrl, id, accountLocked } =
    profile;

  const handleBanSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (accountLocked) return;

    const target = e.target as typeof e.target & {
      note: { value: string };
    };
    const note = target.note.value;

    try {
      await banUser({ userId: id, note });
    } catch (error) {
      console.error(error);
    }
  };

  function setThePageState(state: string) {
    console.log("fire");
    setSection(state);

    const heading = getSectionInfo(state);

    console.log(heading);

    setHeading(heading);
  }

  function getSectionInfo(section: string) {
    if (section === "posts") {
      return {
        title: "Published Posts",
        count: posts?.length,
      };
    } else if (section === "comments") {
      return {
        title: "Recent Comments",
        count: 2,
      };
    } else if (section === "favourites") {
      return {
        title: "Favourites",
        count: 2,
      };
    } else {
      return {
        title: "Followers",
        count: 4,
      };
    }
  }

  return (
    <>
      <Head>
        <title>{`${name} - Codú`}</title>
        <meta name="description" content={`${name}'s profile on Codú`} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="site.webmanifest" />
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="browserconfig.xml" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <meta
          name="image"
          property="og:image"
          content={`/api/og?title=${encodeURIComponent(
            `${name} - Codú Profile`,
          )}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="max-w-2xl px-4 mx-auto text-900 dark:text-white">
        <ProfileHeader profile={profile} isOwner={isOwner} session={session} />
        <ProfileNavigation
          posts={profile.posts}
          accountLocked={accountLocked}
          navigationStateHandler={setThePageState}
          heading={heading}
        />

        <AnimatePresence mode="wait">
          {section === "posts" ? (
            <PostSection
              key="posts"
              profile={profile}
              isOwner={isOwner}
              session={session}
            />
          ) : (
            <DummySection id={section} key={section} />
          )}
        </AnimatePresence>
      </div>
      {session?.user?.role === "ADMIN" && (
        <div className="border-t-2 text-center pb-8">
          <h4 className="text-2xl mb-6 mt-4">Admin Control</h4>
          {accountLocked ? (
            <button
              onClick={() => unbanUser({ userId: id })}
              className="secondary-button"
            >
              Unban this user
            </button>
          ) : (
            <form className="flex flex-col" onSubmit={handleBanSubmit}>
              <label
                htmlFor="note"
                className="block text-sm font-medium leading-6 text-gray-700 dark:text-gray-400"
              >
                Add your reason to ban the user
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  name="note"
                  id="note"
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-900 dark:ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <button type="submit" className="mt-4 secondary-button">
                Ban user
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;

export function getDomainFromUrl(url: string) {
  const domain = url.replace(/(https?:\/\/)?(www.)?/i, "");
  if (domain[domain.length - 1] === "/") {
    return domain.slice(0, domain.length - 1);
  }
  return domain;
}
