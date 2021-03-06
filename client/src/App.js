import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import FakeNewsDetails from "./components/FakeNewsDetails/FakeNewsDetails";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NewAdmin from "./components/NewAdmin/NewAdmin";

const customTheme = createTheme({
  palette: {
    primary: teal,
  },
});

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  const setuser = (value) => {
    setUser(value);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar setuser={setuser} />
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Navigate to="/fake-news" />} />
              <Route path="/fake-news" element={<Home />} />
              <Route path="/fake-news/search" element={<Home />} />

              <Route
                path="/fake-news/:id"
                element={<FakeNewsDetails />}
                forceRefresh={true}
              />

              <Route
                path="/auth"
                element={!user ? <Auth /> : <Navigate to="/fake-news" />}
              />
              <Route
                path="/new-admin"
                element={
                  user?.adminStatus ? (
                    <NewAdmin></NewAdmin>
                  ) : (
                    <Navigate to="/fake-news" />
                  )
                }
              />
            </Routes>
          </ScrollToTop>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
