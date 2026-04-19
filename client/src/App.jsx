import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Layout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder/:resumeId" element={<ResumeBuilder />} />
        <Route path="/view/:resumeId" element={<Preview />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
