/* eslint-disable prettier/prettier */
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-blue-500 flex justify-between sticky">
      <div className="w-[25%]">
        <div className="flex items-center w-20">
          <img src={logo} className="w-20" alt="Logo"/>
          <p className="text-sm text-white font-medium" >SISTEMA DE GESTIÓN DOCUMENTAL</p>
        </div>
      </div>
      <nav className="w-[50%] flex justify-center items-center">
        <ul className="w-[100%] flex justify-around text-gray-100  font-medium">
          <li className="hover:text-white">Reportes</li>
          <li className="hover:text-white">Documentos</li>
          <li className="hover:text-white">Análisis de la información</li>
          <li className="hover:text-white">Seguimiento de pagos</li>
        </ul>
      </nav>
      <div className="flex justify-end items-center w-[25%]">
        <button className="box-border bg-transparent border-solid border-2 border-white text-white rounded-md px-3 py-1 font-medium hover:bg-white hover:text-blue-500 ease-in duration-200 mx-2">Notificaciones</button>
      </div>
    </header>
  );
};

export default Header;
