import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TrophyOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useAuth } from "@/helpers";
import Profile from "@/widgets/screens/profile";
import UserInfo from "@/widgets/screens/userinfo";
import Reservations from "@/widgets/screens/reservations";
import Terms from "@/widgets/screens/terms";
import Rankings from "@/widgets/screens/rankings";
import PlaySets from "@/widgets/screens/purchases";
import Academy from "@/widgets/screens/academy";
const { Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const menuItems = {
  profile: "profile",
  logout: "logout",
  user: "user",
  bookings: "bookings",
  terms: "terms",
  rankings: "rankings",
  playsets: "playsets",
  academy: "academy",
};

const items = [
  getItem("Home", menuItems.user, <PieChartOutlined />),
  getItem("Bookings", menuItems.bookings, <DesktopOutlined />),
  getItem("Rankings", menuItems.rankings, <TrophyOutlined />),
  getItem("Play Sets", menuItems.playsets, <ShoppingCartOutlined />),
  getItem("Academy", menuItems.academy, <ReadOutlined />),
  getItem("Profile", menuItems.profile, <UserOutlined />),
  getItem("Terms", menuItems.terms, <FileOutlined />),
  getItem("Logout", menuItems.logout, <LogoutOutlined />),
];
const Main = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState([menuItems.user]);

  useEffect(() => {
    if (activePage[0] === menuItems.logout) {
      logout();
    }
  }, [activePage]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <img
          src="/img/logo.png"
          alt="Logo"
          className="my-5 h-20 w-20 object-contain"
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={[menuItems.user]}
          selectedKeys={activePage}
          selectable
          mode="inline"
          items={items}
          onSelect={(x) => setActivePage([x.key])}
        />
      </Sider>
      <Layout>
        {activePage?.[0] === menuItems.user && <UserInfo />}
        {activePage?.[0] === menuItems.profile && <Profile />}
        {activePage?.[0] === menuItems.bookings && <Reservations />}
        {activePage?.[0] === menuItems.terms && <Terms />}
        {activePage?.[0] === menuItems.rankings && <Rankings />}
        {activePage?.[0] === menuItems.playsets && <PlaySets />}
        {activePage?.[0] === menuItems.academy && <Academy />}
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          PadelUp &copy;2022
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Main;
