document.addEventListener('DOMContentLoaded', function () {
    // Initialize date picker
    flatpickr("#bookingDate", {
        dateFormat: "Y-m-d",
        minDate: "today",
        disableMobile: "true"
    });

    // Load facilities
    loadFacilities();

    // Setup event listeners
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('book-now-btn')) {
            const facilityId = e.target.dataset.id;
            const facilityData = JSON.parse(e.target.dataset.facility);
            openBookingModal(facilityData);
        }
    });

    document.getElementById('closeModal').addEventListener('click', closeBookingModal);

    // Time selection change events for calculating total
    document.getElementById('timeFrom').addEventListener('change', calculateTotal);
    document.getElementById('timeUntil').addEventListener('change', calculateTotal);
    document.getElementById('bookingDate').addEventListener('change', calculateTotal);

    // Confirm booking button
    document.getElementById('confirmBooking').addEventListener('click', confirmBooking);
});

// Load facilities from API
function loadFacilities() {
    // This would normally be an API call
    // For demo purposes, we'll use sample data
    const facilities = [
        {
            id: 1,
            name: "Facility name",
            price: 500,
            address: "Address",
            status: "Open",
            bookings: 3,
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Facilities-q781mkhV1BU1AaekemTWDotJdWqrPM.png"
        },
        {
            id: 2,
            name: "Facility name",
            price: 500,
            address: "Address",
            status: "Open",
            bookings: 3,
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Facilities-q781mkhV1BU1AaekemTWDotJdWqrPM.png"
        }
    ];

    renderFacilities(facilities);
}

// Render facilities to the DOM
function renderFacilities(facilities) {
    const facilitiesList = document.getElementById('facilitiesList');
    facilitiesList.innerHTML = '';

    facilities.forEach(facility => {
        const facilityItem = document.createElement('div');
        facilityItem.className = 'list-item';
        facilityItem.innerHTML = `
            <div class="item-content">
                <div class="post-avatar">
                    <img src="${facility.image}" alt="${facility.name}">
                </div>
                <div class="item-details">
                    <div class="item-name">${facility.name}</div>
                    <div class="item-info">Price per hour: ${facility.price}</div>
                    <div class="item-info">Address: ${facility.address}</div>
                    <div class="item-info">Status: <span style="color: green;">${facility.status}</span></div>
                    <div class="item-info">Number of bookings: ${facility.bookings}</div>
                </div>
            </div>
            <button class="book-now-btn" data-id="${facility.id}" data-facility='${JSON.stringify(facility)}'>Book Now</button>
        `;

        facilitiesList.appendChild(facilityItem);
    });
}

// Open booking modal
function openBookingModal(facility) {
    // Set facility details in modal
    document.getElementById('facilityImage').src = facility.image;
    document.getElementById('facilityName').textContent = facility.name;
    document.getElementById('facilityPrice').textContent = `Price per Hour: ${facility.price}`;
    document.getElementById('facilityAddress').textContent = `Address: ${facility.address}`;

    // Reset form
    document.getElementById('timeFrom').value = '';
    document.getElementById('timeUntil').value = '';
    document.getElementById('bookingDate').value = '';
    document.getElementById('paymentMethod').value = '';
    document.getElementById('totalAmount').textContent = '₱0';
    document.getElementById('bookingError').style.display = 'none';

    // Store facility data for later use
    document.getElementById('confirmBooking').dataset.facility = JSON.stringify(facility);

    // Show modal
    document.getElementById('bookingModal').classList.add('active');
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('active');
}

// Calculate total based on time difference
function calculateTotal() {
    const fromTime = document.getElementById('timeFrom').value;
    const untilTime = document.getElementById('timeUntil').value;
    const facilityData = JSON.parse(document.getElementById('confirmBooking').dataset.facility || '{}');
    const pricePerHour = facilityData.price || 0;

    if (fromTime && untilTime) {
        // Convert times to Date objects for calculation
        const fromDate = new Date(`2000-01-01T${fromTime}:00`);
        const untilDate = new Date(`2000-01-01T${untilTime}:00`);

        // Calculate hours difference
        let hoursDiff = (untilDate - fromDate) / (1000 * 60 * 60);

        // Handle case where end time is on the next day
        if (hoursDiff < 0) {
            hoursDiff += 24;
        }

        // Calculate total
        const total = hoursDiff * pricePerHour;

        // Update total display
        document.getElementById('totalAmount').textContent = `₱${total.toFixed(2)}`;
    }
}

// Confirm booking
function confirmBooking() {
    const fromTime = document.getElementById('timeFrom').value;
    const untilTime = document.getElementById('timeUntil').value;
    const bookingDate = document.getElementById('bookingDate').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const errorElement = document.getElementById('bookingError');

    // Validate form
    if (!fromTime || !untilTime || !bookingDate || !paymentMethod) {
        errorElement.style.display = 'block';
        return;
    }

    // Hide error if all fields are filled
    errorElement.style.display = 'none';

    // Get facility data
    const facilityData = JSON.parse(document.getElementById('confirmBooking').dataset.facility || '{}');

    // Prepare booking data
    const bookingData = {
        facilityId: facilityData.id,
        facilityName: facilityData.name,
        fromTime,
        untilTime,
        bookingDate,
        paymentMethod,
        totalAmount: document.getElementById('totalAmount').textContent
    };

    // This would normally be an API call to save the booking
    console.log('Booking data:', bookingData);

    // Show success message (in a real app, you'd wait for API response)
    alert('Booking successful!');

    // Close modal
    closeBookingModal();
}