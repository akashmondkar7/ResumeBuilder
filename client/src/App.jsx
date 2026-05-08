import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import api from "./configs/api";
import { login, setLoading } from "./app/fetures/authSlice";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: {
            Authorization: token,
          },
        });
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.massage);
    }
  };

  useEffect(()=>{
    getUserData();
  },[])

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder" element={<Navigate to="/app/builder/res123" />} />

        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
      </Route>

      <Route path="/view/:resumeId" element={<Preview />} />

      {/* optional fallback */}
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
}
