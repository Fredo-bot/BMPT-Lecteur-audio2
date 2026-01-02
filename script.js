const tracks = document.querySelectorAll('.track');

function playTrack(index) {
  tracks.forEach((track, i) => {
    const audio = track.querySelector('audio');
    const button = track.querySelector('button');
    const progress = track.querySelector('.progress');
    const progressBar = track.querySelector('.progress-bar');

    if (i === index) {
      if (audio.paused) {
        audio.play();
        track.classList.add('playing');
        button.textContent = '⏸ Pause';
      } else {
        audio.pause();
        track.classList.remove('playing');
        button.textContent = '▶ Écouter';
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
      track.classList.remove('playing');
      button.textContent = '▶ Écouter';
      progressBar.style.width = '0%';
    }

    // 🔁 Mise à jour de la barre
    audio.ontimeupdate = () => {
      if (!audio.duration) return;
      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = percent + '%';
    };

    // 🛑 Fin de la piste
    audio.onended = () => {
      track.classList.remove('playing');
      button.textContent = '▶ Écouter';
      progressBar.style.width = '0%';
    };

    // 🖱️ CLIQUER SUR LA BARRE POUR AVANCER
    progress.onclick = (e) => {
      const rect = progress.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      audio.currentTime = percent * audio.duration;
    };
  });
}
