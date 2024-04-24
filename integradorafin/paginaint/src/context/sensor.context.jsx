import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const MovimientoContext = createContext();

export const MovimientoProvider = ({ children }) => {
  const [historialMovimientos, setHistorialMovimientos] = useState([]);


  useEffect(() => {
    fetchData(); // Llama a la función para obtener los datos cuando el componente se monta
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/movimiento");
      setHistorialMovimientos(response.data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <MovimientoContext.Provider value={{ historialMovimientos }}>
      {children}
    </MovimientoContext.Provider>
  );
}
