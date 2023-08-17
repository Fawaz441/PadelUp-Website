import { Link, useNavigate } from "react-router-dom";
import { DatePicker, Popover, Radio } from "antd";
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
import { useEffect } from "react";
import { useAuth } from "@/helpers";
import SocialButton from "@/widgets/buttons/social-button";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { InfoCircleOutlined } from "@ant-design/icons";
import SkillsInfo from "@/widgets/misc/skills_info";
import authAPIs from "@/api/auth";
import { toast } from "react-hot-toast";


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
  const navigate = useNavigate();
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

  const { signup, user } = useAuth();

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
        birthday: transformDateFormat(dob.dateString),
        is_signed_up: false
      };
      // const formData = new FormData()
      // Object.keys(payload).map((key => {
      //   formData.append(`user[${key}]`, payload[key])
      // }))
      try {
        await authAPIs.register({ user: payload })
        toast.success("Registration successful")
      }
      catch (e) {
        toast.error(e?.response?.data?.message || "There was an error")
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleSocialLogin = (user) => {
    console.log(user);
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const responseFacebook = (response) => {
    console.log(response);
  }


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
                  <div className="flex space-x-1 items-center">
                    <span className="text-sm">Skill Level</span>
                    <SkillsInfo />
                  </div>
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
            <hr />
            <p className="text-center text-sm mt-3">or</p>
            <div className="flex flex-col justify-center items-center space-y-1 mt-3">
              {/* sign in with facebook */}

              <FacebookLogin
                // appId="1088597931155576"
                autoLoad
                fields="name,email,picture"
                render={props => (
                  <button onClick={props.onClick} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                    <div className="flex items-center space-x-1 justify-center">
                      <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="30px" height="30px" fillRule="nonzero">
                        <g fillOpacity="0" fill="#000000" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                          <g transform="scale(5.12,5.12)">
                            <path stroke="white" d="M25,3c-12.13844,0 -22,9.86156 -22,22c0,11.01913 8.12753,20.13835 18.71289,21.72852l1.14844,0.17383v-17.33594h-5.19727v-3.51953h5.19727v-4.67383c0,-2.87808 0.69065,-4.77363 1.83398,-5.96289c1.14334,-1.18926 2.83269,-1.78906 5.18359,-1.78906c1.87981,0 2.61112,0.1139 3.30664,0.19922v2.88086h-2.44727c-1.38858,0 -2.52783,0.77473 -3.11914,1.80664c-0.59131,1.03191 -0.77539,2.264 -0.77539,3.51953v4.01758h6.12305l-0.54492,3.51953h-5.57812v17.36523l1.13477,-0.1543c10.73582,-1.45602 19.02148,-10.64855 19.02148,-21.77539c0,-12.13844 -9.86156,-22 -22,-22zM25,5c11.05756,0 20,8.94244 20,20c0,9.72979 -6.9642,17.7318 -16.15625,19.5332v-12.96875h5.29297l1.16211,-7.51953h-6.45508v-2.01758c0,-1.03747 0.18982,-1.96705 0.50977,-2.52539c0.31994,-0.55834 0.62835,-0.80078 1.38477,-0.80078h4.44727v-6.69141l-0.86719,-0.11719c-0.59979,-0.08116 -1.96916,-0.27148 -4.43945,-0.27148c-2.7031,0 -5.02334,0.73635 -6.625,2.40234c-1.60166,1.66599 -2.39258,4.14669 -2.39258,7.34961v2.67383h-5.19727v7.51953h5.19727v12.9043c-9.04433,-1.91589 -15.86133,-9.84626 -15.86133,-19.4707c0,-11.05756 8.94244,-20 20,-20z"></path>
                          </g>
                        </g>
                      </svg>

                      Sign in with Facebook
                    </div>
                  </button>
                )}
                callback={responseFacebook} />

              {/* sign in with google */}
              <SocialButton
                provider="google"
                appId="YOUR_APP_ID"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                className="flex items-center justify-center space-x-1"
              >
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-1">
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="30px" height="30px" fillRule="nonzero">
                      <g fillOpacity="0" fill="#000000" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                        <g transform="scale(5.12,5.12)">
                          <path stroke="white" d="M26,2c-12.69141,0 -23,10.30859 -23,23c0,12.69141 10.30859,23 23,23c9.91797,0 15.97266,-4.5625 19.125,-10.21875c3.15234,-5.65625 3.55078,-12.30078 2.59375,-16.84375l-0.1875,-0.78125h-0.78125l-20.75,-0.03125h-1v10.40625h11.4375c-1.72656,4 -5.24219,6.75 -10.4375,6.75c-6.78906,0 -12.28125,-5.49219 -12.28125,-12.28125c0,-6.78906 5.49219,-12.28125 12.28125,-12.28125c3.05078,0 5.82031,1.12891 7.96875,2.96875l0.71875,0.59375l6.84375,-6.84375l0.71875,-0.75l-0.75,-0.6875c-4.08594,-3.72266 -9.53906,-6 -15.5,-6zM26,4c5.07422,0 9.65234,1.85547 13.28125,4.84375l-4.8125,4.8125c-2.37891,-1.77734 -5.26953,-2.9375 -8.46875,-2.9375c-7.87109,0 -14.28125,6.41016 -14.28125,14.28125c0,7.87109 6.41016,14.28125 14.28125,14.28125c6.55078,0 11.26172,-4.01562 12.9375,-9.46875l0.40625,-1.28125h-12.34375v-6.40625l18.84375,0.03125c0.66406,4.03516 0.22266,9.82813 -2.46875,14.65625c-2.85937,5.125 -8.05469,9.1875 -17.375,9.1875c-11.61328,0 -21,-9.39062 -21,-21c0,-11.60937 9.38672,-21 21,-21z"></path>
                        </g>
                      </g>
                    </svg>

                    Sign in with Google
                  </div>
                </button>
              </SocialButton>
              {/* {isAppleDevice() && <SocialButton
                provider="apple"
                //  appId="YOUR_APP_ID"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
              >
                Sign in with Apple
              </SocialButton>} */}
            </div>
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
