import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const GasContext = createContext(); // Define el contexto

export const GasProvider = ({ children }) => {
  const [historialNiveles, setHistorialNiveles] = useState([]); // Define el estado para los niveles de gas

  useEffect(() => {
    fetchData(); // Llama a la función para obtener los datos cuando el componente se monta
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/gas"); // Realiza la solicitud HTTP para obtener los datos
      setHistorialNiveles(response.data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <GasContext.Provider value={{ historialNiveles }}>
      {children}
    </GasContext.Provider>
  );
}
