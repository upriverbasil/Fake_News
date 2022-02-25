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
        <Route path="/" render={() => <Navigate replace to="/news" />} />
          <Route path="/news" element={<Home />} />
          <Route path="/news/search" element={<Home />} />
          {/* <Route path="/news/:id" component={NewsDetails}/> */}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
   
  );
};
export default App;
