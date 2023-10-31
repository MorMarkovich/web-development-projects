// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('welcomeButton');
    var message = document.getElementById('welcomeMessage');
    button.addEventListener('click', function() {
        message.style.display = (message.style.display === 'none') ? 'block' : 'none';
    });
});

const navLinks = document.querySelectorAll('.navbar-nav flex-grow-1');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        const target = document.querySelector(this.getAttribute('href'));

        window.scrollTo({
            top: target.offsetTop - 50,
            behavior: 'smooth'
        });
    });
});