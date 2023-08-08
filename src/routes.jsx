import { Home, Profile, SignIn, SignUp } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  SpeakerWaveIcon,
  ClockIcon,
  MegaphoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import News from "./pages/news";
import { RequiresAuth } from "./helpers";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/",
    element: (
      <RequiresAuth requires={false}>
        <Home />
      </RequiresAuth>
    ),
  },
  {
    icon: MegaphoneIcon,
    name: "news",
    path: "/news",
    element: (
      <RequiresAuth requires={false}>
        <News />
      </RequiresAuth>
    ),
  },
  {
    icon: ClockIcon,
    path: "/sign-in",
    element: (
      <RequiresAuth requires={false}>
        <SignIn />
      </RequiresAuth>
    ),
    id: "signin",
    name: "Sign in",
  },
  {
    icon: UserIcon,
    path: "/sign-up",
    element: (
      <RequiresAuth requires={false}>
        <SignUp />
      </RequiresAuth>
    ),
    id: "signup",
    name: "Sign up",
  },
];

export default routes;
