/* eslint-disable prettier/prettier */
import {useState, useEffect, useRef} from 'react';
import { processPDF, getFormattedInfo, formatDate } from '../utils/utils'; 
import { getDocuments, createDocument, deleteDocument } from '../api/services/api';
import logo from "../assets/logo.png";
import reload from "../assets/reload.png";
import "../index.css";

export default function Document(props) {
  const fileRef = useRef(null)
  const [pdfInfo, setPDFInfo] = useState({})
  const [data, setData] = useState([])

  const [servicio, setServicio] = useState('');
  const [fechaDePago, setFechaDePago] = useState('');

  const handleFilters = async () => {
    console.log("-----Filtrando-----")
    let filteredData = []

    if((fechaDePago === undefined || fechaDePago === '') && (servicio === undefined || servicio === '')) {
      return
    }

    data.forEach((document) => {
      if(fechaDePago === undefined || fechaDePago === '') {
        if(document.tipo_de_servicio === servicio){
          filteredData.push(document)
        }
      } else if(servicio === undefined || servicio === '') {
        if(document.fecha_de_pago === formatDate(fechaDePago, 2)){
          filteredData.push(document)
        }
      } else if(document.fecha_de_pago === formatDate(fechaDePago, 2) && document.tipo_de_servicio === servicio){
        filteredData.push(document)
      } else {
        console.log("No hay coincidencias")
      }
    })

    setData(filteredData)
  } 

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      return;
    }
    const dataPDFText = await processPDF(file)
    const dataPDF = getFormattedInfo(dataPDFText)
    setPDFInfo(dataPDF)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log("DATA A ENVIAR: ", pdfInfo)
    console.log("FILE REF ", fileRef.current?.files?.[0])
  
    try {
      const formData = new FormData()
      formData.append("file", fileRef.current?.files?.[0])
      Object.keys(pdfInfo).forEach(key => {
        formData.append(key, pdfInfo[key])
      })
  
      console.log("FORM DATA: ", formData)
  
      const createdDocument = await createDocument(formData)
      setData([...data, createdDocument])
    } catch (err) {
      console.log("ERROR: ", err)
    }
  }

  const handleDeleteDocument = async (id) => {
    const deletedDocument = await deleteDocument(id)
    setData(data.filter(doc => doc.id_documento !== deletedDocument.id_documento))
  }
  
  const handleGetDocuments = async () => {
    setServicio('')
    setFechaDePago('')
    const documents = await getDocuments()
    setData(documents)
  }
  
  useEffect(() => {
    handleGetDocuments()
  }, [])

  return(
    <div className='flex justify-center items-center'>
        <div className='w-[80%] my-12'>
          <h1 className='font-semibold text-2xl'>DOCUMENTOS</h1>
          <p className='mt-2' >Visualizar archivos y subir nuevos archivos.</p>
          <div className='bg-gray-200 py-2 my-4 flex'>
            <input value={fechaDePago} onChange={(e) => setFechaDePago(e.target.value)} type='date' placeholder='Fecha de pago' alt='fecha de pago' className='border-solid border-2 border-gray-300 px-3 py-1 rounded-sm outline-none focus:border-blue-500 mx-2'></input>
            <input value={servicio} onChange={(e) => setServicio(e.target.value)} type='search' placeholder='Tipo de servicios' className='border-solid border-2 border-gray-300 px-3 py-[5px] rounded-sm outline-none focus:border-blue-500 mx-2 '></input>
            <button onClick={handleFilters} className='rounded-md px-4 bg-white text-gray-600 mx-2 hover:text-gray-900 ease-in duration-200'>
              Filtrar
            </button>
            <button onClick={handleGetDocuments} className='rounded-md px-4 bg-blue-600 text-white mx-2 hover:bg-blue-700 ease-in duration-200'>
              <img alt='refrescar' src={reload} className="mr-1 w-6"/>
            </button>
            <form onSubmit={handleSubmit} className='flex'>
              <div className='w-[70%]'>
                <input ref={fileRef} className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-non file:bg-blue-600 file:rounded-sm file:outline-none file:text-white file:border-0 file:px-4 file:py-1.5" onChange={handleFileChange} accept=".pdf" id="file_input" type="file" name="file"/>
              </div>
              <input type='submit' value="Añadir" className='rounded-md px-4 py-1.5 bg-blue-600 text-white mx-2 hover:bg-blue-700 ease-in duration-200 hover:cursor-pointer'/>
            </form>
            
          </div>
          <div className='py-2 my-4'>
          <table className='w-[100%]'>
            <thead className='text-left text-gray-500 border-b-2 border-gray-300'>
              <tr>
                <th>Departamento</th>
                <th>Residente</th>
                <th>Fecha de pago</th>
                <th>Servicio</th>
                <th>Archivo</th>
                {/* Agrega más columnas estáticas si es necesario */}
              </tr>
            </thead>
            <tbody className='text-left'>
              {data.map((row, index) => (
                <tr key={index} className='border-b-2 border-gray-300'>
                  <td>{row.departamento}</td>
                  <td>{row.residente}</td>
                  <td>{row.fecha_de_pago}</td>
                  <td>{row.tipo_de_servicio}</td>
                  <td className='flex text-left'>
                    <a href={row.url_pdf} className='flex rounded-md bg-blue-500 text-white hover:bg-blue-700 px-3 py-1 m-1 ease-in duration-200 hover:cursor-pointer' >
                      <img alt="Visualizar archivo"  src={logo} className="mr-1 w-6"/>
                      Ver
                    </a>
                    <button onClick={e => handleDeleteDocument(row.id_documento)} className='flex rounded-md bg-red-500 text-white hover:bg-red-700 px-3 py-1 m-1 ease-in duration-200'>
                      <img alt="Eliminar archivo"  src={logo} className="mr-1 w-6" />
                      Eliminar
                    </button>
                  </td>
                  {/* Renderiza más celdas de acuerdo a tus datos */}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
  )


}