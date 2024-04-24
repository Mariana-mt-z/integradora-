import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'; // Quitamos la importación de Legend
import { MovimientoContext } from '../context/sensor.context';

const MovimientoChart = () => {
  const { historialMovimientos } = useContext(MovimientoContext);

  // Función para procesar los datos y contar los movimientos por día
  const contarMovimientosPorDia = () => {
    // Objeto para almacenar el recuento de movimientos por día
    const movimientosPorDia = {};

    // Recorremos los registros de movimientos y contamos los movimientos por día
    historialMovimientos.forEach(movimiento => {
      // Verificamos si el movimiento fue detectado
      if (movimiento.detectado) {
        const fecha = new Date(movimiento.fecha);
        // Obtenemos el día, el mes y el año
        const dia = fecha.getDate().toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
        const año = fecha.getFullYear();
        // Formateamos la fecha en el formato dd/mm/yyyy
        const formattedFecha = `${dia}/${mes}/${año}`;
        movimientosPorDia[formattedFecha] = (movimientosPorDia[formattedFecha] || 0) + 1;
      }
    });

    // Convertimos el objeto en un array de objetos para el gráfico de barras
    const data = Object.keys(movimientosPorDia).map(fecha => ({
      fecha,
      movimientos: movimientosPorDia[fecha]
    }));

    return data;
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Registro de Movimientos por Día</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <BarChart
          width={800}
          height={400}
          data={contarMovimientosPorDia()}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          {/* Quitamos la leyenda */}
          <Bar dataKey="movimientos" fill="#003094" />
        </BarChart>
      </div>
    </div>
  );
};

export default MovimientoChart;
