import React from "react";
import {
  Card,
  List,
  theme,
  Breadcrumb,
  Layout,
  Button,
  Modal,
  Divider,
  Typography,
} from "antd";
import { CardBody } from "@material-tailwind/react";
const { Content } = Layout;

const Terms = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
        <Breadcrumb.Item>Terms & Conditions</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          flex: 1,
          background: colorBgContainer,
        }}
      >
        <CardBody className="flex flex-col gap-4">
          <h1 className="font-euclid_bold text-[20px]">
            PadelUp Terms and Conditions
          </h1>
          <div className="text-[18px] leading-[30px]">
            <h2>1. Account Information:</h2>
            <p className="font-euclid_semibold">
              You are responsible for maintaining the confidentiality of your
              account information and password. Any activities that occur under
              your account are your responsibility. Please notify us immediately
              of any unauthorized use of your account.
            </p>
            <br />
            <br />
            <h2>2. Reservation and Cancellation:</h2>
            <p>
              a. You can reserve a court through our platform based on
              availability.
              <br />
              b. Cancellations can be made up to three hours before the
              reservation time without incurring any charges.
            </p>
            <br />
            <br />
            <h2>3. Payment:</h2>
            <p>
              a. For online payments, PadelUp uses secure third-party payment
              gateways.
              <br />
              b. Cash payments are accepted as well, with a valid card on file
              as a guarantee for no-shows.
            </p>
            <br />
            <br />
            <h2>4. User Conduct:</h2>
            <p>
              a. You agree to use PadelUp in compliance with all applicable laws
              and regulations.
              <br />
              b. You will not engage in any activity that interferes with or
              disrupts the platform's functionality.
            </p>
            <br />
            <br />
            <h2>5. Community Guidelines:</h2>
            <p>
              a. PadelUp promotes respectful and fair play.
              <br />
              b. Users are expected to maintain a positive and sportsmanlike
              attitude towards fellow players.
            </p>
            <br />
            <br />
            <h2>6. Liability:</h2>
            <p>
              a. PadelUp is not responsible for any injuries, accidents, or
              damages that occur during or as a result of gameplay.
              <br />
              b. Users participate at their own risk and are advised to follow
              safety guidelines.
            </p>
            <br />
            <br />
            <h2>7. Privacy:</h2>
            <p>
              a. Your privacy is important to us. We collect and handle your
              data in accordance with our Privacy Policy.
            </p>
            <br />
            <br />
            <h2>8. Modifications:</h2>
            <p>
              a. PadelUp reserves the right to modify or terminate services at
              any time.
              <br />
              b. We may update these Terms and Conditions from time to time.
              It's your responsibility to review changes.
            </p>
            <br />
            <br />
            <h2>9. Add another credit card::</h2>
            <p>
              NOTE: Credit card is only required to create your account, players still
              have the option to pay cash, internal wallet, external wallet, or
              automatically by credit card
            </p>
            <br />
            When entering credit card; and later in profile/account settings there
            must be check box icon {'>'} choose this method of payment as your
            preferred method of payment.
            <br />

            <h2>10. Termination:</h2>
            <p>
              PadelUp reserves the right to suspend or terminate accounts that
              violate our terms or engage in harmful activities.
            </p>
            <br />
            <br />
            <h2>11. Contact Us:</h2>
            <p>
              If you have any questions or concerns regarding these terms,
              please contact us at [contact email/phone number].
            </p>

            <p>
              By using PadelUp, you acknowledge that you have read, understood,
              and agreed to these Terms and Conditions. Thank you for being a
              part of our tennis community!
            </p>
          </div>
        </CardBody>
      </div>
    </Content>
  );
};

export default Terms;
