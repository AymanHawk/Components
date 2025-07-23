import {
  IconArrowLeft,
  IconInfoSquareRounded,
  IconStarFilled,
  IconComponents,
  IconFile,
} from "@tabler/icons-react";

export const sidebarData = [
  {
    label: "Introduction",
    href: "/pages/home",
    icon: (
      <IconInfoSquareRounded className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Starred",
    href: "/pages/top-artists",
    icon: (
      <IconStarFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Projects",
    icon: <IconComponents className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    children: [
      {
        label: "Project Alpha",
        href: "/projects/alpha",
        icon: <IconFile className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      },
      {
        label: "Project Beta",
        href: "/projects/beta",
        icon: <IconFile className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      },
    ],
  },
  {
    label: "Logout",
    href: "/",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),

    onClick: () => {
      console.log("worked");
      localStorage.removeItem("token");
      window.location.href = "/";
    },
  },
];
