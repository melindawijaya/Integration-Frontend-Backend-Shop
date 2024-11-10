import { useState } from "react";
// import "./NavbarWithStyling.css";
// import About from "../about/About";
// import Button from "../../components/Elements/button/HoverButton";

const NavbarWithStyling = () => {
    return (
        <>
        <nav className="bg-transparent">
            <div className="container mx-auto flex items-center justify-between py-4">
                <a href="index.html">
                    <img
                        src="images/logo.png"
                        alt="BCR Logo"
                        className="w-24 h-8"
                    />
                </a>
                <button
                    className="text-gray-700 md:hidden focus:outline-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="hidden md:flex space-x-8">
                    <a href="#ourservices" className="text-gray-700 hover:text-blue-500">Our Services</a>
                    <a href="#whyus" className="text-gray-700 hover:text-blue-500">Why Us</a>
                    <a href="#testimonial" className="text-gray-700 hover:text-blue-500">Testimonial</a>
                    <a href="#faq" className="text-gray-700 hover:text-blue-500">FAQ</a>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">Register</button>
                </div>
            </div>
        </nav>
        </>
    );
};

export default NavbarWithStyling;