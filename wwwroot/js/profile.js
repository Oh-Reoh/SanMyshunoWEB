document.addEventListener('DOMContentLoaded', () => {
    const personalBtn = document.getElementById('personalInfoBtn');
    const passwordBtn = document.getElementById('passwordBtn');
    const personalPanel = document.getElementById('personalInfoPanel');
    const passwordPanel = document.getElementById('passwordPanel');

    personalBtn.addEventListener('click', () => {
        personalBtn.classList.add('active');
        passwordBtn.classList.remove('active');
        personalPanel.classList.add('active');
        passwordPanel.classList.remove('active');
    });

    passwordBtn.addEventListener('click', () => {
        passwordBtn.classList.add('active');
        personalBtn.classList.remove('active');
        passwordPanel.classList.add('active');
        personalPanel.classList.remove('active');
    });
});

// Profile picture preview on file select
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('profileImageUpload');
    const previewImage = document.getElementById('profilePreview');

    if (fileInput && previewImage) {
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

