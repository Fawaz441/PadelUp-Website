import { Link } from "react-router-dom";
import { DatePicker, Radio } from "antd";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import validators from "@/utils";
import { showError } from "@/widgets/misc/alert";

function transformDateFormat(inputDate) {
  const parts = inputDate.split("-"); // Split the input date by hyphens
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  } else {
    throw new Error("Invalid date format");
  }
}

export function SignUp() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      gender: "male",
      dob: "",
      password: "",
      confirm_password: "",
      skill_level: "A",
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      showError("Passwords do not match", false, true, "OK");
    } else {
      const { dob, phone_number, ...rest } = data;
      const { countryCallingCode, nationalNumber } =
        parsePhoneNumber(phone_number);
      const payload = {
        ...rest,
        full_mobile: phone_number,
        dial_code: countryCallingCode,
        mobile: nationalNumber,
        dob: transformDateFormat(dob.dateString),
      };
      console.log(JSON.stringify(payload));
    }
  };

  return (
    <>
      <div className="fixed top-0 h-full w-full  bg-[url('https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')] bg-cover bg-center" />
      <div className="fixed inset-0 left-0 top-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="mx-auto mt-[150px] w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {/* first_name */}
            <Controller
              control={control}
              name="first_name"
              rules={validators.isNonEmptyString}
              render={({ field }) => (
                <Input
                  variant="standard"
                  autoFocus
                  label="First Name"
                  size="lg"
                  error={errors.first_name}
                  {...field}
                />
              )}
            />
            {/* last_name */}
            <Controller
              control={control}
              name="last_name"
              rules={validators.isNonEmptyString}
              render={({ field }) => (
                <Input
                  variant="standard"
                  label="Last Name"
                  size="lg"
                  error={errors.last_name}
                  {...field}
                />
              )}
            />
            {/* username */}
            <Controller
              control={control}
              name="username"
              rules={validators.isNonEmptyString}
              render={({ field }) => (
                <Input
                  variant="standard"
                  type="username"
                  label="Username"
                  size="lg"
                  error={errors.username}
                  {...field}
                />
              )}
            />
            {/* email */}
            <Controller
              control={control}
              name="email"
              rules={validators.isValidEmail}
              render={({ field }) => (
                <Input
                  variant="standard"
                  type="email"
                  label="Email"
                  size="lg"
                  error={errors.email}
                  {...field}
                />
              )}
            />

            {/* gender */}
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm">Gender</span>
                  <Radio.Group
                    options={[
                      {
                        label: "Male",
                        value: "male",
                      },
                      {
                        label: "Female",
                        value: "female",
                      },
                    ]}
                    onChange={onChange}
                    value={value}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </div>
              )}
            />
            {/* Date of birth */}
            <Controller
              control={control}
              rules={{ validate: (v) => !!v }}
              name="dob"
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm">Birthday</span>
                  <DatePicker
                    onChange={(value, dateString) =>
                      onChange({ value, dateString })
                    }
                    value={value?.value}
                    placeholder="Select Date"
                    style={errors.dob && { borderColor: "red" }}
                  />
                </div>
              )}
            />
            {/* phone number */}
            <Controller
              rules={{ validate: (x) => isValidPhoneNumber(x) }}
              control={control}
              name="phone_number"
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm">Phone Number</span>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={onChange}
                    className="rounded border border-[#ccc] p-2"
                    defaultCountry="EG"
                    style={errors.phone_number && { borderColor: "red" }}
                  />
                </div>
              )}
            />
            {/* skill level */}
            <Controller
              control={control}
              name="skill_level"
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm">Skill Level</span>
                  <Radio.Group
                    options={["A", "B", "C", "D"].map((letter) => ({
                      label: letter,
                      value: letter,
                    }))}
                    onChange={onChange}
                    value={value}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </div>
              )}
            />
            {/* password */}
            <Controller
              control={control}
              name="password"
              rules={validators.isNonEmptyString}
              render={({ field }) => (
                <Input
                  variant="standard"
                  type="password"
                  label="Password"
                  size="lg"
                  error={errors.password}
                  {...field}
                />
              )}
            />
            {/* confirm password */}
            <Controller
              control={control}
              name="confirm_password"
              rules={validators.isNonEmptyString}
              render={({ field }) => (
                <Input
                  variant="standard"
                  type="password"
                  label="Confirm Password"
                  size="lg"
                  error={errors.confirm_password}
                  {...field}
                />
              )}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-euclid_bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
