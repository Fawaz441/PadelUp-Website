import "react-phone-number-input/style.css";
import { Modal } from "antd";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";

const steps = ["NUMBER_INPUT", "CODE_VERIFICATION"];

function PhoneNumberModal({ visible, onClose }) {
  const [value, setValue] = useState("");
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const numberRef = useRef(null);

  useEffect(() => {
    if (!visible && value) {
      setValue(null);
    }
    if (visible) {
      try {
        setTimeout(() => {
          numberRef?.current?.focus();
        }, 500);
      } catch (e) {}
    } else {
      setCurrentStep(steps[0]);
      setOtp("");
    }
  }, [visible]);

  const sendOtp = () => {
    setSendingOtp(true);
    setTimeout(() => {
      setSendingOtp(false);
      setCurrentStep(steps[1]);
    }, 2000);
  };

  return (
    <Modal
      title={
        currentStep === steps[0]
          ? "Enter your phone number"
          : "Verify your Phone Number"
      }
      open={visible}
      onCancel={() =>
        currentStep === steps[1] ? setCurrentStep(steps[0]) : onClose()
      }
      footer={[]}
    >
      {currentStep === steps[0] ? (
        <div>
          <PhoneInput
            ref={numberRef}
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
            className="rounded border border-[#ccc] p-2"
            defaultCountry="EG"
          />
          <div className="mt-2 flex">
            <button
              onClick={sendOtp}
              className="ml-auto rounded-md bg-primary p-2 font-euclid_bold text-white disabled:cursor-not-allowed disabled:opacity-5"
              disabled={
                sendingOtp || (value ? !isValidPhoneNumber(value) : true)
              }
            >
              {sendingOtp ? "Sending..." : "Continue"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-3 text-[grey]">
            Please enter the 4-digit code sent to your phone {value}
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<div className="mr-4"> </div>}
            renderInput={(props) => (
              <input
                {...props}
                className="h-10 !w-10 rounded-lg border border-[grey] font-euclid_bold text-black outline-none"
              />
            )}
          />
          <div className="mt-3 flex items-center justify-between">
            <button
              // onClick={sendOtp}
              disabled={sendingOtp}
              className="w-[200px] rounded-md bg-primary p-2 font-euclid_bold text-white disabled:cursor-not-allowed disabled:opacity-5"
            >
              Verify
            </button>
            <div className="flex flex-col space-y-4">
              <button
                onClick={sendOtp}
                disabled={sendingOtp}
                className="text-primary/[.8] underline disabled:cursor-not-allowed"
              >
                {sendingOtp ? "Sending..." : "Resend Code"}
              </button>
              <button
                className="text-primary/[.8] underline disabled:cursor-not-allowed"
                onClick={() => setCurrentStep(steps[0])}
              >
                Not your phone number ?{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default PhoneNumberModal;
