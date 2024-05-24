import React from "react";
import CustomNavbar from "../components/Navbar/navbar";
import {
  clear_auth_token,
  clear_user_details,
  get_auth_token,
  get_user_details,
} from "../utils/authUtils";
import { withConsole } from "@storybook/addon-console";

export default {
  title: "Components/CustomNavbar",
  decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
  component: CustomNavbar,
};

const Template1 = (args) => <CustomNavbar {...args} />;

export const Default = Template1;
Default.args = {
  user_details: {
    email: "sharukhan@webkorps.com",
  },
};

const Template2 = (args) => <CustomNavbar {...args} />;
export const LoggedInUser = Template2.bind({});
LoggedInUser.args = {
  user_details: {
    email: "sharukhan@webkorps.com",
  },
  make_logout: () => {
    console.log("Logout button clicked.");
  },
};

const Template3 = (args) => <CustomNavbar {...args} />;
export const LoggedOutUser = Template3.bind({});
LoggedOutUser.args = {
  user_details: {
    email: "sharukhan@webkorps.com",
  },
  make_logout: () => {
    console.log("Logout button clicked.");
  },
};
