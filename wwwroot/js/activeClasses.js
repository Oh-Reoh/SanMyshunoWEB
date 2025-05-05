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
    const servicesLink = document.querySelector('a#servicesActive');
    const transactionsLink = document.querySelector('a#transactionsActive');
<<<<<<< HEAD
=======
    const reportsLink = document.querySelector('a#reportsActive');
>>>>>>> 9ae158a (Add AdminReports w/ layout and styling)

    if (currentPath.includes('AdminUsers')) {
        usersLink?.classList.add('active');
    }

<<<<<<< HEAD
    if (currentPath.includes('AdminFacilities' && 'HomeownerFacilities')) {
        facilityLink.classList.add('active');
    }

    if (currentPath.includes('AdminPasses' && 'StaffPasses' && 'HomeownerPasses')) {
        passLink.classList.add('active');
=======
    if (currentPath.includes('AdminFacilities')) {
        facilityLink?.classList.add('active');
    }

    if (currentPath.includes('AdminPasses')) {
        passLink?.classList.add('active');
    }

    if (currentPath.includes('AdminServices')) {
        servicesLink?.classList.add('active');
    }

    if (currentPath.includes('AdminTransactions')) {
        transactionsLink?.classList.add('active');
    }

    if (currentPath.includes('AdminReports')) {
        reportsLink?.classList.add('active');
>>>>>>> 9ae158a (Add AdminReports w/ layout and styling)
    }

    if (currentPath.includes('AdminServices' && 'StaffServices' && 'HomeownerServices')) {
        servicesLink.classList.add('active');
    }

    if (currentPath.includes('AdminTransactions' && 'StaffTransactions' && 'HomeownerTransactions')) {
        transactionsLink.classList.add('active');
    }
});
