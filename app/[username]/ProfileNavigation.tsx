import { FunctionComponent } from "react";
import { Newspaper, HeartIcon, UsersIcon, MessageCircle } from "lucide-react";

interface ProfileNavigationProps {
  accountLocked: boolean;
  posts: {
    published: string | undefined;
    title: string;
    excerpt: string;
    slug: string;
    readTimeMins: number;
    id: string;
  }[];
  navigationStateHandler: (state: string) => void;
  heading: {
    title: string;
    count: number;
  };
}

const ProfileNavigation: FunctionComponent<ProfileNavigationProps> = ({
  accountLocked,
  posts,
  navigationStateHandler,
  heading,
}) => {
  return (
    <div>
      <nav className="w-100 flex justify-evenly">
        <IconButton
          onClick={() => navigationStateHandler("posts")}
          icon={<Newspaper className="fill-orange-600" size={40} />}
          label="Posts"
        />
        <IconButton
          onClick={() => navigationStateHandler("favourites")}
          icon={<HeartIcon className="fill-red-600" size={40} />}
          label="Saved Posts"
        />
        <IconButton
          onClick={() => navigationStateHandler("followers")}
          icon={<UsersIcon className="fill-blue-600" size={40} />}
          label="Followers"
        />
        <IconButton
          onClick={() => navigationStateHandler("comments")}
          icon={<MessageCircle className="fill-green-600" size={40} />}
          label="Message"
        />
      </nav>
      {accountLocked ? (
        <div className="flex items-center justify-between pb-4 mt-8 text-3xl font-extrabold tracking-tight border-b sm:text-4xl text-neutral-900 dark:text-neutral-50">
          <h1>Account locked 🔒</h1>
        </div>
      ) : (
        <Heading title={heading.title} count={heading.count} />
      )}
    </div>
  );
};

export default ProfileNavigation;

interface HeadingProps {
  count: number;
  title: string;
}

const Heading: FunctionComponent<HeadingProps> = ({ title, count }) => {
  console.log(title);
  return (
    <div className="flex items-center justify-between pb-4 mt-8 text-3xl font-extrabold tracking-tight border-b sm:text-4xl text-neutral-900 dark:text-neutral-50">
      <h1>{title}</h1>
      <span className="font-light">{count}</span>
    </div>
  );
};

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode; // You can use Lucide icons as React components
  label: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  label,
  className,
}) => {
  return (
    <button onClick={onClick} aria-label={label} className={className}>
      {icon}
    </button>
  );
};
