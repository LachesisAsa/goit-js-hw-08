import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryMarkup = galleryItems.map(eItems => {
  return `
  <li>
    <a class="gallery__item" 
      href="${eItems.original}" 
      onclick="event.preventDefault()">
        <img class="gallery__image" 
          src="${eItems.preview}" 
          alt="${eItems.description}" />
    </a>
  </li>`;
});

const artGallery = document.querySelector(".gallery");
artGallery.insertAdjacentHTML("afterbegin", galleryMarkup.join(""));


let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});