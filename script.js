document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const birthDate = document.getElementById('birthDate');
    const nameRegexEng = /^[A-Z][a-z\s-]{0,19}$/;
    const nameRegexRus = /^[А-ЯЁ][а-яё\s-]{0,19}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    function validateName(field) {
        field.addEventListener('blur', () => {
            const value = field.value;
            if (nameRegexEng.test(value) || nameRegexRus.test(value)) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            } else {
                field.classList.add('is-invalid');
            }
            toggleSubmitButton();
        });
    }
    function validateField(field, regex) {
        field.addEventListener('blur', () => {
            if (!regex.test(field.value)) {
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
            toggleSubmitButton();
        });
    }

    function validatePasswordConfirmation() {
        confirmPassword.addEventListener('blur', () => {
            if (password.value !== confirmPassword.value) {
                confirmPassword.classList.add('is-invalid');
            } else {
                confirmPassword.classList.remove('is-invalid');
                confirmPassword.classList.add('is-valid');
            }
            toggleSubmitButton();
        });
    }

    function validateAge() {
        birthDate.addEventListener('blur', () => {
            const today = new Date();
            const birth = new Date(birthDate.value);
            const age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            if (age < 18) {
                birthDate.classList.add('is-invalid');
            } else {
                birthDate.classList.remove('is-invalid');
                birthDate.classList.add('is-valid');
            }
            toggleSubmitButton();
        });
    }
    function toggleSubmitButton() {
        const allFieldsValid = document.querySelectorAll('.is-valid').length === 6;
        submitBtn.disabled = !allFieldsValid;
    }
    validateName(firstName);
    validateName(lastName);
    validateField(email, emailRegex);
    validateField(password, passwordRegex);
    validatePasswordConfirmation();
    validateAge();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Готово! Форма успешно отправлена!');
    });
});
