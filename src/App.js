import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROOT_PAGE_URL, HOME_PAGE_URL } from "./Common/Constants";
import HomePage from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {[ROOT_PAGE_URL, HOME_PAGE_URL].map((path, index) => 
            <Route path={path} element={<HomePage/>} key={index} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
