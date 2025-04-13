document.addEventListener('DOMContentLoaded', function () {
    // === Profile dropdown ===
    const profileIcon = document.getElementById('profileIcon');
    const dropdownMenu = document.getElementById('userDropdownMenu');

    if (profileIcon && dropdownMenu) {
        profileIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!profileIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // === Notification dropdown ===
    const notificationToggle = document.getElementById('notificationToggle');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationList = document.getElementById('notificationList');

    if (notificationToggle && notificationDropdown) {
        notificationToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = notificationDropdown.classList.toggle('show');

            // Toggle bell icon active state
            if (isOpen) {
                notificationToggle.classList.add('active');
                fetchNotifications();
            } else {
                notificationToggle.classList.remove('active');
            }
        });

        document.addEventListener('click', function (e) {
            if (!notificationDropdown.contains(e.target) && !notificationToggle.contains(e.target)) {
                notificationDropdown.classList.remove('show');
                notificationToggle.classList.remove('active');
            }
        });
    }

    function fetchNotifications() {
        const notifications = [
            { title: "New Visitor Pass requested by Unit 5B", date: "April 13, 2025" },
            { title: "Maintenance request from Homeowner 3F", date: "April 13, 2025" },
            { title: "Facility reservation: Gym booked 7:00 PM", date: "April 12, 2025" },
            { title: "Vehicle registration pending approval", date: "April 12, 2025" },
            { title: "Staff requested account access", date: "April 11, 2025" },
            { title: "Visitor Pass approved by Admin", date: "April 10, 2025" },
            { title: "Pass request denied for visitor Miguel", date: "April 9, 2025" },
            { title: "CCTV issue reported by Security", date: "April 8, 2025" },
            { title: "Elevator maintenance scheduled", date: "April 7, 2025" },
            { title: "New parking assignment posted", date: "April 6, 2025" }
        ];

        notificationList.innerHTML = "";

        if (notifications.length === 0) {
            notificationList.innerHTML = `
                <div class="notification-item no-notif">
                    <div class="notification-title" style="text-align: center;">No new notifications</div>
                </div>
            `;
            return;
        }

        notifications.forEach(n => {
            const item = document.createElement('div');
            item.classList.add('notification-item');
            item.innerHTML = `
                <div class="notification-title">${n.title}</div>
                <div class="notification-date">${n.date}</div>
            `;
            notificationList.appendChild(item);
        });
    }
});
