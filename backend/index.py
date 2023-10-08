from flask import Flask, request, jsonify
import joblib
from sklearn.linear_model import LinearRegression

import numpy as np

app = Flask(__name__)

# Cargar el modelo previamente guardado
model = joblib.load('modelo_regresion_lineal.pkl')

@app.route('/home')
def home():
    return {"res":["API para modelo de regresión lineal"]}


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Obtener datos JSON del cuerpo de la solicitud
        data = request.json
        tiempo_de_estudio = data['Tiempo_de_estudio']
        asistencia = data['Asistencia']

        # Convertir los datos a un array de NumPy
        input_data = np.array([[tiempo_de_estudio, asistencia]])

        # Realizar la predicción utilizando el modelo cargado
        prediction = model.predict(input_data)

        # Devolver la predicción como respuesta JSON
        return jsonify({"Prediccion": prediction[0]})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)