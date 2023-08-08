import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import validators from "@/utils";
import { showError } from "@/widgets/misc/alert";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

export function SignIn() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
  };

  return (
    <div>
      <div className="fixed top-0 h-full w-full  bg-[url('https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')] bg-cover bg-center" />
      <div className="fixed inset-0 left-0 top-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-[400px] w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {/* phone number */}
            <Controller
              rules={{ validate: (x) => isValidPhoneNumber(x) }}
              control={control}
              name="phone_number"
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm">Phone Number</span>
                  <PhoneInput
                    autoFocus
                    placeholder="Enter phone number"
                    value={value}
                    onChange={onChange}
                    className="rounded border border-[#ccc] p-2"
                    defaultCountry="EG"
                    style={errors.phone_number && {borderColor:"red"}}
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
            {/* <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit(onSubmit)}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-euclid_bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
