import './form'
import '../css/index.css'
import { Tooltip, Toast, Popover } from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../images/logo.png'
import Bear from '../images/bear.png'
import Dog from '../images/dog.png'
import Unused from '../images/unused-image.png'
import { fetchCards } from './cards'
import { toggleForm, clearForm } from './form'
import { initDb, getDb, postDb, deleteDb, editDb } from './database'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
    })
}

window.addEventListener('load', function () {
    initDb()
    fetchCards()
    document.getElementById('logo').src = Logo
    document.getElementById('bearThumbnail').src = Bear
    document.getElementById('dogThumbnail').src = Dog
})

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
    toggleForm()
})

form.addEventListener('submit', event => {
    // Handle data
    event.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    // Post form data to IndexedDB OR Edit an existing card in IndexedDB
    if (submitBtnToUpdate == false) {
        postDb(name, email, phone, profile);
    } else {
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let profile = document.querySelector('input[type="radio"]:checked').value;

        editDb(profileId, name, email, phone, profile);
        fetchCards();
        // Toggles the submit button back to POST functionality
        submitBtnToUpdate = false;
    }

    // Clear form
    clearForm();
    // Toggle form
    toggleForm();
    // Reload the DOM
    fetchCards();
});

window.deleteCard = (e) => {
    let id = parseInt(e.id)
    deleteDb(id)
    fetchCards()
}

window.editCard = (e) => {

    profileId = parseInt(e.dataset.id)

    let editName = e.dataset.name
    let editEmail = e.dataset.email
    let editPhone = e.dataset.phone

    document.getElementById('name').value = editName
    document.getElementById('email').value = editEmail
    document.getElementById('phone').value = editPhone

    form.style.display = 'block'

    submitBtnToUpdate = true
}