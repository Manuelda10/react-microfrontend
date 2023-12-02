/* eslint-disable prettier/prettier */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Document from "./pages/Document";
import Report from "./pages/Report";
import "./index.css";

export default function Root(props) {
  return (
      <Router basename="/react" >
      <Header />
        <Routes>
          <Route exact path="/" element={<h1>Hola</h1>} />
          <Route exact path="/document" element={<Document />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
  );
}
