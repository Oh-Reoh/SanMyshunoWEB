document.addEventListener('DOMContentLoaded', function () {
    const visitorsBtn = document.getElementById('visitorsBtn');
    const vehiclesBtn = document.getElementById('vehiclesBtn');
    const visitorsList = document.getElementById('visitorsList');
    const vehiclesList = document.getElementById('vehiclesList');


    // Toggle between Visitors and Vehicles
    visitorsBtn.addEventListener('click', () => {
        visitorsBtn.classList.add('active');
        vehiclesBtn.classList.remove('active');
        visitorsList.classList.add('active');
        vehiclesList.classList.remove('active');

    });

    vehiclesBtn.addEventListener('click', () => {
        vehiclesBtn.classList.add('active');
        visitorsBtn.classList.remove('active');
        vehiclesList.classList.add('active');
        visitorsList.classList.remove('active');

    });

    // Delete button functionality
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const listItem = this.closest('.list-item') || this.closest('.request-item');
            if (listItem) listItem.remove();
        });
    });

    // Confirm button functionality
    document.querySelectorAll('.confirm-btn').forEach(button => {
        button.addEventListener('click', function () {
            const requestItem = this.closest('.request-item');
            if (requestItem) {
                requestItem.style.backgroundColor = '#f0fff4';
                this.textContent = 'Confirmed';
                this.disabled = true;
                this.style.backgroundColor = '#68d391';

                const deleteBtn = requestItem.querySelector('.delete-btn');
                if (deleteBtn) {
                    deleteBtn.disabled = true;
                    deleteBtn.style.opacity = '0.5';
                }
            }
        });
    });
});
