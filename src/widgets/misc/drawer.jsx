import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Drawer, DatePicker, Modal, Radio, Space } from "antd";
import classNames from "classnames";
import {
  MapPinIcon,
  ArrowRightCircleIcon,
  ArrowLongLeftIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

function addMinutesToTime(timeString, minutesToAdd) {
  // Parse the input time string to extract hours, minutes, and AM/PM indicator
  const [time, period] = timeString.split(/[AP]M/);
  const [hours, minutes] = time.split(":").map(Number);

  // Convert the hours to 24-hour format if needed
  let hours24 = hours;
  if (period === "PM" && hours !== 12) {
    hours24 += 12;
  } else if (period === "AM" && hours === 12) {
    hours24 = 0;
  }

  // Add the specified number of minutes to the time
  const totalMinutes = hours24 * 60 + minutes + minutesToAdd;
  let newHours24 = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;

  // Convert back to 12-hour format
  let newPeriod = "AM";
  if (newHours24 >= 12) {
    newPeriod = "PM";
    if (newHours24 > 12) {
      newHours24 -= 12;
    }
  } else if (newHours24 === 0) {
    newHours24 = 12;
  }

  // Format the new time as a string
  const newTimeString = `${String(newHours24).padStart(2, "0")}:${String(
    newMinutes
  ).padStart(2, "0")}${newPeriod === "AM" ? "PM" : "AM"}`;

  return newTimeString;
}

const times = [
  { value: "12:00PM", disabled: false },
  { value: "12:30PM", disabled: true },
  { value: "1:00PM", disabled: false },
  { value: "1:30PM", disabled: true },
  { value: "2:00PM", disabled: false },
  { value: "2:30PM", disabled: false },
  { value: "3:00PM", disabled: true },
  { value: "3:30PM", disabled: false },
  { value: "4:00PM", disabled: false },
  { value: "4:30PM", disabled: true },
  { value: "5:00PM", disabled: false },
  { value: "5:30PM", disabled: false },
  { value: "6:00PM", disabled: true },
  { value: "6:30PM", disabled: false },
  { value: "7:00PM", disabled: false },
  { value: "7:30PM", disabled: true },
  { value: "8:00PM", disabled: false },
  { value: "8:30PM", disabled: false },
  { value: "9:00PM", disabled: true },
  { value: "9:30PM", disabled: false },
  { value: "10:00PM", disabled: false },
  { value: "10:30PM", disabled: true },
  { value: "11:00PM", disabled: false },
];

const courtNames = [{ name: "Padel Court 1" }, { name: "Padel Court 2" }];

const ReservationDrawer = ({ selectedCourt: selected, onClose, displayPhoneModal }) => {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState("card");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setSelectedDate(value);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current < dayjs().endOf("day");
  };

  const onPaymentMethodChange = (e) => {
    setSelectedPaymentType(e.target.value);
    setShowPaymentModal(false)
  };

  useEffect(() => {
    if (!selectedCourt) {
      setSelectedCourt(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedField(null);
      setSelectedPaymentType("card");
      setShowPaymentModal(false);
    }
  }, [selectedCourt]);

  const drawerWidth = window.innerWidth <= 320 ? 0.8 * window.innerWidth: 320

  return (
    <>
      <Modal
        title="Select Payment Method"
        open={showPaymentModal}
        onCancel={() => setShowPaymentModal(false)}
        onOk={() => setShowPaymentModal(false)}
      >
        <Radio.Group
          onChange={onPaymentMethodChange}
          value={selectedPaymentType}
        >
          <Space direction="vertical">
            <Radio value={"cash"}>Cash</Radio>
            <Radio value={"card"}>Credit/Debit Card</Radio>
          </Space>
        </Radio.Group>
      </Modal>
      <Drawer
        title={<h3 className="font-bold text-primary">Select Court</h3>}
        width={drawerWidth}
        closable={false}
        onClose={onClose}
        className="bg-lightBlue"
        open={!!selected}
      >
        <div className="flex flex-col space-y-5">
          {(selected?.list || []).map((court, index) => (
            <div
              onClick={() => setSelectedCourt(court)}
              className={`flex h-[100px] cursor-pointer items-center space-x-2 rounded-sm bg-white px-2 shadow-sm ${
                selectedCourt?.duration === court?.duration
                  ? "!bg-lightBlue"
                  : ""
              }`}
              key={index}
            >
              <div className="flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full bg-green">
                <span className="text-[20px] text-white">{court.duration}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <h3 className="text-[20px] font-bold text-black">
                  {court.duration} minutes
                </h3>
                <h3 className="text-[16px] text-[#ccc]">{court.price}</h3>
              </div>
            </div>
          ))}
        </div>
        <Drawer
          title={<h3 className="font-bold text-primary">Select Date & Time</h3>}
          width={drawerWidth}
          closable={false}
          onClose={() => setSelectedCourt(null)}
          open={!!selectedCourt}
        >
          <DatePicker
            onChange={onChange}
            onOk={onOk}
            value={selectedDate}
            placeholder="Select Date"
            disabledDate={disabledDate}
            open={!selectedDate && !!selectedCourt}
          />
          {selectedDate && (
            <div className="mt-8 grid grid-cols-3 gap-2">
              {times.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  disabled={time.disabled}
                  className={classNames(
                    "flex h-10 items-center justify-center rounded-lg border border-[grey] bg-white disabled:cursor-not-allowed",
                    { "!bg-[grey]/[.2]": time.disabled },
                    { "!bg-primary/[.2]": selectedTime === time }
                  )}
                >
                  <span
                    className={classNames("text-base text-primary", {
                      "!text-[grey]": time.disabled,
                    })}
                  >
                    {time.value}
                  </span>
                </button>
              ))}
            </div>
          )}
          <Drawer
            title={<h3 className="font-bold text-primary">Select Court</h3>}
            width={drawerWidth}
            closable={false}
            onClose={() => setSelectedTime(null)}
            open={!!selectedTime}
          >
            <div className="flex flex-col space-y-5">
              {courtNames.map((court, index) => (
                <div
                  onClick={() => setSelectedField(court)}
                  className="flex cursor-pointer flex-col items-center justify-center space-y-2"
                  key={index}
                >
                  <div className="h-[200px] w-[200px] rounded-lg border border-primary" />
                  <span className="text-center text-base font-bold text-black">
                    {court.name}
                  </span>
                </div>
              ))}
            </div>
            <Drawer
              title={
                <h3 className="font-bold text-primary">Confirm Details</h3>
              }
              width={drawerWidth}
              closable={false}
              onClose={() => setSelectedField(null)}
              open={!!selectedField}
            >
              <div className="flex items-center space-x-2">
                <div className="h-[100px] w-[100px] flex-shrink-0 rounded-lg border border-primary" />
                <div className="flex flex-col space-y-1">
                  <h3 className="text[20px] font-bold text-black">
                    {selected?.name}
                  </h3>
                  <div className="flex space-x-1">
                    <div className="flex-shrink-0">
                      <MapPinIcon />
                    </div>
                    <p className="text-base text-[#ccc]">
                      {selected?.location}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col space-y-5 rounded-lg bg-white p-3 shadow">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <h3>{selectedTime?.value}</h3>
                    <span>
                      {selectedDate
                        ? new Date(selectedDate)?.toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <ArrowRightCircleIcon color="#0100D5" className="h-[30px]" />
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-right">
                      {selectedTime?.value &&
                        addMinutesToTime(
                          selectedTime.value,
                          selectedCourt.duration
                        )}
                    </h3>
                    <span className="text-right">
                      {selectedDate
                        ? new Date(selectedDate)?.toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
                {/* court */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <h3>Court</h3>
                    <span>{selectedField?.name}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-right">Amount</h3>
                    <span className="text-right">{selectedCourt?.price}</span>
                  </div>
                </div>
                {/* payment method */}
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <div className="flex flex-col space-y-1">
                    <h3>Select Payment Method</h3>
                    <span className="capitalize">{selectedPaymentType}</span>
                  </div>
                  <div className="flex flex-shrink-0 flex-col space-y-1">
                    <ArrowLeftOnRectangleIcon className="h-[25px]" />
                  </div>
                </div>
              </div>
              <button className="mt-5 w-full rounded-md bg-primary py-3 font-bold text-white" onClick={displayPhoneModal}>
                Confirm
              </button>
            </Drawer>
          </Drawer>
        </Drawer>
      </Drawer>
    </>
  );
};
export default ReservationDrawer;
