import requests
import json

# URL de la API REST de Flask
url = "http://127.0.0.1:5000/predict"

# Datos que queremos enviar como entrada al modelo
data = {
    "Tiempo_de_estudio": 5,
    "Asistencia": 2
}

# Realizar la solicitud POST
response = requests.post(url, json=data)

# Verificar si la solicitud fue exitosa
if response.status_code == 200:
    # Parsear la respuesta a JSON y obtener la predicción
    prediction = json.loads(response.text)["Prediccion"]
    print(f"La predicción es: {prediction}")
else:
    print(f"Ocurrió un error: {response.text}")