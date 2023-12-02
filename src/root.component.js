/* eslint-disable prettier/prettier */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Document from "./pages/Document";
import Report from "./pages/Report";
import Welcome from "./pages/Welcome";
import "./index.css";

export default function Root(props) {
  return (
      <Router>
      <Header />
        <Routes>
          <Route exact path="/" element={<Welcome/>} />
          <Route exact path="/documentos" element={<Document />} />
          <Route path="/reportes" element={<Report />} />
        </Routes>
      </Router>
  );
}
