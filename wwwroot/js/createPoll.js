document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const createPollBtn = document.querySelector('.create-poll-btn');
    const pollModal = document.getElementById('pollModal');
    const closePollModal = document.getElementById('closePollModal');
    const addOptionBtn = document.getElementById('addOptionBtn');
    const pollOptions = document.getElementById('pollOptions');
    const publishPollBtn = document.getElementById('publishPoll');
    const pollQuestion = document.getElementById('pollQuestion');
    const modalTitle = document.querySelector('#pollModal .modal-title');

    let optionCount = 0; // Initialize option count to 0 for new polls
    let editingPoll = null; // Track the poll being edited

    // Open Poll Modal
    if (createPollBtn) {
        createPollBtn.addEventListener('click', function () {
            openPollModal();
        });
    }

    // Close Poll Modal
    if (closePollModal) {
        closePollModal.addEventListener('click', function () {
            pollModal.classList.remove('active');
        });
    }

    // Add Option Button
    if (addOptionBtn) {
        addOptionBtn.addEventListener('click', function () {
            addPollOption();
        });
    }

    // Publish/Save Poll
    if (publishPollBtn) {
        publishPollBtn.addEventListener('click', function () {
            if (validatePoll()) {
                if (editingPoll) {
                    updatePoll(editingPoll);
                } else {
                    publishPoll();
                }
                pollModal.classList.remove('active');
            }
        });
    }

    // Function to open poll modal for creating or editing a poll
    function openPollModal(poll = null) {
        resetPollForm();

        if (poll) {
            // Editing an existing poll
            editingPoll = poll;
            pollQuestion.value = poll.question;

            // Update modal title and button text for editing
            modalTitle.innerHTML = '<span>Edit</span> a poll/survey';
            publishPollBtn.textContent = 'Save';

            // Repopulate options
            poll.options.forEach((option) => {
                addPollOption(option); // Add the existing option text
            });

            optionCount = poll.options.length;
        } else {
            // Creating a new poll
            editingPoll = null;
            optionCount = 0; // Reset the option count when creating a new poll

            // Update modal title and button text for creating
            modalTitle.innerHTML = '<span>Create</span> a poll/survey';
            publishPollBtn.textContent = 'Publish';
        }

        pollModal.classList.add('active');
    }

    // Function to add a new poll option
    function addPollOption(optionText = '') {
        optionCount++;

        const optionDiv = document.createElement('div');
        optionDiv.className = 'poll-option';

        optionDiv.innerHTML = `
            <input type="radio" disabled>
            <input type="text" class="option-input" placeholder="Option ${optionCount}" value="${optionText}">
            <button class="delete-option-btn">&times;</button>
        `;

        // Add event listener to delete button
        const deleteBtn = optionDiv.querySelector('.delete-option-btn');
        deleteBtn.addEventListener('click', function () {
            optionDiv.remove();
            updateOptionPlaceholders();
        });

        pollOptions.appendChild(optionDiv);
    }

    // Function to update option placeholders after deletion
    function updateOptionPlaceholders() {
        const options = pollOptions.querySelectorAll('.poll-option');
        optionCount = options.length;

        options.forEach((option, index) => {
            const input = option.querySelector('.option-input');
            input.placeholder = `Option ${index + 1}`;
        });
    }

    // Function to validate poll before publishing
    function validatePoll() {
        const question = pollQuestion.value.trim();
        const options = pollOptions.querySelectorAll('.option-input');
        let validOptions = 0;

        // Check if question is empty
        if (!question) {
            pollQuestion.focus();  // Focus on the question input
            return false;
        }

        // Check if at least two options are filled
        options.forEach(option => {
            if (option.value.trim()) {
                validOptions++;
            }
        });

        if (validOptions < 2) {
            // Focus on the first empty option field
            const emptyOption = Array.from(options).find(option => option.value.trim() === '');
            if (emptyOption) {
                emptyOption.focus();
            }
            return false;
        }

        return true;
    }

    // Function to publish a new poll
    function publishPoll() {
        const question = pollQuestion.value.trim();
        const options = Array.from(pollOptions.querySelectorAll('.option-input'))
            .map(input => input.value.trim())
            .filter(value => value !== '');

        // In a real application, you would make an AJAX call to save the poll
        console.log('Publishing poll:', {
            question: question,
            options: options
        });

        // Add the poll to the question list
        addPollToQuestionList(question, options);
    }

    // Function to update an existing poll
    function updatePoll(poll) {
        const question = pollQuestion.value.trim();
        const options = Array.from(pollOptions.querySelectorAll('.option-input'))
            .map(input => input.value.trim())
            .filter(value => value !== '');

        // In a real application, you would make an AJAX call to update the poll
        console.log('Updating poll:', {
            id: poll.id,
            question: question,
            options: options
        });

        // Update the poll in the question list
        updatePollInList(poll, question, options);
    }

    // Function to add a new poll to the question list
    function addPollToQuestionList(question, options) {
        const questionList = document.querySelector('.question-list');

        if (questionList) {
            const pollId = 'poll_' + Date.now(); // Generate a unique ID for the poll
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            questionItem.dataset.pollId = pollId; // Store the poll ID as a data attribute

            questionItem.innerHTML = `
                <div class="question-info">
                    <h3>${question}</h3>
                    <div class="question-responses">0 Responses</div>
                </div>
                <div class="question-actions">
                    <button class="edit-question">
                        <img src="/images/edit-icon.png" alt="Edit">
                    </button>
                    <button class="delete-question">
                        <img src="/images/delete-icon.png" alt="Delete">
                    </button>
                </div>
            `;

            // Add event listener to the edit button
            const editBtn = questionItem.querySelector('.edit-question');
            editBtn.addEventListener('click', function () {
                openPollModal({
                    id: pollId,
                    question: question,
                    options: options
                });
            });

            // Add event listener to the delete button
            const deleteBtn = questionItem.querySelector('.delete-question');
            deleteBtn.addEventListener('click', function () {
                questionItem.remove();
            });

            questionList.prepend(questionItem);
        }
    }

    // Function to update an existing poll in the question list
    function updatePollInList(poll, question, options) {
        const questionList = document.querySelector('.question-list');
        const questionItem = questionList.querySelector(`[data-poll-id="${poll.id}"]`) ||
            Array.from(questionList.querySelectorAll('.question-item'))
                .find(item => item.querySelector('.question-info h3').textContent === poll.question);

        if (questionItem) {
            // Update the question text
            questionItem.querySelector('.question-info h3').textContent = question;

            // Store the updated options for future editing
            questionItem.dataset.pollId = poll.id;

            // Update edit button event listener
            const editBtn = questionItem.querySelector('.edit-question');
            if (editBtn) {
                // Remove old event listeners
                const newEditBtn = editBtn.cloneNode(true);
                editBtn.parentNode.replaceChild(newEditBtn, editBtn);

                // Add new event listener
                newEditBtn.addEventListener('click', function () {
                    openPollModal({
                        id: poll.id,
                        question: question,
                        options: options
                    });
                });
            }

            console.log('Poll updated successfully');
        } else {
            console.error('Could not find poll to update');
        }
    }

    // Function to reset poll form
    function resetPollForm() {
        pollQuestion.value = '';

        // Clear all options
        pollOptions.innerHTML = '';
        optionCount = 0; // Reset option count for new poll
    }

    // Initialize edit and delete buttons for existing questions
    function initExistingQuestions() {
        const questionItems = document.querySelectorAll('.question-item');

        questionItems.forEach(item => {
            // Initialize delete buttons
            const deleteBtn = item.querySelector('.delete-question');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', function () {
                    item.remove();
                });
            }

            // Initialize edit buttons
            const editBtn = item.querySelector('.edit-question');
            if (editBtn) {
                editBtn.addEventListener('click', function () {
                    const question = item.querySelector('.question-info h3').textContent;
                    // For existing polls, we'll assume they have at least 2 default options
                    // In a real app, you would fetch the actual options from the server
                    openPollModal({
                        id: item.dataset.pollId || 'poll_' + Date.now(),
                        question: question,
                        options: ['Option 1', 'Option 2']
                    });
                });
            }
        });
    }

    // Add CSS for edit button if not already present
    function addEditButtonStyles() {
        if (!document.getElementById('poll-edit-styles')) {
            const style = document.createElement('style');
            style.id = 'poll-edit-styles';
            style.textContent = `
                .question-actions {
                    display: flex;
                    gap: 10px;
                }
                .edit-question {
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .edit-question img {
                    width: 16px;
                    height: 16px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Call initialization functions
    addEditButtonStyles();
    initExistingQuestions();
});