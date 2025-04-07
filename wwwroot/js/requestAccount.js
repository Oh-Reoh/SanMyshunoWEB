//button click redirect to Request-Account.cshtml
document.addEventListener('DOMContentLoaded', function () {
    const requestAccountBtn = document.querySelector('.request-account-btn');

    if (requestAccountBtn) {
        requestAccountBtn.addEventListener('click', function () {
            window.location.href = '/Home/RequestAccount';
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const requestForm = document.getElementById('requestForm');
    const notification = document.getElementById('notification');

    if (requestForm) {
        requestForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent actual form submission

            // Show the notification
            notification.style.display = 'flex';

            // Scroll to the top to make sure notification is visible
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});