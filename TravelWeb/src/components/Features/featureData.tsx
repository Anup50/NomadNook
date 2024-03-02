import React from "react";

import { FaMapSigns } from "react-icons/fa";
import { LuMousePointerClick } from "react-icons/lu";
import { RiCustomerServiceLine } from "react-icons/ri";


export type Feature = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const features = [
  {
    id: 1,
    title: "User-friendly Interface",
    description:
      "Enjoy a sleek and intuitive interface for a seamless user experience.",
    icon: <LuMousePointerClick 
    size={35}/>,
  },
  {
    id: 2,
    title: "Destination Discovery",
    description:
      "Explore a wide range of destinations with detailed information and stunning visuals.",
    icon: <FaMapSigns size={35} />,
  },
  {
    id: 5,
    title: "Dedicated Client Support",
    description:
      "Receive personalized assistance from our dedicated support team throughout your journey.",
    icon: <RiCustomerServiceLine size={35} />,
  },

];

