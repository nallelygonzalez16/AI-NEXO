import React, { useState } from 'react';
import axios from 'axios';

function PredictComponent() {
  const [formData, setFormData] = useState({
    Tiempo_de_estudio: '',
    Asistencia: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePredict = () => {
    // Convierte los valores a números (si es necesario)
    const tiempo_de_estudio = parseFloat(formData.Tiempo_de_estudio);
    const asistencia = parseFloat(formData.Asistencia);

    // Realiza la solicitud POST al servidor Flask
    axios.post('/predict', { Tiempo_de_estudio: tiempo_de_estudio, Asistencia: asistencia })
      .then((response) => {
        // Maneja la respuesta del servidor
        console.log(response.data);
        setPrediction(response.data.Prediccion);
      })
      .catch((error) => {
        // Maneja los errores de la solicitud
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Predicción</h2>
      <label>Tiempo de Estudio:</label>
      <input
        type="number"
        name="Tiempo_de_estudio"
        value={formData.Tiempo_de_estudio}
        onChange={handleInputChange}
      />
      <br />
      <label>Asistencia:</label>
      <input
        type="number"
        name="Asistencia"
        value={formData.Asistencia}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handlePredict}>Predecir</button>
      {prediction !== null && (
        <p>Resultado de la predicción: {prediction}</p>
      )}
    </div>
  );
}

export default PredictComponent;
