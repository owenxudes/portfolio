const folderToShow = "branding 2"; 

fetch('images.json')
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById('gallery');

    const filteredData = data.filter(item => item.folder === folderToShow);

    filteredData.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');

      const link = document.createElement('a');
      link.href = item.src;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const mediaContainer = document.createElement('div');
      mediaContainer.classList.add('media-container');

      let mediaElement;
      if (item.src.match(/\.(mp4|webm|ogg)$/i)) {
        mediaElement = document.createElement('video');
        mediaElement.src = item.src;
        mediaElement.controls = true;
        mediaElement.muted = true;
      } else {
        mediaElement = document.createElement('img');
        mediaElement.src = item.src;
        mediaElement.alt = item.alt || item.caption || "";
      }

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      overlay.textContent = item.caption;

      mediaContainer.appendChild(mediaElement);
      mediaContainer.appendChild(overlay);
      link.appendChild(mediaContainer);
      itemDiv.appendChild(link);

      gallery.appendChild(itemDiv);
    });
  })
  .catch(error => console.error('Error loading images:', error));
