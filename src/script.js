// Get references to HTML elements
const age = document.getElementById("age");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const female = document.getElementById("female");
const male = document.getElementById("male");
const submitButton = document.getElementById("submit-btn");
let resultArea = document.querySelector(".comment");
let modalContent = document.querySelector(".modal-content");
let modalText = document.querySelector("#modal-text");
const modal = document.getElementById("modal");
const closeButton = document.getElementsByClassName("close-btn")[0];

// Event listeners for input fields to handle validation
age.addEventListener('input', validateInput);
height.addEventListener('input', validateInput);
weight.addEventListener('input', validateInput);

// Function to handle input validation
function validateInput() {
    const input = this;
    const inputName = input.getAttribute('id');
    const inputValue = parseFloat(input.value);
    if (inputValue <= 0 || isNaN(inputValue)) {
        showModal(`${capitalizeFirstLetter(inputName)} cannot be negative or 0.`);
        input.value = "";
    } else if (input.value.length >= 3) {
        showModal(`${capitalizeFirstLetter(inputName)} cannot be more than 3 digits.`);
        input.value = input.value.slice(0, 3);
        input.blur();
    }
}
// Function to show the modal with specified message
function showModal(message) {
    modal.style.display = "block";
    modalText.innerHTML = message;
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Event listener for clicks on submit button to call calculate function
submitButton.addEventListener('click', () => {
    calculate();
});

// Event listener for key presses, specifically the 'Enter' key
document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        calculate();
    }
});

// Close the modal when the user clicks on close button 
closeButton.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to ensure all inputs are filled then calculate BMI and display the result in HTML 
function calculate() {
    if (age.value == '' || height.value == '' || weight.value == '' || (male.checked == false && female.checked == false)) {
        console.log("All fields are required!");
        modal.style.display = "block";
        modalText.innerHTML = `All fields are required!`;

    } else {
        var person = [age.value, height.value, weight.value];
        if (male.checked) {
            person.push("male");

        }else if (female.checked){
            person.push("female");
        }

        var bmi = weight.value/Math.pow((height.value/100),2);
        var result = '';
        if (bmi < 18.5) {
            result = 'Underweight';
        } else if (18.5 <= bmi && bmi <= 24.9) {
            result = 'Healthy';
        } else if (25 <= bmi && bmi <= 29.9) {
            result = 'Overweight';
        } else if (30 <= bmi && bmi <= 34.9) {
            result = 'Obese';
        } else if (35 <= bmi) {
            result = 'Extremely obese';
        }
        
        person.push(bmi.toFixed(2));
        person.push(result);
        console.log(person);
        document.querySelector("#result").innerHTML = bmi.toFixed(2);
        resultArea.innerHTML = `You are <span id="comment">${result}!</span>`;
    }
}