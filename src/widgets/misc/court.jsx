import PropTypes from "prop-types";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  UserGroupIcon,
  ArrowDownCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export function Court({
  name,
  location,
  isFirst,
  description,
  courts,
  area,
  players,
  price,
  onSelect,
  courtList,
}) {
  return (
    <div>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 px-4 py-16">
        <div className="container mx-auto">
          <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            {isFirst && <div className="pt-[100px]" />}
            <div className="px-6">
              <Carousel
                showThumbs={false}
                showStatus={false}
              >
                {(courts||[]).map((court) => (
                  <div key={court.id} className="w-[200px] flex items-center justify-center flex-col mx-auto">
                    <img className="h-[200px] w-[200px] object-cover" src={court.image} alt={court.name} />
                  </div>
                ))}
              </Carousel>
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12"></div>
                <div className="mt-10 flex max-w-[250px] flex-col justify-center space-y-2 px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Button
                    className="bg-primary capitalize"
                    onClick={() =>
                      onSelect({
                        list: courtList,
                        name,
                        location,
                      })
                    }
                  >
                    Reserve
                  </Button>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-euclid_bold uppercase"
                      >
                        {price} / Hour
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Price
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 rounded-[10px] bg-[#D2DBF7]/[.2] p-4 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {name}
                </Typography>
                <div className="mb-16 flex items-center justify-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {location}
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <PlayCircleIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {courts?.length} Courts
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <UserGroupIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {players} Players
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <ArrowDownCircleIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {area}m<sup>2</sup>
                  </Typography>
                </div>
              </div>

              <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                <div className="mt-2 flex flex-wrap justify-center">
                  <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                    <Typography className="mb-8 font-normal text-blue-gray-500">
                      {description}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Court.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  pricePerHour: PropTypes.number,
  courtDetails: PropTypes.arrayOf(PropTypes.object),
  photos: PropTypes.array,
};

export default Court;
