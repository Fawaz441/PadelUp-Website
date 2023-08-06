import React, { useState } from "react";
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
import Court from "@/widgets/misc/court";
import ReservationDrawer from "@/widgets/misc/drawer";
import PhoneNumberModal from "@/widgets/misc/phonenumber";

const courtList = [
  { duration: 30, price: "250 EGP" },
  { duration: 60, price: "400 EGP" },
  { duration: 90, price: "600 EGP" },
  { duration: 120, price: "800 EGP" },
  { duration: 150, price: "1000 EGP" },
  { duration: 180, price: "1200 EGP" },
];

const courts = [
  {
    name: "Mirage City Padel",
    location: "Padel Up, Mirage City, 1st settlement",
    courts: 2,
    players: "2-4",
    area: 200,
    price: "400 EGP",
    description:
      "Using our Padel up application, you're a couple of simple clicks away from booking a slot at any of our facilities",
    courtList,
  },
  {
    name: "Mirage City Padel",
    location: "Padel Up, Mirage City, 1st settlement",
    price: "400 EGP",
    courts: 2,
    players: "2-4",
    area: 200,
    description:
      "Using our Padel up application, you're a couple of simple clicks away from booking a slot at any of our facilities",
    courtList,
  },
  {
    name: "Mirage City Padel",
    location: "Padel Up, Mirage City, 1st settlement",
    price: "400 EGP",
    courts: 2,
    players: "2-4",
    area: 200,
    description:
      "Using our Padel up application, you're a couple of simple clicks away from booking a slot at any of our facilities",
    courtList,
  },
];

export function Home() {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const displayPhoneModal = () => {
    setShowPhoneModal(true)
  }

  return (
    <div className="flex flex-col space-y-10">
      <ReservationDrawer
        selectedCourt={selectedCourt}
        onClose={() => setSelectedCourt(null)}
        displayPhoneModal={displayPhoneModal}
      />
      <PhoneNumberModal
        visible={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
      />
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
          onSelect={setSelectedCourt}
          courtList={court.courtList}
        />
      ))}
    </div>
  );
}

export default Home;
