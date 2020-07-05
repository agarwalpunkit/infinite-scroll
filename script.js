const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = [];


// Unsplash API
const count = 30;
const apiKey = 'kwN1jZGrJrjmt_POtipB0KCkAycXOxZoGyhCSIu0hjc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    console.log('image Loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        console.log('ready=',ready);
    }

}

// Create Elements for Links & photos, Add to DOM
function displayphotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        console.log(response);
        photosArray = await response.json();
        console.log(photosArray);
        displayphotos();
    } catch (error) {

    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        console.log('load more');
        getPhotos();
    }
})
// On Load
getPhotos();