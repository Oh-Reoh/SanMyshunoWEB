document.addEventListener('DOMContentLoaded', function () {
    const createPostTrigger = document.getElementById('createPostTrigger');
    const postModal = document.getElementById('postModal');
    const closeModal = document.getElementById('closeModal');
    const modalTextarea = document.getElementById('postContent');
    const submitPostBtn = document.getElementById('submitPost');
    const feedContainer = document.getElementById('feedContainer');
    const fileUploadBtn = document.getElementById('fileUploadBtn');

    // Variable to store the current file
    let currentFile = null;
    let currentFileName = '';
    let editingPostId = null; // Track which post is being edited

    // Open modal when clicking on the create post area
    if (createPostTrigger && postModal) {
        createPostTrigger.addEventListener('click', function () {
            postModal.classList.add('active');
            // Reset editing state when creating a new post
            editingPostId = null;
            document.querySelector('.modal-title').innerHTML = '<span>Announce</span> a post';
            submitPostBtn.textContent = 'Post';

            setTimeout(() => {
                modalTextarea.focus();
            }, 300);
        });
    }

    // Close modal when clicking the close button
    if (closeModal && postModal) {
        closeModal.addEventListener('click', function () {
            postModal.classList.remove('active');
            resetFileUploadButton();
            currentFile = null;
            currentFileName = '';
            editingPostId = null;
        });
    }

    // Close modal when clicking outside the modal
    if (postModal) {
        postModal.addEventListener('click', function (e) {
            if (e.target === postModal) {
                postModal.classList.remove('active');
                resetFileUploadButton();
                currentFile = null;
                currentFileName = '';
                editingPostId = null;
            }
        });
    }

    // File upload button functionality - updated to store file data
    if (fileUploadBtn) {
        fileUploadBtn.addEventListener('click', function () {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);

            fileInput.click();

            fileInput.addEventListener('change', function () {
                if (fileInput.files.length > 0) {
                    // Store the file and filename
                    currentFile = fileInput.files[0];
                    currentFileName = fileInput.files[0].name;

                    // Store the original button content for reset later
                    if (!fileUploadBtn.dataset.originalContent) {
                        fileUploadBtn.dataset.originalContent = fileUploadBtn.innerHTML;
                    }

                    // Update button text to show filename
                    fileUploadBtn.innerHTML = `
                        <img src="/images/upload-icon.png" alt="Upload"> ${currentFileName}
                    `;

                    // Remove any previous file mention in the textarea
                    modalTextarea.value = modalTextarea.value.replace(/\n\[Attached file:.*?\]/g, '');
                }
                document.body.removeChild(fileInput);
            });
        });
    }

    // Post button functionality - Create a new post card with file
    if (submitPostBtn && postModal && feedContainer) {
        submitPostBtn.addEventListener('click', function () {
            const postContent = modalTextarea.value.trim();

            if (postContent) {
                if (editingPostId) {
                    // Update existing post
                    updatePost(editingPostId, postContent, currentFile, currentFileName);
                } else {
                    // Create new post
                    createNewPost(postContent, currentFile, currentFileName);
                }

                // Clear the textarea and close the modal
                modalTextarea.value = '';
                postModal.classList.remove('active');
                resetFileUploadButton();
                currentFile = null;
                currentFileName = '';
                editingPostId = null;
            } else {
                modalTextarea.placeholder = "Write something here...";
                modalTextarea.focus();
            }
        });
    }

    function formatPostContent(content) {
        // Basic formatting: replace newlines with <br> tags
        return content.replace(/\n/g, "<br>")
    }

    // Function to create a new post card with file attachment
    function createNewPost(content, file, fileName) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        const postId = 'post-' + Date.now(); // Generate unique ID for the post

        // Clean content by removing the file attachment text
        const cleanContent = content.replace(/\n\[Attached file:.*?\]/g, '').trim();

        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.id = postId;

        // Create file attachment HTML if a file exists
        let fileAttachmentHTML = '';
        if (file && fileName) {
            // Create object URL for the file
            const fileUrl = URL.createObjectURL(file);

            // Determine file type for icon
            const fileExtension = fileName.split('.').pop().toLowerCase();
            let fileIconSrc = '/images/document-icon.png'; // Default icon

            // Set icon based on file type
            if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
                fileIconSrc = '/images/image-icon.png';
            } else if (['pdf'].includes(fileExtension)) {
                fileIconSrc = '/images/pdf-icon.png';
            } else if (['doc', 'docx'].includes(fileExtension)) {
                fileIconSrc = '/images/word-icon.png';
            } else if (['xls', 'xlsx'].includes(fileExtension)) {
                fileIconSrc = '/images/excel-icon.png';
            } else if (['ppt', 'pptx'].includes(fileExtension)) {
                fileIconSrc = '/images/powerpoint-icon.png';
            }

            fileAttachmentHTML = `
                <div class="post-attachment">
                    <a href="${fileUrl}" download="${fileName}" class="file-download">
                        <div class="file-icon">
                            <img src="${fileIconSrc}" alt="File">
                        </div>
                        <div class="file-info">
                            <div class="file-name">${fileName}</div>
                            <div class="file-size">${formatFileSize(file.size)}</div>
                        </div>
                    </a>
                </div>
            `;

            // Store file data in the post card for editing
            postCard.dataset.fileUrl = fileUrl;
            postCard.dataset.fileName = fileName;
        }

        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-avatar">
                    <img src="/images/profile-icon.png" alt="Admin">
                </div>
                <div class="post-info">
                    <div class="post-author">Admin Name</div>
                    <div class="post-date">${formattedDate}</div>
                </div>
                <div class="post-menu-container">
                    <button class="post-menu">
                        <img src="/images/dots-icon.png" alt="More options">
                    </button>
                    <div class="post-dropdown-menu">
                        <button class="dropdown-item edit-post">Edit</button>
                        <button class="dropdown-item delete-post">Delete</button>
                    </div>
                </div>
            </div>
            <div class="post-content">
                <p>${formatPostContent(cleanContent)}</p>
                ${fileAttachmentHTML}
            </div>
            <div class="post-actions">
                <button class="post-action-btn">
                    <img src="/images/comments-icon.png" alt="Comments"> Comments
                </button>
            </div>
        `;

        // Insert the new post at the top of the feed
        feedContainer.insertBefore(postCard, feedContainer.firstChild);

        // Store the original content for editing
        postCard.dataset.content = cleanContent;

        // Add event listeners for the dropdown menu
        setupPostMenuListeners(postCard);
    }

    // Function to update an existing post
    function updatePost(postId, content, file, fileName) {
        const postCard = document.getElementById(postId);
        if (!postCard) return;

        // Clean content by removing the file attachment text
        const cleanContent = content.replace(/\n\[Attached file:.*?\]/g, '').trim();

        // Update the content
        const contentElement = postCard.querySelector('.post-content p');
        contentElement.innerHTML = formatPostContent(cleanContent);

        // Update the stored content
        postCard.dataset.content = cleanContent;

        // Handle file attachment
        const existingAttachment = postCard.querySelector('.post-attachment');
        if (existingAttachment) {
            existingAttachment.remove();
        }

        if (file && fileName) {
            // Create object URL for the file
            const fileUrl = URL.createObjectURL(file);

            // Determine file type for icon
            const fileExtension = fileName.split('.').pop().toLowerCase();
            let fileIconSrc = '/images/document-icon.png'; // Default icon

            // Set icon based on file type
            if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
                fileIconSrc = '/images/image-icon.png';
            } else if (['pdf'].includes(fileExtension)) {
                fileIconSrc = '/images/pdf-icon.png';
            } else if (['doc', 'docx'].includes(fileExtension)) {
                fileIconSrc = '/images/word-icon.png';
            } else if (['xls', 'xlsx'].includes(fileExtension)) {
                fileIconSrc = '/images/excel-icon.png';
            } else if (['ppt', 'pptx'].includes(fileExtension)) {
                fileIconSrc = '/images/powerpoint-icon.png';
            }

            const fileAttachmentHTML = `
                <div class="post-attachment">
                    <a href="${fileUrl}" download="${fileName}" class="file-download">
                        <div class="file-icon">
                            <img src="${fileIconSrc}" alt="File">
                        </div>
                        <div class="file-info">
                            <div class="file-name">${fileName}</div>
                            <div class="file-size">${formatFileSize(file.size)}</div>
                        </div>
                    </a>
                </div>
            `;

            // Add the new attachment
            contentElement.insertAdjacentHTML('afterend', fileAttachmentHTML);

            // Update file data
            postCard.dataset.fileUrl = fileUrl;
            postCard.dataset.fileName = fileName;
        } else {
            // Remove file data if no file
            delete postCard.dataset.fileUrl;
            delete postCard.dataset.fileName;
        }
    }

    // Function to set up post menu dropdown listeners
    function setupPostMenuListeners(postCard) {
        const menuButton = postCard.querySelector('.post-menu');
        const dropdownMenu = postCard.querySelector('.post-dropdown-menu');
        const editButton = postCard.querySelector('.edit-post');
        const deleteButton = postCard.querySelector('.delete-post');

        // Toggle dropdown menu
        menuButton.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event from bubbling up
            dropdownMenu.classList.toggle('active');

            // Close other open menus
            document.querySelectorAll('.post-dropdown-menu.active').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('active');
                }
            });
        });

        // Edit post
        editButton.addEventListener('click', function () {
            editingPostId = postCard.id;
            const postContent = postCard.dataset.content;

            // Open modal with existing content
            modalTextarea.value = postContent;

            // Update modal title and button
            document.querySelector('.modal-title').innerHTML = '<span>Edit</span> post';
            submitPostBtn.textContent = 'Update';

            // Handle file if exists
            if (postCard.dataset.fileName) {
                currentFileName = postCard.dataset.fileName;

                // Update file upload button
                if (!fileUploadBtn.dataset.originalContent) {
                    fileUploadBtn.dataset.originalContent = fileUploadBtn.innerHTML;
                }

                fileUploadBtn.innerHTML = `
                    <img src="/images/upload-icon.png" alt="Upload"> ${currentFileName}
                `;

                // We can't retrieve the File object from the URL, so we'll just keep the filename
                // The actual file will only be replaced if the user uploads a new one
            }

            // Show modal
            postModal.classList.add('active');
            dropdownMenu.classList.remove('active');
        });

        // Delete post
        deleteButton.addEventListener('click', function () {
            postCard.remove();
            dropdownMenu.classList.remove('active');
        });

        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function (e) {
            if (!menuButton.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // Function to format post content (convert newlines to <br> tags)
    function formatPostContent(content) {
        return content.replace(/\n/g, '<br>');
    }

    // Function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Function to reset the file upload button
    function resetFileUploadButton() {
        if (fileUploadBtn && fileUploadBtn.dataset.originalContent) {
            fileUploadBtn.innerHTML = fileUploadBtn.dataset.originalContent;
            delete fileUploadBtn.dataset.originalContent;
        }
    }
});