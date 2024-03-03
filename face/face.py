from typing import List
from pydantic import BaseModel

class EmotionScores(BaseModel):
    angry: float
    disgust: float
    fear: float
    happy: float
    sad: float
    surprise: float
    neutral: float

class FaceRegion(BaseModel):
    x: int
    y: int
    w: int
    h: int
    left_eye: List[int]
    right_eye: List[int]

class GenderScores(BaseModel):
    Woman: float
    Man: float

class RaceScores(BaseModel):
    asian: float
    indian: float
    black: float
    white: float
    middle_eastern: float
    latino_hispanic: float

class FaceAnalysisResult(BaseModel):
    emotion: EmotionScores
    dominant_emotion: str
    region: FaceRegion
    face_confidence: float
    age: int
    gender: GenderScores
    dominant_gender: str
    race: RaceScores
    dominant_race: str

class FaceAnalysisResponse(BaseModel):
    result: List[FaceAnalysisResult]
