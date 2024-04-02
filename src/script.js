document.getElementById('age').addEventListener('input', function() {
    if (this.value.length >= 2) {
        this.value = this.value.slice(0, 2);
        this.blur(); // prevents further input from the user if the age digits are 2
    }
});
