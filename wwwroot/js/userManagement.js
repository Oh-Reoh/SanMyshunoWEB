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

    // Form validation and staff addition
    const registerBtn = document.getElementById('registerSubmit');
    const errorMessage = document.getElementById('modalError');

    registerBtn.addEventListener('click', () => {
        const name = document.getElementById('staffName');
        const contact = document.getElementById('staffContact');
        const dept = document.getElementById('staffDept');
        const selectedDept = dept.value;
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

            // Add staff to the staff list
            const staffItem = document.createElement('div');
            staffItem.classList.add('list-item');
            staffItem.innerHTML = `
                <div class="item-content">
                    <div class="post-avatar">
                        <img src="/images/profile-icon.png" alt="Staff">
                    </div>
                    <div class="item-details">
                        <div class="item-name">${name.value}</div>
                        <div class="item-info">${contact.value}</div>
                        <div class="item-info">${dept.value}</div>
                        <div class="item-info">${email.value}</div>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="delete-btn">
                        <img src="/images/delete-icon.png" alt="Delete">
                    </button>
                </div>
            `;

            staffList.appendChild(staffItem);

            // Attach event listener to the delete button of the newly added staff item
            const deleteBtn = staffItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function () {
                staffItem.remove(); // Remove the staff item when the delete button is clicked
            });

            // Reset and close modal
            registerModal.classList.remove('active');
            clearModal();
        }
    });

    function clearModal() {
        document.getElementById('staffName').value = '';
        document.getElementById('staffContact').value = '';
        document.getElementById('staffDept').value = '';
        document.getElementById('staffEmail').value = '';
        document.getElementById('staffPassword').value = '';
        errorMessage.style.display = 'none';
        document.querySelectorAll('.modal-input').forEach(input => input.classList.remove('error'));
    }

    // Sidebar Delete / Confirm buttons
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const confirmBtns = document.querySelectorAll('.confirm-btn');

    // Attach event listeners to existing delete buttons
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
