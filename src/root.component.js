/* eslint-disable prettier/prettier */
import {useState, useEffect, useRef} from 'react';
import Header from "./components/Header";
//import { processPDF, getFormattedInfo } from './utils/utils';
import "./index.css";

export default function Root(props) {
  return (
    <section>
      <Header />
    </section>
  );
}
