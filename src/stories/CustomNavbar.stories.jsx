import React from "react";
import CustomNavbar from "../components/Navbar/navbar";

export default {
  title: "Components/CustomNavbar",
  component: CustomNavbar,
  tags: ['autodocs'],
};

const Template1 = (args) => <CustomNavbar {...args}/>;

export const Default = Template1;
Default.args = {};
