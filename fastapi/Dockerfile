# Usa l'immagine di base di Python
FROM python:3.8-slim

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia i file necessari nell'immagine
COPY exampleAPI.py .

# Installa le dipendenze
RUN pip install --no-cache-dir fastapi uvicorn

# Espone la porta su cui l'applicazione FastAPI sarà in ascolto
EXPOSE 8000

# Comando per eseguire l'applicazione quando il container viene avviato
CMD ["uvicorn", "exampleAPI:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]