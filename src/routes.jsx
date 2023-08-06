import { Home, Profile, SignIn, SignUp } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  SpeakerWaveIcon,
  ClockIcon,
  MegaphoneIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import News from "./pages/news";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    icon: MegaphoneIcon,
    name: "news",
    path: "/news",
    element: <News />,
  },
  {
    icon: ClockIcon,
    path: "/sign-in",
    showsModal:true,
    // element: <SignIn />,
    id:"signin"
  },
  {
    icon: UserIcon,
    path: "/sign-up",
    showsModal:true,
    // element: <SignUp />,
    id:"signup"
  }
];

export default routes;
