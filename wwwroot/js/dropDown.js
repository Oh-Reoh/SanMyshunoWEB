//drop down menu for profile and log out
document.addEventListener('DOMContentLoaded', function () {
            const dropdownToggle = document.getElementById('userDropdown');
            const dropdownMenu = document.getElementById('userDropdownMenu');
            
            if (dropdownToggle && dropdownMenu) {
                dropdownToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dropdownToggle.classList.toggle('active');
                    dropdownMenu.classList.toggle('show');
                });
                
                document.addEventListener('click', function(e) {
                    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                        dropdownToggle.classList.remove('active');
                        dropdownMenu.classList.remove('show');
                    }
                });
            }
        });