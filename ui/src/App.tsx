import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import {Container} from "@mantine/core";
import Header from "./components/header/Header";
import Results from "./pages/Results";


function Layout() {
  return (
      <div className="layout">
        <Header/>
        <Container py={10}>
          <Outlet/>
        </Container>
      </div>
  );
}

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/results" element={<Results/>}/>
            <Route path="*" element={<NoMatch/>}/>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
