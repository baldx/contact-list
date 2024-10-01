let firstNameInput = document.querySelector('#firstName');
let lastNameInput = document.querySelector('#lastName');
let birthDateInput = document.querySelector('#birthdate');
const submitBtn = document.querySelector('#submit');
let main = document.querySelector('main');


function calculateAge (birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}
function calculateDaysTillBirthday (birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);

    birthDate.setFullYear(today.getFullYear());

    if (today > birthDate) {
        birthDate.setFullYear(today.getFullYear() + 1);
    }

    const diffInMilliseconds = birthDate - today;

    const daysLeft = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    return daysLeft;
}

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const card = document.createElement('div');
    card.classList.add('user-card');

    const firstName = document.createElement('div');
    firstName.textContent = `First Name: ${firstNameInput.value}`;

    const lastName = document.createElement('div');
    lastName.textContent = `Last Name: ${lastNameInput.value}`;

    const birthDate = document.createElement('div');
    birthDate.textContent = `Birthday: ${birthDateInput.value}`;

    const ageDiv = document.createElement('div');
    ageDiv.textContent = `Age: ${calculateAge(birthDateInput.value)}`

    const daysTillBirthday = document.createElement('div');
    daysTillBirthday.textContent = `Days until birthday: ${calculateDaysTillBirthday(birthDateInput.value)}`;

    card.appendChild(firstName);
    card.appendChild(lastName);
    card.appendChild(birthDate);
    card.appendChild(ageDiv);
    card.appendChild(daysTillBirthday);

    main.appendChild(card);

    firstNameInput.value = '';
    lastNameInput.value = '';
    birthDateInput.value = '';
});