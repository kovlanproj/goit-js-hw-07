import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');
let globalInstance = '';
addMarkup(galleryRef, galleryItems);

galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const link = e.target.dataset.source;
  globalInstance = basicLightbox.create(`<img width="1400" height="900" src="${link}">`, {
    onShow: onModalShow,
    onClose: onModalClose,
  });
  globalInstance.show();

  // window.addEventListener('keydown', onEscKeyPress);
}

function makeImageMarkup({ preview, original, description }) {
  return `
<div class="gallery__item">
      <a href="${original}" class="gallery__link">
        <img
        src="${preview}"
        alt="${description}"
        data-source="${original}"
        class="gallery__image">
      </a>
    </div>
    `;
}

function makeGalleryMarkup(images) {
  return images.map(image => makeImageMarkup(image)).join('');
}

function addMarkup(placeRefForMarkup, galleryItems) {
  placeRefForMarkup.insertAdjacentHTML('beforeend', makeGalleryMarkup(galleryItems));
}

function onModalShow() {
  window.addEventListener('keydown', onEscKeyPress);
}

function onModalClose() {
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    globalInstance.close();
  }
}
