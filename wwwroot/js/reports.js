document.addEventListener('DOMContentLoaded', function () {
    const reportTypeSelect = document.getElementById('reportType');
    reportTypeSelect.addEventListener('change', function () {
        // Add filtering logic here
        console.log('Selected report type:', this.value);
    });
});
