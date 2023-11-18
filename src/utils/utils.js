/* eslint-disable prettier/prettier */
import * as pdfjs from 'pdfjs-dist';
//import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

//pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const processPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjs.getDocument(arrayBuffer).promise;
  let combinedText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(' ');
    combinedText += ` ${pageText}`;
  }
  return combinedText;
}

const getFormattedInfo = (text) => {
  const date = text.match(/(\d{2}\/\d{2}\/\d{4})/g);
  const residente = text.split('Nombre: ')[1].split('Mail')[0];
  const departamento = text.split('DEPARTAMENTO: ')[1];
  const servicio = text.split('TIPO: ')[1].split('DEPARTAMENTO')[0];


  return {
    residente: residente.trim().toUpperCase(),
    departamento: departamento.trim().toUpperCase(),
    tipo_de_servicio: servicio.trim().toUpperCase(),
    fecha_de_pago: formatDate(date[0], 1)
  }
}

const formatDate = (date, type) => {
  if (type === 1) {
    const dateArray = date.split('/');
    const day = dateArray[0];
    const month = dateArray[1];
    const year = dateArray[2];
    return `${year}-${month}-${day}`;
  }

  if(type === 2) {
    const dateArray = date.split('-');
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    return `${day}/${month}/${year}`;
  }

  return 'INVALID DATE FORMAT'
}
  

export {
  processPDF,
  getFormattedInfo,
  formatDate
}