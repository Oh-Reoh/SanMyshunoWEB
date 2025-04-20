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

//homeowner services
document.addEventListener('DOMContentLoaded', function () {
    // Toggle between pending and completed lists
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

    // Payment Modal
    const payNowBtns = document.querySelectorAll('.pay-now-btn');
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentModal = paymentModal.querySelector('.close-modal');

    payNowBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const listItem = this.closest('.list-item');
            const serviceName = listItem.querySelector('.item-name').textContent;
            const serviceType = listItem.querySelector('.item-date .item-value').textContent;
            const confirmedBy = listItem.querySelector('.item-owner .item-value').textContent;

            document.getElementById('paymentServiceDesc').textContent = serviceName;
            document.getElementById('paymentServiceType').textContent = serviceType;
            document.getElementById('paymentConfirmedBy').textContent = confirmedBy;

            paymentModal.style.display = 'block';
        });
    });

    closePaymentModal.addEventListener('click', function () {
        paymentModal.style.display = 'none';
    });

    // Request Service Modal
    const requestServiceBtn = document.getElementById('requestServiceBtn');
    const requestServiceModal = document.getElementById('requestServiceModal');
    const closeRequestModal = requestServiceModal.querySelector('.close-modal');

    requestServiceBtn.addEventListener('click', function () {
        requestServiceModal.style.display = 'block';
    });

    closeRequestModal.addEventListener('click', function () {
        requestServiceModal.style.display = 'none';
    });

    // Submit handlers
    document.getElementById('submitPayment').addEventListener('click', function () {
        // Handle payment submission
        alert('Payment submitted successfully!');
        paymentModal.style.display = 'none';
    });

    document.getElementById('submitRequest').addEventListener('click', function () {
        // Handle service request submission
        alert('Service request submitted successfully!');
        requestServiceModal.style.display = 'none';
    });
});