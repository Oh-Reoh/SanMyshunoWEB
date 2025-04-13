document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const addFacilityBtn = document.getElementById('addFacilityBtn');
    const facilityModal = document.getElementById('facilityModal');
    const facilityCloseModal = document.getElementById('facilityCloseModal');
    const facilitySubmit = document.getElementById('facilitySubmit');
    const modalAction = document.getElementById('modalAction');
    const facilityModalError = document.getElementById('facilityModalError');

    // Form Elements
    const facilityName = document.getElementById('facilityName');
    const facilityPrice = document.getElementById('facilityPrice');
    const facilityAddress = document.getElementById('facilityAddress');
    const facilityStatus = document.getElementById('facilityStatus');
    const facilityImage = document.getElementById('facilityImage');

    let currentFacilityId = null;
    let isEditMode = false;
    let selectedImageUrl = null; // Store the selected image URL

    // Add Facility Button Click Event
    if (addFacilityBtn) {
        addFacilityBtn.addEventListener('click', function () {
            openAddFacilityModal();
        });
    }

    // Function to open Add Facility Modal
    function openAddFacilityModal() {
        resetForm();
        modalAction.textContent = 'Add';
        facilitySubmit.textContent = 'Add';
        currentFacilityId = null;
        isEditMode = false;
        selectedImageUrl = null;
        facilityModal.classList.add('active');
    }

    // Function to open Edit Facility Modal
    function openEditFacilityModal(listItem) {
        resetForm();

        // Extract facility data from the list item
        const facilityNameElem = listItem.querySelector('.item-name');
        const facilityInfoElems = listItem.querySelectorAll('.item-info');
        const facilityImageElem = listItem.querySelector('.post-avatar img');

        const name = facilityNameElem.textContent;
        const priceText = facilityInfoElems[0].textContent;
        const addressText = facilityInfoElems[1].textContent;
        const statusText = facilityInfoElems.length > 2 ? facilityInfoElems[2].textContent : '';

        // Extract values from text
        const price = priceText.split(': ')[1];
        const address = addressText.split(': ')[1];
        const status = statusText.split(': ')[1] || 'Open';

        // Get the image URL if it exists
        if (facilityImageElem && facilityImageElem.src) {
            selectedImageUrl = facilityImageElem.src;

            // Update the file upload label with the existing image and overlay
            const fileUploadLabel = document.querySelector('.file-upload label');
            if (fileUploadLabel) {
                // Set the background image
                fileUploadLabel.style.backgroundImage = `url(${selectedImageUrl})`;
                fileUploadLabel.style.backgroundSize = 'cover';
                fileUploadLabel.style.backgroundPosition = 'center';
                fileUploadLabel.style.position = 'relative';

                // Add the overlay with camera icon
                fileUploadLabel.innerHTML = `
                    <div class="image-overlay">
                        <div class="camera-icon">
                            <img src="/images/camera-icon.png" alt="Upload Image">
                        </div>
                    </div>
                `;

                // Add CSS for the overlay
                const style = document.createElement('style');
                if (!document.querySelector('#image-overlay-style')) {
                    style.id = 'image-overlay-style';
                    style.textContent = `
                        .file-upload label {
                            position: relative;
                            overflow: hidden;
                        }
                        .image-overlay {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, 0.5);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .camera-icon {
                            width: 40px;
                            height: 40px;
                            z-index: 2;
                        }
                        .camera-icon img {
                            width: 100%;
                            height: 100%;
                            filter: brightness(1.5);
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }

        // Populate the form
        facilityName.value = name;
        facilityPrice.value = price;
        facilityAddress.value = address;
        if (facilityStatus) facilityStatus.value = status;

        // Set modal for editing
        modalAction.textContent = 'Edit';
        facilitySubmit.textContent = 'Save';
        currentFacilityId = listItem.dataset.id || '1'; // Use data-id if available
        isEditMode = true;
        facilityModal.classList.add('active');
    }

    // Close Modal
    if (facilityCloseModal) {
        facilityCloseModal.addEventListener('click', function () {
            facilityModal.classList.remove('active');
        });
    }

    // Edit Button Click Event (using event delegation)
    document.addEventListener('click', function (event) {
        const editBtn = event.target.closest('.edit-btn');
        if (editBtn) {
            const listItem = editBtn.closest('.list-item');
            openEditFacilityModal(listItem);
        }
    });

    // Delete Button Click Event (using event delegation)
    document.addEventListener('click', function (event) {
        const deleteBtn = event.target.closest('.delete-btn');
        if (deleteBtn) {
            const listItem = deleteBtn.closest('.list-item');

            // Directly remove the facility from the DOM without confirmation
            listItem.remove();
        }
    });


    // Form Submission
    if (facilitySubmit) {
        facilitySubmit.addEventListener('click', function () {
            if (validateForm()) {
                // Collect form data
                const facilityData = {
                    id: currentFacilityId,
                    name: facilityName.value,
                    price: facilityPrice.value,
                    address: facilityAddress.value,
                    status: facilityStatus ? facilityStatus.value : 'Open',
                    imageUrl: selectedImageUrl || '/images/facility-image.png' // Use selected image or default
                };

                // In a real application, you would make an AJAX call to save the data
                console.log('Saving facility:', facilityData);

                if (isEditMode) {
                    // Update existing facility in the DOM
                    updateFacilityInDOM(facilityData);
                } else {
                    // Add new facility to the DOM
                    addFacilityToDOM(facilityData);
                }

                // Close the modal
                facilityModal.classList.remove('active');
            }
        });
    }

    // Function to update facility in the DOM
    function updateFacilityInDOM(facilityData) {
        const listItems = document.querySelectorAll('.list-item');
        let targetItem = null;

        // Find the facility with matching ID (if we have IDs)
        if (facilityData.id) {
            for (let item of listItems) {
                if (item.dataset.id === facilityData.id) {
                    targetItem = item;
                    break;
                }
            }
        }

        // If no matching ID found, just update the first one for demo
        if (!targetItem && listItems.length > 0) {
            targetItem = listItems[0];
        }

        if (targetItem) {
            // Update the facility image
            const avatarImg = targetItem.querySelector('.post-avatar img');
            if (avatarImg && facilityData.imageUrl) {
                avatarImg.src = facilityData.imageUrl;
            }

            // Update text content
            targetItem.querySelector('.item-name').textContent = facilityData.name;
            const infoElements = targetItem.querySelectorAll('.item-info');
            infoElements[0].textContent = `Price per hour: ${facilityData.price}`;
            infoElements[1].textContent = `Address: ${facilityData.address}`;
            if (infoElements.length > 2) {
                infoElements[2].textContent = `Status: ${facilityData.status}`;
            }
        }
    }

    // Function to add new facility to the DOM
    function addFacilityToDOM(facilityData) {
        const facilitiesList = document.querySelector('.list-container');

        // Create new facility item
        const newItem = document.createElement('div');
        newItem.className = 'list-item';
        if (facilityData.id) {
            newItem.dataset.id = facilityData.id;
        }

        newItem.innerHTML = `
            <div class="item-content">
                <div class="post-avatar">
                    <img src="${facilityData.imageUrl}" alt="Facility">
                </div>
                <div class="item-details">
                    <div class="item-name">${facilityData.name}</div>
                    <div class="item-info">Price per hour: ${facilityData.price}</div>
                    <div class="item-info">Address: ${facilityData.address}</div>
                    <div class="item-info">Status: ${facilityData.status}</div>
                    <div class="item-info">Number of bookings: 0</div>
                </div>
            </div>
            <div class="item-actions">
                <button class="edit-btn">
                    <img src="/images/edit-icon.png" alt="Edit">
                </button>
                <button class="delete-btn">
                    <img src="/images/delete-icon.png" alt="Delete">
                </button>
            </div>
        `;

        // Add to the list
        if (facilitiesList) {
            facilitiesList.prepend(newItem);
        }
    }

    // Form validation
    function validateForm() {
        if (!facilityName.value || !facilityPrice.value || !facilityAddress.value) {
            facilityModalError.style.display = 'block';
            return false;
        }
        facilityModalError.style.display = 'none';
        return true;
    }

    // Reset form fields
    function resetForm() {
        if (facilityName) facilityName.value = '';
        if (facilityPrice) facilityPrice.value = '';
        if (facilityAddress) facilityAddress.value = '';
        if (facilityStatus) facilityStatus.value = 'Open';
        if (facilityImage) facilityImage.value = '';
        if (facilityModalError) facilityModalError.style.display = 'none';

        // Reset the file upload label
        const fileUploadLabel = document.querySelector('.file-upload label');
        if (fileUploadLabel) {
            fileUploadLabel.style.backgroundImage = '';
            fileUploadLabel.style.position = '';
            fileUploadLabel.innerHTML = `
                <div class="camera-icon">
                    <img src="/images/camera-icon.png" alt="Upload Image">
                </div>
            `;
        }

        selectedImageUrl = null;
    }

    // Initialize any additional functionality
    function init() {
        // Add image preview functionality
        if (facilityImage) {
            facilityImage.addEventListener('change', function (event) {
                const fileUploadLabel = document.querySelector('.file-upload label');
                if (fileUploadLabel && event.target.files && event.target.files[0]) {
                    const reader = new FileReader();

                    reader.onload = function (e) {
                        selectedImageUrl = e.target.result; // Store the image data URL

                        // Set the background image
                        fileUploadLabel.style.backgroundImage = `url(${selectedImageUrl})`;
                        fileUploadLabel.style.backgroundSize = 'cover';
                        fileUploadLabel.style.backgroundPosition = 'center';
                        fileUploadLabel.style.position = 'relative';

                        // Add the overlay with camera icon
                        fileUploadLabel.innerHTML = `
                            <div class="image-overlay">
                                <div class="camera-icon">
                                    <img src="/images/camera-icon.png" alt="Upload Image">
                                </div>
                            </div>
                        `;
                    };

                    reader.readAsDataURL(event.target.files[0]);
                }
            });
        }

        console.log('Facility Management initialized');
    }

    // Call init function
    init();
});