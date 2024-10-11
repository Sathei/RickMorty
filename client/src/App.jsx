import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Form from './components/form/Form'

//* Components *//

import Home from "./views/home/Home";
import Detail from "./views/detail/Detail"
import LoginPage from "./views/login/Login";
import Cloudinary from "./components/cloudinary/Cloudinary";
import Register from "./views/register/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cloudinary" element={<Cloudinary />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
