import base64
from typing import Union
import cv2

from fastapi import FastAPI
from pydantic import BaseModel
from deepface import DeepFace
import numpy as np
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Image(BaseModel):
    data: str


@app.post("/api/v1/faces_analyze")
def analyze_faces(image: Image):
    # Convert the image from BASE64 string to bytes
    img_bytes = base64.b64decode(image.data)
    img_array = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    
    # Analyze the image using DeepFace
    result = DeepFace.analyze(img)
    
    # Extract the desired fields from the result
    dominant_race = result[0]['dominant_race']
    dominant_gender = result[0]['dominant_gender']
    bounding_box = result[0]['region']
    age = result[0]['age']
    dominant_emotion = result[0]['dominant_emotion']
    
    # Create the custom API response
    response = {
        "race": dominant_race,
        "gender": dominant_gender,
        "box": bounding_box,
        "age": age,
        "emotion": dominant_emotion
    }
    
    return response
