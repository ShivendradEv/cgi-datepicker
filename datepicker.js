const dateInput = document.getElementById('dateInput');
const calendar = document.querySelector('.calendar');
const monthYear = document.getElementById('monthYear');
const daysContainer = document.getElementById('days');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const calendarIcon = document.querySelector('.calendar-img');

let selectedDate = null;

// If want to add 0 befer single digit dates
// function showCalendar(date) {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstDayOfMonth = new Date(year, month, 1).getDay();
//     const today = new Date();

//     monthYear.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//     daysContainer.innerHTML = '';

//     for (let i = 0; i < firstDayOfMonth; i++) {
//         const emptyDay = document.createElement('div');
//         emptyDay.classList.add('day', 'empty');
//         daysContainer.appendChild(emptyDay);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//         const dayElement = document.createElement('div');
//         dayElement.textContent = day < 10 ? `0${day}` : day; // Add leading zero if day is single digit
//         dayElement.classList.add('day');

function showCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const today = new Date();

    monthYear.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    daysContainer.innerHTML = '';

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'empty');
        daysContainer.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('day');

        if (date.getFullYear() === selectedDate.getFullYear() && date.getMonth() === selectedDate.getMonth() && day === selectedDate.getDate() && dateInput.value !== '') {
            dayElement.classList.add('selected');
        }

        const currentDate = new Date(year, month, day);

        const dayDifference = Math.floor((currentDate - today) / (1000 * 60 * 60 * 24));

        if ((today.getDay() === 4 || today.getDay() === 5) && dayDifference < 4 || dayDifference > 29) {
            dayElement.classList.add('disabled');
            dayElement.removeEventListener('click', () => selectDate(year, month, day));
        } else if(today.getDay() === 6 && dayDifference < 3 || dayDifference > 29) {
            dayElement.classList.add('disabled');
            dayElement.removeEventListener('click', () => selectDate(year, month, day));
        } else if((today.getDay() != 4 && today.getDay() != 5 && today.getDay() != 6) && dayDifference < 2 || dayDifference > 29) {
            dayElement.classList.add('disabled');
            dayElement.removeEventListener('click', () => selectDate(year, month, day));
        } else {
            dayElement.addEventListener('click', () => selectDate(year, month, day));
        }

        if (currentDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('todayDate');
        }

        daysContainer.appendChild(dayElement);
    }
}

function selectDate(year, month, day) {
    selectedDate = new Date(year, month, day);
    showCalendar(selectedDate);
    dateInput.value = selectedDate.toLocaleDateString('en-US');
    hideCalendar();
    $("#dateInput").change();
}

function prevMonth() {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    showCalendar(selectedDate);
}

function nextMonth() {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    showCalendar(selectedDate);
}

function openDatepicker() {
    if (dateInput.value) {
        const dateParts = dateInput.value.split('/');
        const selectedDay = parseInt(dateParts[1], 10);
        const selectedMonth = parseInt(dateParts[0], 10) - 1;
        const selectedYear = parseInt(dateParts[2], 10);

        if (!isNaN(selectedDay) && !isNaN(selectedMonth) && !isNaN(selectedYear)) {
            selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
        }
    } else {
        selectedDate = new Date();
    }

    showCalendar(selectedDate);
}

function hideCalendar() {
    calendar.style.display = 'none';
}

document.body.addEventListener('click', (event) => {
    if (!calendar.contains(event.target) && event.target !== calendarIcon) {
        hideCalendar();
    }
});

dateInput.addEventListener('input', function (event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');

    if (inputValue.length > 8) {
        inputValue = inputValue.slice(0, 8);
    }

    if (inputValue.length >= 3 && inputValue.length < 4) {
        inputValue = inputValue.replace(/^(\d{2})/, '$1/');
    } else if (inputValue.length >= 5 && inputValue.length < 6) {
        inputValue = inputValue.replace(/^(\d{2})(\d{2})/, '$1/$2/');
    } else if (inputValue.length >= 6) {
        inputValue = inputValue.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    }

    event.target.value = inputValue;
});

calendarIcon.addEventListener('click', () => {
    if (calendar.style.display === 'block') {
        calendar.style.display = 'none';
    } else {
        console.log('dada')
        calendar.style.display = 'block';
        openDatepicker();
    }
});

prevBtn.addEventListener('click', () => {
    prevMonth();
});

nextBtn.addEventListener('click', () => {
    nextMonth();
});

$("#dateInput").change(function(){
    console.log("hello")
})

openDatepicker();
