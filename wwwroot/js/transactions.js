document.addEventListener('DOMContentLoaded', () => {
    const filterToggle = document.getElementById('filterToggle');
    const filterMenu = document.querySelector('.dropdown-menu'); // ✅ fixed selector
    const filterOptions = document.querySelectorAll('.filter-option');
    const transactions = document.querySelectorAll('.transaction-item');

    // Toggle dropdown menu
    filterToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        filterMenu.classList.toggle('show');
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (e) => {
        if (!filterMenu.contains(e.target) && !filterToggle.contains(e.target)) {
            filterMenu.classList.remove('show');
        }
    });

    // Filter logic
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selected = option.dataset.type; // ✅ use correct attribute

            transactions.forEach(item => {
                const type = item.dataset.type;
                item.style.display = (type === selected || selected === "All") ? "flex" : "none";
            });

            filterMenu.classList.remove('show');
        });
    });
});
