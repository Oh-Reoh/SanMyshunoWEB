document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const answerPollBtn = document.querySelector(".create-poll-btn")
    const pollModal = document.getElementById("pollModal")
    const closePollModal = document.getElementById("closePollModal")
    const submitPollAnswer = document.getElementById("submitPollAnswer")
    const pollQuestion = document.getElementById("pollQuestion")
    const pollOptions = document.getElementById("pollOptions")
    const questionList = document.querySelector(".question-list")

    // Current poll being answered
    let currentPollId = null

    // Load available polls
    loadPolls()

    // Event listeners
    // We don't need the answerPollBtn event listener anymore since users click directly on questions

    if (closePollModal) {
        closePollModal.addEventListener("click", () => {
            pollModal.classList.remove("active")
        })
    }

    if (submitPollAnswer) {
        submitPollAnswer.addEventListener("click", submitAnswer)
    }

    // Functions
    function loadPolls() {
        // This would be an API call to get polls from the server
        fetch("/api/polls")
            .then((response) => response.json())
            .then((polls) => {
                displayPolls(polls)
            })
            .catch((error) => {
                console.error("Error loading polls:", error)
                // For demo purposes, load some sample polls
                const samplePolls = [
                    { id: 1, question: "Question 1", responses: 7 },
                    { id: 2, question: "Question 2", responses: 7 },
                    { id: 3, question: "Question 3", responses: 7 },
                ]
                displayPolls(samplePolls)
            })
    }

    function displayPolls(polls) {
        questionList.innerHTML = ""

        polls.forEach((poll) => {
            const pollItem = document.createElement("div")
            pollItem.className = "question-item"
            pollItem.setAttribute("data-poll-id", poll.id)

            // Add a class if the poll has been answered by the current user
            if (poll.answered) {
                pollItem.classList.add("answered")
            }

            pollItem.innerHTML = `
              <div class="question-info">
                  <h3>${poll.question}</h3>
                  <div class="question-responses">${poll.responses} Responses</div>
              </div>
          `

            // Make the entire question item clickable to open the poll
            pollItem.addEventListener("click", () => {
                openPollModal(poll.id)
            })

            questionList.appendChild(pollItem)
        })
    }

    function openPollModal(pollId) {
        currentPollId = pollId

        // This would be an API call to get poll details
        fetch(`/api/polls/${pollId}`)
            .then((response) => response.json())
            .then((poll) => {
                displayPollDetails(poll)
                pollModal.classList.add("active")
            })
            .catch((error) => {
                console.error("Error loading poll details:", error)
                // For demo purposes, load sample poll details
                const samplePoll = {
                    id: pollId,
                    question: `Question ${pollId}`,
                    options: [
                        { id: 1, text: "Option 1" },
                        { id: 2, text: "Option 2" },
                        { id: 3, text: "Option 3" },
                    ],
                }
                displayPollDetails(samplePoll)
                pollModal.classList.add("active")
            })
    }

    function displayPollDetails(poll) {
        pollQuestion.textContent = poll.question

        pollOptions.innerHTML = ""

        poll.options.forEach((option) => {
            const optionElement = document.createElement("div")
            optionElement.className = "poll-option"

            optionElement.innerHTML = `
                <input type="radio" name="poll-option" value="${option.id}" id="option-${option.id}">
                <label for="option-${option.id}" class="option-label">${option.text}</label>
            `

            pollOptions.appendChild(optionElement)
        })
    }

    function submitAnswer() {
        const selectedOption = document.querySelector('input[name="poll-option"]:checked')

        if (!selectedOption) {
            return
        }

        const optionId = selectedOption.value

        // This would be an API call to submit the answer
        fetch("/api/polls/answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pollId: currentPollId,
                optionId: optionId,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                pollModal.classList.remove("active")
                // Refresh the polls list
                loadPolls()
            })
            .catch((error) => {
                console.error("Error submitting answer:", error)
                // For demo purposes
                pollModal.classList.remove("active")
            })
    }
})
