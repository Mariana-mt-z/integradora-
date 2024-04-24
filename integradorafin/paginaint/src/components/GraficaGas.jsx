import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { GasContext } from '../context/gas.context'; // Importa el contexto del sensor de gas

const GasChart = () => {
  const { historialNiveles } = useContext(GasContext); // Obtén el historial de niveles de gas del contexto

  // Función para procesar los datos y contar los registros de gas por día
  const contarRegistrosDeGasPorDia = () => {
    // Objeto para almacenar el recuento de registros de gas por día
    const registrosDeGasPorDia = {};

    // Recorremos los registros y contamos los registros con fuga detectada por día
    historialNiveles.forEach(registro => {
      const fecha = new Date(registro.fecha);
      // Obtenemos el día, el mes y el año
      const dia = fecha.getDate().toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
      const año = fecha.getFullYear();
      // Formateamos la fecha en el formato dd/mm/yyyy
      const formattedFecha = `${dia}/${mes}/${año}`;
      // Si se detectó una fuga en este registro, lo contamos para este día
      if (registro.fugaDetectada) {
        registrosDeGasPorDia[formattedFecha] = (registrosDeGasPorDia[formattedFecha] || 0) + 1;
      }
    });

    // Convertimos el objeto en un array de objetos para el gráfico de barras
    const data = Object.keys(registrosDeGasPorDia).map(fecha => ({
      fecha,
      registrosDeGas: registrosDeGasPorDia[fecha]
    }));

    return data;
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}> {/* Agregamos estilos al contenedor principal */}
    <h1 style={{ textAlign: 'center' }}>Registro de Gas por Día</h1> {/* Estilos para el título */}
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <BarChart
        width={300}
        height={400}
        data={contarRegistrosDeGasPorDia()}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="registrosDeGas" fill="#003094" />
        </BarChart>
      </div>
    </div>
  );
};

export default GasChart;
