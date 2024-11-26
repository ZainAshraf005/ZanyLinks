"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "@/components/home/Hero";
import SecondPg from "@/components/home/SecondPg";
import ThirdPg from "@/components/home/ThirdPg";
import FourthPg from "@/components/home/FourthPg";

const Page = () => {
  return (
    <>
      <div>
        <div className=" scroll-smooth w-full relative">
          <Navbar />
          <Hero />
          <SecondPg />
          <ThirdPg />
          <FourthPg />
        </div>
      </div>
    </>
  );
};

export default Page;
