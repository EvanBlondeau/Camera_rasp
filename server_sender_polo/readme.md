# Afficher la caméra avec un flux rtsp sur une page HTML

 Tout est en invite de commande

### Lancer le serveur_sender 

**Dans 1er terminal, dans le dossier serveur sender:**
nodejs serveur_sender.js


### Lancer le script ffmpeg
**Dans 1er terminal, dans le dossier serveur sender puis public puis vidéos:**
./runpicamerahls

Dans une page html il suffit de rentré ça : 
 <video-js  autoplay controls ><source src="http://192.168.0.22:8000/streams/output.m3u8" /></video-js>

le 192.168.0.22 correspond à l'IP de ma machine donc il faut le changer par le votre bien sur ;)