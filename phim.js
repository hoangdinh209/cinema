function redirectToPage() {
    var selectElement = document.getElementById("rap");
    var selectedOption = selectElement.options[selectElement.selectedIndex]; 
    var url = selectedOption.getAttribute("data-url");
    if (url) {
        window.location.href = url; 
    }
}
let slideIndex = 0;
let slideInterval;

function showSlides() {
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");

// Ẩn tất cả các slide
for (let i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}

// Loại bỏ lớp active từ tất cả các chấm
for (let i = 0; i < dots.length; i++) {
dots[i].className = dots[i].className.replace(" active", "");
}

// Hiển thị slide hiện tại và chấm tương ứng
slides[slideIndex].style.display = "block";
dots[slideIndex].className += " active";
}

function startSlideShow() {
slideInterval = setInterval(() => {
slideIndex++;
if (slideIndex >= document.getElementsByClassName("mySlides").length) {
slideIndex = 0;
}
showSlides();
}, 2500); // Tự động chuyển ảnh sau 2.5 giây
}

function resetSlideShow() {
clearInterval(slideInterval); // Dừng tự động chuyển ảnh
startSlideShow(); // Bắt đầu lại tự động chuyển ảnh
}

function plusSlides(n) {
slideIndex += n;
let slides = document.getElementsByClassName("mySlides").length;
if (slideIndex >= slides) {
slideIndex = 0;
} else if (slideIndex < 0) {
slideIndex = slides - 1;
}
showSlides(); // Cập nhật slide
resetSlideShow(); // Bắt đầu lại tự động chuyển ảnh
}

function currentSlide(n) {
slideIndex = n - 1;
showSlides(); // Cập nhật slide
resetSlideShow(); // Bắt đầu lại tự động chuyển ảnh
}

// Khởi động slideshow khi trang đã tải xong
window.onload = function() {
showSlides();    // Hiển thị slide đầu tiên
startSlideShow(); // Bắt đầu tự động chuyển ảnh
};


document.querySelectorAll('ol a').forEach(link => {
link.addEventListener('click', function(event) {
event.preventDefault();
document.querySelectorAll('ol a').forEach(a => a.classList.remove('active'));
this.classList.add('active');

const targetId = this.getAttribute('href').substring(1);
document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.add('hidden');
});
const targetElement = document.getElementById(targetId);
if (targetElement) { // Kiểm tra phần tử có tồn tại không
    targetElement.classList.remove('hidden');
}
});
});
// Mở modal và hiển thị thông tin giờ chiếu theo thời gian thực
function openTicketModal(movieTitle, theaterName) {
document.getElementById("movieName").textContent = movieTitle;
document.getElementById("theaterName").textContent = theaterName;

const showtimesContainer = document.getElementById("showtimes");
showtimesContainer.innerHTML = ""; // Xóa nội dung cũ

const now = new Date();
const datesContainer = document.getElementById("dates");
datesContainer.innerHTML = ""; // Xóa ngày cũ

// Tạo lịch chiếu cho 4 ngày tiếp theo
for (let i = 0; i < 4; i++) {
const currentDay = new Date(now);
currentDay.setDate(now.getDate() + i);

// Tạo phần tử cho ngày
const dateElement = document.createElement("div");
dateElement.className = "date";
dateElement.dataset.dateValue = currentDay.toISOString(); // Lưu giá trị ngày
// Tách phần thứ và ngày/tháng
const dateString = `${currentDay.getDate().toString().padStart(2, '0')}/${(currentDay.getMonth() + 1).toString().padStart(2, '0')}`;
const dayName = currentDay.toLocaleDateString('vi-VN', { weekday: 'short' });

// Tạo phần tử cho thứ và ngày/tháng
dateElement.innerHTML = `<span class="day-date">${dateString}</span> - <span class="day-prefix">${dayName}</span>`;
// Thêm sự kiện click để thay đổi giờ chiếu khi chọn ngày
dateElement.addEventListener('click', function () {
    selectDate(dateElement, currentDay);
});

datesContainer.appendChild(dateElement);
}

// Tự động chọn ngày đầu tiên khi modal được mở
selectFirstDate();

// Hiển thị modal
document.getElementById("ticketModal").style.display = "block";
}

// Hàm để chọn ngày đầu tiên mặc định
function selectFirstDate() {
const firstDateElement = document.querySelector('#dates .date');
if (firstDateElement) {
const firstDate = new Date(firstDateElement.dataset.dateValue);
selectDate(firstDateElement, firstDate);
}
}

// Hàm chọn ngày và cập nhật trạng thái UI
function selectDate(dateElement, date) {
// Xóa lớp active từ tất cả các ngày khác
document.querySelectorAll('.date').forEach(el => el.classList.remove('active'));
// Thêm lớp active vào ngày đã chọn
dateElement.classList.add('active');
// Cập nhật giờ chiếu cho ngày đã chọn
updateShowtimesForDate(date);
}

// Hàm để cập nhật giờ chiếu theo ngày
function updateShowtimesForDate(date) {
const showtimesContainer = document.getElementById("showtimes");
showtimesContainer.innerHTML = ""; // Xóa giờ chiếu cũ

// Kiểm tra ngày là chẵn hay lẻ
const day = date.getDate();
let times;

if (day % 2 === 0) {
// Ngày chẵn
times = ["09:00", "13:00", "15:30", "18:00", "21:00"];
} else {
// Ngày lẻ
times = ["08:45", "12:20", "14:00", "17:20", "20:30"];
}

// Tạo giờ chiếu cho ngày đã chọn
times.forEach(time => {
const showtimeElement = document.createElement("button");
showtimeElement.className = "showtime";
showtimeElement.textContent = time;

// Thêm sự kiện click để hiển thị thông báo đặt vé thành công
showtimeElement.onclick = function() {
    alert(`Đặt vé thành công vào lúc ${time} ngày ${date.toLocaleDateString('vi-VN')}`);
};

showtimesContainer.appendChild(showtimeElement);
});
}

// Đóng modal khi ấn vào nút đóng
document.querySelector(".close").onclick = function() {
document.getElementById("ticketModal").style.display = "none";
};

// Đóng modal khi ấn ra ngoài
window.onclick = function(event) {
if (event.target == document.getElementById("ticketModal")) {
document.getElementById("ticketModal").style.display = "none";
}
};

// Gọi modal khi nhấn nút "MUA VÉ"
document.querySelectorAll(".movie-card button").forEach(button => {
button.addEventListener("click", function() {
const movieTitle = this.closest(".movie-card").querySelector("h3").textContent; // Lấy tên phim từ phần tử h3 trong movie-card
const theaterName = document.getElementById("rap").selectedOptions[0].textContent; // Lấy tên rạp từ select
openTicketModal(movieTitle, theaterName);
});
});


document.addEventListener("DOMContentLoaded", function() {
const theaterSelect = document.getElementById("rap");
// Chọn một rạp mặc định - ví dụ là rạp đầu tiên
theaterSelect.selectedIndex = 1; // Bạn có thể thay đổi chỉ số để chọn rạp mặc định cụ thể (chỉ số bắt đầu từ 0)

// Sau khi chọn rạp, có thể gọi hàm để cập nhật thông tin tương ứng nếu cần
redirectToPage();
});
