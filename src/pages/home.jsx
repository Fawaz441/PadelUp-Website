import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import Drawer from "@/widgets/misc/drawer";
import Court from "@/widgets/misc/court";

const courts = [
  {
    name: "Mirage City Padel",
    location: "Padel Up, Mirage City, 1st settlement",
    courts:2,
    players:"2-4",
    area :200,
    price:"400 EGP",
    description:
      "Using our Padel up application, you're a couple of simple clicks away from booking a slot at any of our facilities",
  },
  {
    name: "Mirage City Padel",
    location: "Padel Up, Mirage City, 1st settlement",
    price:"400 EGP",
    courts:2,
    players:"2-4",
    area :200,
    description:
    "Using our Padel up application, you're a couple of simple clicks away from booking a slot at any of our facilities",
  },
  {
    name: "Mirage City Padel",
    location: "Padel Up, Mirage City, 1st settlement",
    price:"400 EGP",
    courts:2,
    players:"2-4",
    area :200,
    description:
    "Using our Padel up application, you're a couple of simple clicks away from booking a slot at any of our facilities",
  },
];

export function Home() {
  return (
    <div className="flex flex-col space-y-10">
      {courts.map((court, index) => (
        <Court
          isFirst={index === 0}
          key={index}
          name={court.name}
          location={court.location}
          description={court.description}
          price={court.price}
          courts={court.courts}
          players={court.players}
          area={court.area}
        />
      ))}
    </div>
  );
}

export default Home;
