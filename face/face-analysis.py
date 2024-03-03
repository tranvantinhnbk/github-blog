from tkinter import Image
from deepface import DeepFace


class Face:
    def __init__(self, img):
        self._img = img

    # getter for the image
    @property
    def img(self):
        return self._img

    # setter for the image
    @img.setter
    def img(self, value):
        self._img = value

    def get_emotion(self):
        result = DeepFace.analyze(self._img, actions=['emotion'])
        return result['emotion']
    
    def get_dominant_emotion(self):
      result = DeepFace.analyze(self._img, actions=['emotion'])
      return result['dominant_emotion']
        