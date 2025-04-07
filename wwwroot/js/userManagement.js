document.addEventListener('DOMContentLoaded', function () {
    const homeownersBtn = document.getElementById('homeownersBtn');
    const staffBtn = document.getElementById('staffBtn');
    const homeownersList = document.getElementById('homeownersList');
    const staffList = document.getElementById('staffList');
    const addStaffBtn = document.getElementById('addStaffBtn');
    const registerModal = document.getElementById('registerModal');
    const closeModalBtn = document.getElementById('closeModal');

    // Toggle views
    homeownersBtn.addEventListener('click', function () {
        homeownersBtn.classList.add('active');
        staffBtn.classList.remove('active');
        homeownersList.classList.add('active');
        staffList.classList.remove('active');
        addStaffBtn.style.display = 'none'; // Hide add button
    });

    staffBtn.addEventListener('click', function () {
        staffBtn.classList.add('active');
        homeownersBtn.classList.remove('active');
        staffList.classList.add('active');
        homeownersList.classList.remove('active');
        addStaffBtn.style.display = 'block'; // Show add button
    });

    // Show modal
    addStaffBtn.addEventListener('click', () => {
        registerModal.classList.add('active');
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        registerModal.classList.remove('active');
        clearModal();
    });

    // Form validation
    const registerBtn = document.getElementById('registerSubmit');
    const errorMessage = document.getElementById('modalError');

    registerBtn.addEventListener('click', () => {
        const name = document.getElementById('staffName');
        const contact = document.getElementById('staffContact');
        const dept = document.getElementById('staffDept');
        const email = document.getElementById('staffEmail');
        const password = document.getElementById('staffPassword');

        if (!name.value || !contact.value || !dept.value || !email.value || !password.value) {
            errorMessage.style.display = 'block';
            [name, contact, dept, email, password].forEach(input => {
                if (!input.value) input.classList.add('error');
            });
        } else {
            errorMessage.style.display = 'none';
            [name, contact, dept, email, password].forEach(input => input.classList.remove('error'));
            // Placeholder: add staff logic
            alert('Staff registered (placeholder)');
            registerModal.classList.remove('active');
            clearModal();
        }
    });

    function clearModal() {
        document.getElementById('nameInput').value = '';
        document.getElementById('contactInput').value = '';
        document.getElementById('departmentInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('passwordInput').value = '';
        errorMessage.style.display = 'none';
        document.querySelectorAll('.modal-input').forEach(input => input.classList.remove('error'));
    }

    // Sidebar Delete / Confirm buttons
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const confirmBtns = document.querySelectorAll('.confirm-btn');

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.list-item') || btn.closest('.request-item');
            if (item) item.remove();
        });
    });

    confirmBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.request-item');
            if (item) {
                btn.textContent = 'Confirmed';
                btn.disabled = true;
                btn.style.backgroundColor = '#68d391';
                const del = item.querySelector('.delete-btn');
                if (del) {
                    del.disabled = true;
                    del.style.opacity = '0.5';
                }
            }
        });
    });

    // Init: hide add staff button unless staff tab is active
    if (!staffBtn.classList.contains('active')) {
        addStaffBtn.style.display = 'none';
    }
});
