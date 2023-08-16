import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { Button, CardBody, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker, Radio } from "antd";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import validators from "@/utils";
import { showError } from "@/widgets/misc/alert";
import { useEffect } from "react";
import { useAuth } from "@/helpers";
import authAPIs from "@/api/auth";
import { toast } from "react-hot-toast";

const { Content } = Layout;

const Profile = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user, refreshData, token } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      first_name: user?.firstName,
      last_name: user?.lastName,
      username: user?.username,
      email: user?.email,
      phone_number: user?.mobile,
      gender: user?.gender,
      dob: user?.birthday,
      // password: "",
      // confirm_password: "",
      skill_level: user?.skill_level,
    },
  });

  const onSubmit = async (data) => {
    const payload = { ...data, dob: data.dob.dateString }
    try {
      const formData = new FormData()
      Object.keys(payload).map((key => {
        formData.append(key, payload[key])
      }))
      // formData.append("token", token)
      await authAPIs.updateUser(formData)
      toast.success("Profile updated successfully")
      refreshData()
    }
    catch (e) {
      toast.error("There was an error while trying to update your profile.")
    }
  };

  return (
    <Content
      style={{
        margin: "0 16px",
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          flex: 1,
          background: colorBgContainer,
        }}
      >
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
          {/* <Controller
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
          /> */}
          {/* confirm password */}
          {/* <Controller
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
          /> */}
        </CardBody>
        <Button variant="gradient" fullWidth onClick={handleSubmit(onSubmit)}>
          Save Changes
        </Button>
      </div>
    </Content>
  );
};

export default Profile;
