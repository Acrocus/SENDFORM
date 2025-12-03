(function() {
document.addEventListener('DOMContentLoaded', () => {
  // Меню
  document.querySelectorAll('.accordion').forEach(button => {
    const href = button.dataset.href;
    if (href) {
      button.addEventListener('click', () => {
        window.location.href = href;
      });
    }
  });

  // Бургер меню
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('open');
    });
  }

  // Аккордеон
  document.querySelectorAll('.accordionclick').forEach(acc => {
    acc.addEventListener('click', function() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Форма зворотного зв'язку
  const form = document.getElementById('contactForm');
  const responseEl = document.getElementById('response');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();
        responseEl.innerText = result.success ? "✅ Надіслано!" : "❌ Помилка: " + result.error;
        if (result.success) form.reset();
      } catch (err) {
        responseEl.innerText = "❌ Помилка серверу. Спробуйте пізніше.";
        console.error(err);
      }
    });
  }
});

    const API_KEY = 'AIzaSyAzvTpcIy3ZVMobBp89H2L5VjY6IxDMsks';

    const CHANNEL_ID = 'UCutmDUzBhJizZCdqqO_8vTw';

    const MAX_RESULTS = 6;

  

    const videoContainer = document.getElementById('videoContainer');

  

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`)

      .then(response => response.json())

      .then(data => {

        videoContainer.innerHTML = '';

        data.items.forEach(item => {

          if (item.id.kind === 'youtube#video') {

            const videoId = item.id.videoId;

            const title = item.snippet.title;

            const thumbnail = item.snippet.thumbnails.high.url;

  

            const videoEl = document.createElement('div');

            videoEl.classList.add('video');

            videoEl.onclick = () => {

              window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');

            };

            videoEl.innerHTML = `

              <img src="${thumbnail}" alt="${title}">

              <div class="video-title">${title}</div>

            `;

            videoContainer.appendChild(videoEl);

          }

        });

      })

      .catch(err => {

        console.error('Помилка при завантаженні відео:', err);

        videoContainer.innerHTML = 'Не вдалося завантажити відео 😢';

      });



})();

   

    








 
