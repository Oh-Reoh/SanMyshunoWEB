document.addEventListener('DOMContentLoaded', function () {
    const pendingBtn = document.getElementById('pendingBtn');
    const completedBtn = document.getElementById('completedBtn');
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');

    pendingBtn.addEventListener('click', function () {
        pendingBtn.classList.add('active');
        completedBtn.classList.remove('active');
        pendingList.classList.add('active');
        completedList.classList.remove('active');
    });

    completedBtn.addEventListener('click', function () {
        completedBtn.classList.add('active');
        pendingBtn.classList.remove('active');
        completedList.classList.add('active');
        pendingList.classList.remove('active');
    });
});
