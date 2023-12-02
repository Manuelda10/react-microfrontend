/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import ChartComponent from "../components/ChartComponent";
import { getDocuments } from '../api/services/api';
import reload from "../assets/reload.png";

export default function Report(props) {
  const [departamento, setDepartamento] = useState('');
  const [cliente, setCliente] = useState('');
  const [showSection, setShowSection] = useState(false); 
  const [data, setData] = useState([]);

  const handleFilters = async () => {
    console.log("-----Filtrando-----")
    let filteredData = []

    data.forEach((document) => {
      if(document.departamento === departamento){
        filteredData.push(document)
        setCliente(document.residente)
      }
    })

    setData(filteredData)
    setShowSection(true);
  }

  const handleGetDocuments = async () => {
    setDepartamento('')
    setCliente('')
    setShowSection(false);
    const documents = await getDocuments()
    setData(documents)
  }

  useEffect(() => {
    handleGetDocuments()
  }, [])


  return (
    <div className='flex justify-center items-center'>
      <div className='w-[80%] my-12'>
        <h1 className='font-semibold text-2xl'>REPORTE</h1>
        <div className='bg-gray-200 py-2 my-4 flex'>
          <input value={departamento} onChange={(e) => setDepartamento(e.target.value)} type='search' placeholder='Departamento' alt='Departamento' className='border-solid border-2 border-gray-300 px-3 py-1 rounded-sm outline-none focus:border-blue-500 mx-2'></input>
          <button onClick={handleFilters} className='rounded-md px-4 bg-white text-gray-600 mx-2 hover:text-gray-900 ease-in duration-200'>
            Filtrar
          </button>
          <button onClick={handleGetDocuments} className='rounded-md px-4 bg-blue-600 text-white mx-2 hover:bg-blue-700 ease-in duration-200'>
            <img alt='refrescar' src={reload} className="mr-1 w-6"/>
          </button>
        </div>
        {
          showSection && <h3 className='font-semibold text-xl'>Departamento: {departamento}. Cliente: {cliente}</h3>
        }
        <ChartComponent data={data} />
      </div>
    </div>
  );
}