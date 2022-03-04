import React from "react";
import { Container, } from "@material-ui/core";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/fake-news" />} />
          <Route path="/fake-news" element={<Home />} />
          <Route path="/fake-news/search" element={<Home />} />
          {/* <Route path="/news/:id" component={NewsDetails}/> */}
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/fake-news" />} />
        </Routes>
      </Container>
    </BrowserRouter>
   
  );
};
export default App;
