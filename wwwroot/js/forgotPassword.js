//forgot password link redirect to FindAccount.cshtml
document.addEventListener('DOMContentLoaded', function () {
    const forgotPasswordLink = document.querySelector('.forgot-password a');

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = '/Home/FindAccount';
        });
    }
});

//after clicking search button, open newPassword.cshtml
document.addEventListener('DOMContentLoaded', function () {
    const findAccountForm = document.getElementById('findAccountForm');

    if (findAccountForm) {
        findAccountForm.addEventListener('submit', function (e) {
            e.preventDefault();

            window.location.href = '/Home/NewPassword';
        });
    }
});

//after clicking continue in NewPassword.cshtml, go back to the login page
document.addEventListener('DOMContentLoaded', function () {
    const newPasswordForm = document.getElementById('newPasswordForm');

    if (newPasswordForm) {
        newPasswordForm.addEventListener('submit', function (e) {
            e.preventDefault();


            window.location.href = '/';
        });
    }
});