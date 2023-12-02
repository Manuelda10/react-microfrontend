/* eslint-disable prettier/prettier */
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { formatDate } from '../utils/utils';

export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};

export default function App(props) {
  const {data} = props;
  const [formattedData, setFormattedData] = useState([]);

  const formatData = useCallback((data) => {
    const dataFormatted = data.map((item) => {
      return {
        fecha_de_pago: formatDate(item.fecha_de_pago, 1),
        tipo_de_servicio: item.tipo_de_servicio
      }
    })

    const filteredData = filterDates(dataFormatted)

    filteredData.sort((a, b) => {
      return new Date(a.fecha_de_pago) - new Date(b.fecha_de_pago)
    })


    const newData = filteredData.map((item) => {
      return {
        time: item.fecha_de_pago,
        value: getRandomNumber(100, 400)
      }
    })

    setFormattedData(newData)
  }, []);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const filterDates = (data) => {
    let fechasVistas = {};
    let arrayFiltrado = data.filter(objeto => {
      if (fechasVistas[objeto.fecha_de_pago]) {
        // Si la fecha ya fue vista, descarta este objeto
        return false;
      } else {
        // Si es la primera vez que vemos esta fecha, la registramos y mantenemos el objeto
        fechasVistas[objeto.fecha_de_pago] = true;
        return true;
      }
    });
    return arrayFiltrado;
  }

  useEffect(() => {
    formatData(data)
  }, [formatData, data])

	return (
		<ChartComponent data={formattedData}></ChartComponent>
	);
}