from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Configurazione del middleware CORS
def configure_cors(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app = FastAPI()

# Configurazione CORS
configure_cors(app)

# Modello Pydantic per i robot
class Robot(BaseModel):
    name: str

# Modello Pydantic per i giocatori nel ranking
class Player(BaseModel):
    idGiocatore: int
    partiteTotali: int
    partiteVinte: int
    partitePerse: int
    score: int

# Modello Pydantic per le partite
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

# Funzioni per generare dati di esempio
def generate_ranking_data():
    """Genera dati di esempio per la classifica dei giocatori."""
    return {
        "status": "success",
        "data": {
            "ranking": [
                {"idGiocatore": 1, "partiteTotali": 10, "partiteVinte": 8, "partitePerse": 2, "score": 82},
                {"idGiocatore": 2, "partiteTotali": 12, "partiteVinte": 6, "partitePerse": 6, "score": 70},
                # Altri giocatori...
            ]
        }
    }

def generate_matches_data():
    """Genera dati di esempio per lo storico partite."""
    return {
        "status": "success",
        "data": {
            "matches": [
                {
                    "match_id": "1",
                    "idGiocatore": 1,
                    "robots": [{"name": "Randoop"}, {"name": "Evosuite"}],
                    "duration": "00:25:30",
                    "difficulty": "medium",
                    "winner": 1,
                    "scoreGiocatore": 92,
                    "scoreRobot": 82,
                    "classeTestata": "Calcolatrice",
                    "date": "2023-12-06 18:45:00",
                },
                {
                    "match_id": "2",
                    "idGiocatore": 2,
                    "robots": [{"name": "Evosuite"}],
                    "duration": "00:20:30",
                    "difficulty": "medium",
                    "winner": "Evosuite",
                    "scoreGiocatore": 62,
                    "scoreRobot": 80,
                    "classeTestata": "Calcolatrice",
                    "date": "2023-12-06 20:45:00",
                }
                # Altre partite giocate
            ]
        }
    }

# Endpoint per ottenere il payload del ranking
@app.get("/ranking", response_model=dict, summary="Endpoint per ottenere la classifica dei giocatori", responses={
    200: {"description": "Success"},
    404: {"description": "Not Found"},
    500: {"description": "Internal Server Error"},
})
def get_ranking():
    """Restituisce i dati della classifica."""
    return generate_ranking_data()

# Endpoint per ottenere il payload delle partite
@app.get("/matchHistory", response_model=dict, summary="Endpoint per ottenere lo storico delle partite", responses={
    200: {"description": "Success"},
    404: {"description": "Not Found"},
    500: {"description": "Internal Server Error"},
})
def get_matches():
    """Restituisce lo storico delle partite delle partite."""
    return generate_matches_data()
