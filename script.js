// document.querySelectorAll('.showtime').forEach(button => {
//     button.addEventListener('click', () => {
//         const seats = button.getAttribute('data-seats');
//         alert(`You selected showtime at ${button.textContent.trim()} with ${seats} seats available.`);
//     });
// });
document.querySelectorAll('.showtime').forEach(button => {
    button.addEventListener('click', () => {
        // Get the selected showtime and display it in the modal
        const showTime = button.textContent.trim();
        const showDate = "25/10/2024"; // Replace with dynamic date if needed

        document.getElementById('show-time').textContent = showTime;
        document.getElementById('show-date').textContent = showDate;

        // Display the modal
        const modal = document.getElementById('booking-modal');
        modal.style.display = 'block';
    });
});

// Close button event handler
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('booking-modal').style.display = 'none';
});

// Confirm button handler (you can add more logic here)
document.getElementById('confirm-btn').addEventListener('click', () => {
    alert('Booking Confirmed!');
    document.getElementById('booking-modal').style.display = 'none';
});
