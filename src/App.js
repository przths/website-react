import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOME_PAGE_URL } from "./Common/Constants";
import HomePage from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PAGE_URL} element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
