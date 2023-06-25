import axios from 'axios';
export { fetchPhotos };
async function fetchPhotos(name, images, page) {
    const response = await axios.get (`https://pixabay.com/api/?key=37790860-19a187afaf9be94c631ac6e75&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${images}&page=${page}`);
    return response;
}
