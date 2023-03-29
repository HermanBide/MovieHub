import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import MainNav from "./components/MainNav";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "@mui/material"
import Search from "./pages/search/Search"
import Series from "./pages/series/Series"
import Movies from "./pages/movies/Movies"
import Trending from "./pages/trending/Trending"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
      <Container>
          <Routes>
              <Route path="/" exact element={<Trending/>} />
              <Route path="/movies" element={<Movies/>} />
              <Route path="/series" element={<Series/>} />
              <Route path="/search" element={<Search/>} />
          </Routes>
      </Container>
      </div>
        <MainNav />
    </BrowserRouter>
  );
}

export default App;
