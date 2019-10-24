var ffmpeg = require("fluent-ffmpeg");

console.log(
  "Lancement du programme de conversion. La conversion ne s'arrête pas automatiquement --> faire un ctrl+c à la fin de la conversion. Penser à mettre une vidéo nommé input.mp4 à la racine du projet."
);

ffmpeg("input.mp4", { timeout: 432000 })
  .addOptions([
    "-profile:v baseline",
    "-level 3.0",
    "-s 640x360",
    "-start_number 0",
    "-hls_time 10",
    "-hls_list_size 0",
    "-f hls"
  ])
  .output("public/videos/output.m3u8")
  .run();
