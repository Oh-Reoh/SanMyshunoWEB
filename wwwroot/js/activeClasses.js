document.addEventListener('DOMContentLoaded', function () {
    const homeIcon = document.getElementById('homeIcon');
    const currentPath = window.location.pathname;

    if (currentPath === '/Home/AdminHome') {
        homeIcon.classList.add('active');
    } else {
        homeIcon.classList.remove('active');
    }
});

window.addEventListener('DOMContentLoaded', (event) => {
    const currentPath = window.location.pathname;

    const usersLink = document.querySelector('a#usersActive');
    const facilityLink = document.querySelector('a#facilityActive');
    const passLink = document.querySelector('a#passActive');

    if (currentPath.includes('AdminUsers')) {
        usersLink.classList.add('active');
    }

    if (currentPath.includes('AdminFacilities')) {
        facilityLink.classList.add('active');
    }

    if (currentPath.includes('AdminPasses')) {
        passLink.classList.add('active');
    }
});
