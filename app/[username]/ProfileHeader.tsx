import { FunctionComponent } from "react";
import Image from "next/image";
import { ProfileProps, getDomainFromUrl } from "./_usernameClient";
import { LinkIcon } from "@heroicons/react/outline";
import Link from "next/link";

const ProfileHeader: FunctionComponent<ProfileProps> = ({
  profile,
  session,
  isOwner,
}) => {
  const { name, username, image, bio, posts, websiteUrl, id, accountLocked } =
    profile;
  return (
    <main className="flex pt-6">
      <div className="mr-4 flex-shrink-0 self-center">
        {image && (
          <Image
            className="rounded-full object-cover h-32 w-32"
            alt={`Avatar for ${name}`}
            src={image}
            width={500}
            height={500}
          />
        )}
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-lg md:text-xl font-bold mb-0">{name}</h1>
        <h2 className="text-neutral-500 dark:text-neutral-400 font-bold text-sm">
          @{username}
        </h2>
        <p className="mt-1">{bio}</p>
        {websiteUrl && !accountLocked && (
          <Link
            href={websiteUrl}
            className="flex flex-row items-center"
            target="blank"
          >
            <LinkIcon className="h-5 mr-2 text-neutral-500 dark:text-neutral-400" />
            <p className="mt-1 text-blue-500">{getDomainFromUrl(websiteUrl)}</p>
          </Link>
        )}
      </div>
    </main>
  );
};

export default ProfileHeader;
