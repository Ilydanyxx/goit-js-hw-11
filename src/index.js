import { Notify } from 'notiflix';
import { fetchPhotos } from "./photo-api";

const input = document.querySelector("input");
const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const button = document.querySelector(".load-more")

let name = "";
let images = 40;
let page = 0;


form.addEventListener("submit", search)

function search(e) {
    gallery.innerHTML = "";
    button.classList.remove("block");
    e.preventDefault();
    if (e.action = input.value === '') {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    name = e.action = input.value;
    page += 1;
    fetchPhotos(name, images, page)
        .then(response => {
           if (!response.data.hits.length>0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        } else {
            return create(response), button.classList.add("block"), button.disabled = false
        }
        })
        .catch (error => {
            Notify.failure (
               'Sorry, there are no images matching your search query. Please try again.'
            );
        });
}


function create(array) {
    const card = array.data.hits
        .map(({
            url,
            tag,
            like,
            view,
            comment,
            download,
        }) => {
            return `<div class="photo-card">
  <img src="${url}" alt="${tag}" loading="lazy" width="300" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${like}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${view}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comment}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${download}
    </p>
  </div>
</div>`}).join("");
    return gallery.insertAdjacentHTML ('beforeend', card)
}

button.addEventListener("click", load)

function load(e) {
    e.preventDefault();
    page += 1;
    fetchPhotos(name, images, page)
        .then(response => {
           if (!response.data.hits.length>0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        } else {
               return create(response), hidden(response.data.totalHits);
        }
        })
        .catch (error => {
            Notify.failure (
               'Sorry, there are no images matching your search query. Please try again.'
            );
        });
}

function hidden(total1) {
    const total2 = images * page;
    if (total1 > total2) {
        button.disabled = true, Notify.failure("We're sorry, but you've reached the end of search results.")
    }
    return;
}