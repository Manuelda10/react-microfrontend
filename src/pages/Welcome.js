/* eslint-disable prettier/prettier */

import React from 'react';
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
  
    <div className='w-100 h-80 flex justify-center items-center  p-20 text-center' >
      <div>
        <h1 className='text-5xl text-blue-600 font-bold' >BIENVENIDO AL SISTEMA DE GESTIÓN DOCUMENTAL</h1><br></br>
        <p className='text-2xl' >Puedes gestionar tus documentos, los pagos y visualizar los reportes correspondientes.</p>
        <br></br>
        <div className='w-100 flex justify-center items-center'>
          <Link to="/reportes" className='bg-blue-600 text-white rounded-md px-4 py-2 font-medium hover:bg-blue-700 ease-in duration-200 mx-2'>Ir a Reportes</Link>
          <Link to="/documentos" className='bg-blue-600 text-white rounded-md px-4 py-2 font-medium hover:bg-blue-700 ease-in duration-200 mx-2'>Ir a Documentos</Link>
          <a href='http://localhost:9000/seguimiento' className='bg-green-500 text-white rounded-md px-4 py-2 font-medium hover:bg-green-700 ease-in duration-200 mx-2'>Ir a Seguimiento de Pagos</a>
        </div>
      </div>
      
    </div>
    
  );
};

export default Welcome;
