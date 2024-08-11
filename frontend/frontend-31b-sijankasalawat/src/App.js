import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Navbar from "./pages/component/Navbar";
import Register from "./pages/register/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import UserRoutes from "./protected_routes/UserRoutes";
import ProductAdd from "./pages/product_add/ProductAdd";
import ResetPassword from "./pages/login/ResetPassword";
import Profile from "./pages/profile/Profile";
import ProductDetail from "./pages/product_add/ProductDetail";

function App() {
  return (
    <Router>
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
        <Route element={<UserRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productDetail/:productId" element={<ProductDetail/>} /> 
        <Route path="/productAdd" element={<ProductAdd/>} />
        <Route path="/profile" element={<Profile/>}/>
       
        </Route>
        <Route path="*" element={<h1>404 Page Not Found</h1>}/>

      </Routes>
    </Router>
  );
}

export default App;
