import { Route, Routes, Navigate } from "react-router-dom";
import Form from './components/form/Form'
import './App.css'
import './output.css'
//import 'bootstrap/dist/css/bootstrap.min.css';

//* Components *//

import Home from "./views/home/Home";
import Detail from "./views/detail/Detail"
import LoginPage from "./views/login/Login";
import Cloudinary from "./components/cloudinary/Cloudinary";
import Register from "./views/register/Register";
import Loading from "./views/loading/loading";


function App() {

  return (
    <div>
      <Routes>

        <Route path="/" element={<Navigate to='/home' />} />
        <Route path="/loading" element={<Loading/>}/>
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
