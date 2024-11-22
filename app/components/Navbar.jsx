import React from "react";

const Navbar = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Movie List</h1>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
