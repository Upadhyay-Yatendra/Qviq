import './App.css';
// bootstrap css 
import 'bootstrap/dist/css/bootstrap.min.css';
// router 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sign_in from './components/Sign_in';
import Sign_up from './components/Sign_up';
import Edit from './components/Edit';
import View from './components/View';
import Home from './components/Home';
import { useState } from 'react';
import ViewTree from './components/ViewTree';


function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authtoken"));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home authToken={authToken} setAuthToken={setAuthToken} showCreate={false} />} />
          <Route path="/view" element={<View authToken={authToken} setAuthToken={setAuthToken} shownav={true} />} />
          <Route path="/edit" element={<Edit authToken={authToken} setAuthToken={setAuthToken} />} />
          <Route path="/sign_up" element={<Sign_up authToken={authToken} setAuthToken={setAuthToken} />} />
          <Route path="/sign_in" element={<Sign_in authToken={authToken} setAuthToken={setAuthToken} />} />
          <Route path="/:username" element={<ViewTree showCreate={true} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
