from typing import List
from fastapi import FastAPI, Query
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

# Modello Pydantic per i giocatori nel ranking
class Player(BaseModel):
    idGiocatore: int
    partiteTotali: int
    partiteVinte: int
    partitePerse: int
    score: int

# Modello Pydantic per i robot
class Robot(BaseModel):
    name: str

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
    dateStart: str
    dateEnd: str

# Funzioni per generare dati di esempio
def generate_ranking_data():
    """Genera dati di esempio per la classifica dei giocatori."""
    return {
        "status": "success",
        "data": {
            "ranking": [
                {"idGiocatore": 1, "partiteTotali": 10, "partiteVinte": 8, "partitePerse": 2, "score": 82},
                {"idGiocatore": 2, "partiteTotali": 12, "partiteVinte": 6, "partitePerse": 6, "score": 70},
                {"idGiocatore": 3, "partiteTotali": 10, "partiteVinte": 8, "partitePerse": 7, "score": 68},
                {"idGiocatore": 4, "partiteTotali": 12, "partiteVinte": 6, "partitePerse": 10, "score": 60},
                # Altri giocatori...
            ]
        }
    }

# Funzione per generare dati di esempio
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
                    "classeTestata": "Calcolatrice",
                    "duration": "01:00:00",
                    "difficulty": "medium",
                    "winner": 1,
                    "scoreGiocatore": 92,
                    "scoreRobot": 82,
                    "dateStart": "2023-12-06 18:45:00",
                    "dateEnd": "2023-12-06 19:45:00",
                },
                {
                    "match_id": "2",
                    "idGiocatore": 1,
                    "robots": [{"name": "Randoop"}, {"name": "Evosuite"}],
                    "classeTestata": "Calcolatrice",
                    "duration": "00:45:00",
                    "difficulty": "easy",
                    "winner": 1,
                    "scoreGiocatore": 88,
                    "scoreRobot": 70,
                    "dateStart": "2023-12-07 14:30:00",
                    "dateEnd": "2023-12-07 15:15:00",
                },
                {
                    "match_id": "3",
                    "idGiocatore": 2,
                    "robots": [{"name": "Evosuite"}],
                    "classeTestata": "Calcolatrice",
                    "duration": "00:10:00",
                    "difficulty": "medium",
                    "winner": "Evosuite",
                    "scoreGiocatore": 62,
                    "scoreRobot": 80,
                    "dateStart": "2023-12-06 20:45:00",
                    "dateEnd": "2023-12-06 20:55:00",
                },
                {
                    "match_id": "4",
                    "idGiocatore": 2,
                    "robots": [{"name": "Randoop"}],
                    "classeTestata": "Calcolatrice",
                    "duration": "00:42:05",
                    "difficulty": "medium",
                    "winner": 2,
                    "scoreGiocatore": 82,
                    "scoreRobot": 80,
                    "dateStart": "2023-12-19 11:23:04",
                    "dateEnd": "2023-12-19 12:05:09",
                },
                {
                    "match_id": "5",
                    "idGiocatore": 3,
                    "robots": [{"name": "Randoop"}],
                    "classeTestata": "Calcolatrice",
                    "duration": "00:17:08",
                    "difficulty": "medium",
                    "winner": "Randoop",
                    "scoreGiocatore": 72,
                    "scoreRobot": 80,
                    "dateStart": "2023-12-18 11:43:02",
                    "dateEnd": "2023-12-18 12:05:10",
                },
                {
                    "match_id": "6",
                    "idGiocatore": 3,
                    "robots": [{"name": "Randoop"}],
                    "classeTestata": "Calcolatrice",
                    "duration": "00:42:05",
                    "difficulty": "medium",
                    "winner": 3,
                    "scoreGiocatore": 92,
                    "scoreRobot": 80,
                    "dateStart": "2023-12-19 11:23:04",
                    "dateEnd": "2023-12-19 12:05:09",
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

# Endpoint per ottenere il payload delle partite filtrate per idGiocatore
@app.get("/matchHistory", response_model=dict, summary="Endpoint per ottenere lo storico delle partite filtrato per idGiocatore", responses={
    200: {"description": "Success"},
    404: {"description": "Not Found"},
    500: {"description": "Internal Server Error"},
}, tags=["matchHistory"])
def get_matches(idGiocatore: int = Query(..., title="ID Giocatore", description="L'ID del giocatore per filtrare le partite")):
    """Restituisce lo storico delle partite delle partite filtrato per idGiocatore."""
    matches_data = generate_matches_data()
    filtered_matches = {"status": matches_data["status"], "data": {"matches": []}}

    for match in matches_data["data"]["matches"]:
        if match["idGiocatore"] == idGiocatore:
            filtered_matches["data"]["matches"].append(match)

    return filtered_matches