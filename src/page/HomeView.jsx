import React, { useState } from "react";
import { CarsSection } from "../components/Fragments/CarsSection";
import NavbarWithStyling from "../components/navbar/navbarWithStyling";
import { SearchSection } from "../components/Fragments/SearchSection";
import { Footer } from "../components/Fragments/Footer";
import { Header } from "../components/Fragments/Header";

const HomeView = () => {
  const [driverType, setDriverType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [cars, setCars] = useState([]);
  
  return (
    <>
      <NavbarWithStyling />
      <Header />
      <SearchSection
        driverType={driverType}
        setDriverType={setDriverType}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        numberOfPassengers={numberOfPassengers}
        setNumberOfPassengers={setNumberOfPassengers}
        setCars={setCars}  // Pass setCars correctly
      />
      <CarsSection cars={cars} />
      <Footer />
    </>
  );
};

export default HomeView;
