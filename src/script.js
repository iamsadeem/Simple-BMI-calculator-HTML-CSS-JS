// Get references to HTML elements
const age = document.getElementById("age");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const female = document.getElementById("female");
const male = document.getElementById("male");
const submitButton = document.getElementById("submit-btn");
let resultArea = document.querySelector(".comment");

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

// Function to ensure all inputs are filled then calculate BMI and display the result in HTML 
function calculate() {
    if (age.value=='' || height.value=='' || weight.value=='' || (male.checked==false && female.checked==false)) {
        console.log("All fields are required!");

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
        } else if (18.5 <= bmi && bmi <=24.9) {
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
        document.querySelector(".comment").innerHTML = `You are <span id="comment">${result}!</span>`;
        document.querySelector("#result").innerHTML = bmi.toFixed(2);
    }
}