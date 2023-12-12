from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configura il middleware CORS per consentire tutte le origini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puoi specificare le origini consentite invece di "*" per una maggiore sicurezza
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Definisci un modello Pydantic per i robot
class Robot(BaseModel):
    name: str

# Definisci un modello Pydantic per i giocatori nel ranking
class Player(BaseModel):
    idGiocatore: int
    partiteTotali: int
    partiteVinte: int
    partitePerse: int
    score: int

# Definisci un modello Pydantic per le partite
class Match(BaseModel):
    match_id: str
    idGiocatore: int
    robots: List[Robot]
    duration: str
    difficulty: str
    winner: int
    scoreGiocatore: int
    scoreRobot: int
    classeTestata: str
    date: str

# Definisci un modello Pydantic per la risposta del ranking
class RankingResponse(BaseModel):
    status: str
    data: dict

# Payload di esempio per il ranking
ranking_data = {
    "status": "success",
    "data": {
        "ranking": [
            {
                "idGiocatore": 1,
                "partiteTotali": 10,
                "partiteVinte": 8,
                "partitePerse": 2,
                "score": 82,
            },
            {
                "idGiocatore": 2,
                "partiteTotali": 12,
                "partiteVinte": 6,
                "partitePerse": 6,
                "score": 70,
            }
            # Altri giocatori...
        ]
    }
}

# Payload di esempio per le partite
matches_data = {
    "status": "success",
    "data": {
        "matches": [
            {
                "match_id": "1",
                "idGiocatore": 1,
                "robots": [
                    {"name": "Randoop"},
                    {"name": "Evosuite"}
                ],
                "duration": "00:25:30",
                "difficulty": "medium",
                "winner": 1,
                "scoreGiocatore": 92,
                "scoreRobot": 82,
                "classeTestata": "Calcolatrice",
                "date": "2023-12-06 18:45:00"
            },
            {
                "match_id": "2",
                "idGiocatore": 2,
                "robots": [
                    {"name": "Evosuite"}
                ],
                "duration": "00:20:30",
                "difficulty": "medium",
                "winner": "Evosuite",
                "scoreGiocatore": 62,
                "scoreRobot": 80,
                "classeTestata": "Calcolatrice",
                "date": "2023-12-06 20:45:00"
            }
            # Altre partite giocate
        ]
    }
}

# Endpoint per ottenere il payload del ranking
@app.get("/ranking", response_model=RankingResponse)
def get_ranking():
    return ranking_data

# Endpoint per ottenere il payload delle partite
@app.get("/matchHistory", response_model=dict)
def get_matches():
    return matches_data
