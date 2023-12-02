/* eslint-disable prettier/prettier */
import Header from "./components/Header";
import Document from "./pages/Document";
import Report from "./pages/Report";
import "./index.css";

export default function Root(props) {
  return (
    <section>
      <Header />
      <Document/>
      <Report/>
    </section>
  );
}
