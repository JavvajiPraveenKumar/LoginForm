document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const emailError = document.getElementById('emailError');
    const pwdErr = document.getElementById('pwdErr');
    const msg = document.getElementById('msg');

    let isValid = true;

    emailError.textContent = '';
    pwdErr.textContent = '';
    msg.textContent = '';
    if (!email) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Invalid email format';
        isValid = false;
    }

    if (!password) {
        pwdErr.textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        pwdErr.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (isValid) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                msg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Login successful!';
                msg.style.color = 'green';
            } else {
                msg.innerHTML = 'Login failed. Please try again.';
                msg.style.color = 'red';
            }
        } catch (error) {
            msg.innerHTML = 'An error occurred. Please try again later.';
            msg.style.color = 'red';
        }
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
