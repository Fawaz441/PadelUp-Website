import React, { useEffect, useState } from "react";
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
import apiInstance from "@/api/instance";
import Loader from "@/widgets/misc/loader";
import MySwal from "@/widgets/misc/alert";

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
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const getCategories = async () => {
    try {
      if(!loading){
        setLoading(true)
      }
      const { data } = await apiInstance.getCategories();
      setCategories(data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonText: "Retry",
        text: "Something went wrong!",
      }).then((result) => {
        if (result.isConfirmed) {
          getCategories();
        }
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const displayPhoneModal = () => {
    setShowPhoneModal(true);
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center">
        <Loader loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-10">
      <ReservationDrawer
        selectedCourt={selectedCourt}
        onClose={() => setSelectedCourt(null)}
        displayPhoneModal={displayPhoneModal}
        categories={categories}
      />
      <PhoneNumberModal
        visible={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
      />
      {categories && (
        <Court
          isFirst={true}
          name={categories?.name}
          location={categories?.address?.fullAddress}
          description={categories?.description}
          price={`${categories?.price} ${categories?.currency}`}
          courts={categories?.courts}
          players={"2-4"}
          area={200}
          onSelect={setSelectedCourt}
          courtList={categories?.services}
        />
      )}
    </div>
  );
}

export default Home;
