document.addEventListener("DOMContentLoaded", () => {
    const commentModal = document.getElementById("commentModal")
    const closeCommentModal = document.getElementById("closeCommentModal")
    const commentList = document.getElementById("commentList")
    const newCommentInput = document.getElementById("newCommentInput")
    const submitComment = document.getElementById("submitComment")
    const originalPostContent = document.getElementById("originalPostContent")
    const originalPostAuthor = document.getElementById("originalPostAuthor")
    const originalPostAvatar = document.getElementById("originalPostAvatar")
    const originalPostDate = document.getElementById("originalPostDate")

    // Variable to store the current post ID
    let currentPostId = null

    // Function to format date as "Month Day, Year"
    function formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    // Add event delegation for comment buttons in post cards
    document.addEventListener("click", (e) => {
        // Check if the clicked element or its parent is a comment button
        const commentBtn = e.target.closest(".post-action-btn")
        if (commentBtn && commentBtn.querySelector('img[alt="Comments"]')) {
            e.preventDefault()

            // Get the post data from the parent post card
            const postCard = commentBtn.closest(".post-card")
            currentPostId = postCard.id

            // Get post author info
            const authorName = postCard.querySelector(".post-info .post-author").textContent
            const authorAvatar = postCard.querySelector(".post-avatar img").src

            // Get post date
            const postDate = postCard.querySelector(".post-date").textContent

            // Set the original post author info and date
            originalPostAuthor.textContent = authorName
            originalPostAvatar.src = authorAvatar
            originalPostDate.textContent = postDate

            // Get post content
            const postContent = postCard.querySelector(".post-content p").innerHTML

            // Set the original post content in the modal
            originalPostContent.innerHTML = `<p>${postContent}</p>`

            // Check if there's a file attachment and include it
            const fileAttachment = postCard.querySelector(".post-attachment")
            if (fileAttachment) {
                const attachmentClone = fileAttachment.cloneNode(true)
                originalPostContent.appendChild(attachmentClone)
            }

            // Load comments for this post
            loadComments(currentPostId)

            // Show the modal
            commentModal.classList.add("active")

            // Focus on the comment input
            setTimeout(() => {
                newCommentInput.focus()
            }, 300)
        }
    })

    // Close modal when clicking the close button
    if (closeCommentModal) {
        closeCommentModal.addEventListener("click", () => {
            commentModal.classList.remove("active")
            currentPostId = null
        })
    }

    // Close modal when clicking outside the modal
    if (commentModal) {
        commentModal.addEventListener("click", (e) => {
            if (e.target === commentModal) {
                commentModal.classList.remove("active")
                currentPostId = null
            }
        })
    }

    // Submit new comment
    if (submitComment) {
        submitComment.addEventListener("click", () => {
            submitNewComment()
        })
    }

    // Allow submitting comment with Enter key
    if (newCommentInput) {
        newCommentInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                submitNewComment()
            }
        })
    }

    // Function to submit a new comment
    function submitNewComment() {
        const commentText = newCommentInput.value.trim()
        if (commentText && currentPostId) {
            addComment(commentText)
            newCommentInput.value = ""

            // Update the comment count on the post card
            updateCommentCount(currentPostId)
        }
    }

    // Function to load comments for a post
    function loadComments(postId) {
        // Clear existing comments
        commentList.innerHTML = ""

        // Get comments from localStorage or create empty array if none exist
        const comments = getCommentsForPost(postId)

        if (comments.length === 0) {
            // No comments yet
            commentList.innerHTML = '<div class="no-comments">No comments yet. Be the first to comment!</div>'
        } else {
            // Add each comment to the list
            comments.forEach((comment) => {
                const commentElement = createCommentElement(comment)
                commentList.appendChild(commentElement)
            })
        }
    }

    // Function to get comments for a specific post
    function getCommentsForPost(postId) {
        // In a real app, you would fetch from a database
        // For now, we'll use localStorage
        const allComments = JSON.parse(localStorage.getItem("postComments")) || {}
        return allComments[postId] || []
    }

    // Function to save comments for a specific post
    function saveCommentsForPost(postId, comments) {
        // In a real app, you would save to a database
        // For now, we'll use localStorage
        const allComments = JSON.parse(localStorage.getItem("postComments")) || {}
        allComments[postId] = comments
        localStorage.setItem("postComments", JSON.stringify(allComments))
    }

    // Function to create a comment element
    function createCommentElement(comment) {
        const commentItem = document.createElement("div")
        commentItem.className = "comment-item"

        // Format timestamp if available
        let timestampHTML = ""
        if (comment.timestamp) {
            const formattedDate = formatDate(comment.timestamp)
            timestampHTML = `<div class="comment-timestamp">${formattedDate}</div>`
        }

        commentItem.innerHTML = `
            <div class="post-avatar comment-avatar">
                <img src="${comment.avatar}" alt="${comment.author}">
            </div>
            <div class="comment-content">
                <div class="comment-author">${comment.author}</div>
                ${timestampHTML}
                <div class="comment-text">${comment.text}</div>
            </div>
        `

        return commentItem
    }

    // Function to add a new comment
    function addComment(text) {
        if (!currentPostId) return

        // Determine if current user is admin or homeowner
        // In a real app, this would come from authentication
        const isAdmin = true // Since this is AdminHome.cshtml

        // Create new comment object
        const newComment = {
            id: Date.now(), // Unique ID for the comment
            author: isAdmin ? "Admin Name" : "Homeowner name",
            avatar: isAdmin ? "/images/profile-icon.png" : "/images/user-icon.png",
            isAdmin: isAdmin,
            text: text,
            timestamp: new Date().toISOString(),
        }

        // Get existing comments
        const comments = getCommentsForPost(currentPostId)

        // Add new comment
        comments.push(newComment)

        // Save updated comments
        saveCommentsForPost(currentPostId, comments)

        // Create and add comment element to the list
        const commentElement = createCommentElement(newComment)

        // Remove "no comments" message if it exists
        const noCommentsMsg = commentList.querySelector(".no-comments")
        if (noCommentsMsg) {
            commentList.innerHTML = ""
        }

        commentList.appendChild(commentElement)

        // Scroll to the new comment
        commentList.scrollTop = commentList.scrollHeight
    }

    // Function to update the comment count on a post card
    function updateCommentCount(postId) {
        const postCard = document.getElementById(postId)
        if (!postCard) return

        const comments = getCommentsForPost(postId)
        const commentCount = comments.length

        // Update the comment button text
        const commentBtn = postCard.querySelector(".post-action-btn")
        if (commentBtn) {
            commentBtn.innerHTML = `
                <img src="/images/comments-icon.png" alt="Comments"> 
                Comments (${commentCount})
            `
        }
    }

    // Initialize comment counts for all posts
    function initializeCommentCounts() {
        const postCards = document.querySelectorAll(".post-card")
        postCards.forEach((card) => {
            const postId = card.id
            if (postId) {
                const comments = getCommentsForPost(postId)
                const commentCount = comments.length

                // Only update if there are comments
                if (commentCount > 0) {
                    const commentBtn = card.querySelector(".post-action-btn")
                    if (commentBtn) {
                        commentBtn.innerHTML = `
                            <img src="/images/comments-icon.png" alt="Comments"> 
                            Comments (${commentCount})
                        `
                    }
                }
            }
        })
    }

    initializeCommentCounts()
})

