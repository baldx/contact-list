let firstNameInput = document.querySelector('#firstName');
let lastNameInput = document.querySelector('#lastName');
let birthDateInput = document.querySelector('#birthdate');
const submitBtn = document.querySelector('#submit');
let main = document.querySelector('main');
let sortingBtn = document.querySelector('#sorting');

let contactList = [

]

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

    contactList.push({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        birthDate: birthDateInput.value,
        age: calculateAge(birthDateInput.value),
        daysTillBirthday: calculateDaysTillBirthday(birthDateInput.value)
    });
    
    visual(contactList);
    formValidation();

});

function formValidation () {
    firstNameInput.value = '';
    lastNameInput.value = '';
    birthDateInput.value = '';
}

function visual (list) {
    const cards = document.querySelectorAll('.user-card');
    cards.forEach(card => main.removeChild(card))    
    
    for (let i = 0; i < list.length; i++) {
        createContact(list[i]);
    }
}

function createContact (item) {

    const card = document.createElement('div');
    card.classList.add('user-card');

    const firstName = document.createElement('div');
    firstName.textContent = `First Name: ${item.firstName}`;

    const lastName = document.createElement('div');
    lastName.textContent = `Last Name: ${item.lastName}`;

    const birthDate = document.createElement('div');
    birthDate.textContent = `Birthday: ${item.birthDate}`;

    const ageDiv = document.createElement('div');
    ageDiv.textContent = `Age: ${item.age}`

    const daysTillBirthday = document.createElement('div');
    daysTillBirthday.textContent = `Days until birthday: ${item.daysTillBirthday}`;

    card.appendChild(firstName);
    card.appendChild(lastName);
    card.appendChild(birthDate);
    card.appendChild(ageDiv);
    card.appendChild(daysTillBirthday);

    main.appendChild(card);
}

sortingBtn.addEventListener('click', function(e) {

    if (sortingBtn.className === 'creation') {
        sortingBtn.className = 'age';
        sortingBtn.innerHTML = 'Sorted by age'

        visual(contactList.sort((age1, age2) => {

            if (age1.age < age2.age) return 1;
            else if (age1.age > age2.age) return -1;
            else return 0;

        })); //sorts age, from highest to lowest

    } else if (sortingBtn.className === 'age') {
        sortingBtn.className = 'name';
        sortingBtn.innerHTML = 'Sorted by name';

        visual(contactList.sort((name1, name2) => {
            
            if (name1.firstName > name2.firstName) return 1;
            else if (name1.firstName < name2.firstName) return -1;
            else return 0;

        })); //sorts name, from a to z

    } else if (sortingBtn.className === 'name') {
        sortingBtn.className = 'days-until';
        sortingBtn.innerHTML = 'Sorted by days until birthday'
        
        visual(contactList.sort((date1, date2) => {

            if (date1.daysTillBirthday > date2.daysTillBirthday) return 1;
            else if (date1.daysTillBirthday < date2.daysTillBirthday) return -1;
            else return 0;

        })); // sorts from lowest to highest

    } else if (sortingBtn.className === 'days-until') {
        sortingBtn.className = 'creation';
        sortingBtn.innerHTML = 'Sorted by contact creation'
    }
});
