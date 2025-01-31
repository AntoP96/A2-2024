#!/bin/bash
# Avvio dell'installazione
echo "Installazione avviata"

# Creazione del volume Docker 'VolumeT9'
docker volume create VolumeT9 || echo "Errore nella creazione del volume"

# Creazione del volume Docker 'VolumeT8'
docker volume create VolumeT8 || echo "Errore nella creazione del volume"

# Creazione della rete Docker 'global-network'
docker network create global-network || echo "Errore nella creazione della rete"

# Definizione dei percorsi delle directory da visitare
list=("T8-G21/Progetto_SAD_GRUPPO21_TASK8/Progetto_def/opt_livelli/Prototipo2.0" "T1-G11/applicazione/manvsclass" "T23-G1" "T4-G18" "T5-G2/t5" "T6-G12/T6" "T7-G31/RemoteCCC" "T9-G19/Progetto-SAD-G19-master" "api_gateway" "ui_gateway" "fastapi")

# Ciclo attraverso le directory specificate
for dir in "${list[@]}"; do
   (
     cd "$dir"
     echo "Installazione in corso in $dir"
   
     # Avvio dei container Docker e gestione degli errori
     docker compose up -d --build || echo "Errore nell'installazione del Task $dir"
   )
done

# Messaggio di completamento dell'installazione
echo "Installazione terminata"
read -p "Premi INVIO per continuare..."