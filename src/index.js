import { getPhoto } from "./js/api";
import Notiflix from "notiflix";
let page = 1;
let searchQuery = '';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('load-more');
const input = document.querySelector('#input_name');
const gallery = document.querySelector('.gallery');



form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);


async function onSearch(event) {
    event.preventDefault();

    await getPhoto(searchQuery = input.value)

        if(!searchQuery){

          Notiflix.Notify.failure('Please enter a search query.');
            return
        }
        clearGallery();

        page = 1;

        try{
          const image = await getPhoto();
          if (image.length === 0) {
            notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.');
              toggleLoadMore(false);
              return;
          }
          const markup = createMarkup(images);
          appendGalleryMarkup(markup);

          toggleLoadMoreBtn(true);

        } catch (error) {
          notiflix.Notify.failure('Something went wrong, please try again later.');
  }
};
          
    
        
async function onLoadMore() {
  page +=1;
  
  try{
    const images = await getPhoto();
    const markup = createMarkup(images);
    appendGalleryMarkup(markup);
     
    
    if(images.length < 40){
      toggleLoadMore(false);

      notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    notiflix.Notify.failure('Something went wrong, please try again later.');
  }
};




function createMarkup(images) {
    return images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>{
        `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`
    }).join('');
};
// Створюємо функцію, яка буде очищати вміст галереї
const clearGallery = () => {
  gallery.innerHTML = '';
};
const appendGalleryMarkup = markup => {
  gallery.insertAdjacentHTML('beforeend', markup);
};

 const toggleLoadMore = show =() =>{
  loadMoreBtn.style.display = show ? 'block' : 'none';

};




