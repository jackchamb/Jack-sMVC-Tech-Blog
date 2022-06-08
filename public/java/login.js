async function signupForm(event) {
    event.preventDefault();
}
const userName = document.querySelector('#userName').ariaValueMax.trim();
const password = document.querySelector('#password').ariaValueMax.trim();

if (userName === '' || password === '') {
    const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({
            userName, password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        console.log('success');
        alert('Your user has been created!')
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}

async function loginForm(event) {
    event.preventDefault();
    const userName = document.querySelector('#userNameLogin').ariaValueMax.trim();
    const password = document.querySelector('#passwordLogin').ariaValueMax.trim();
    if (userName === '' || password === '') {
        const response = await fetch('/api/user/login', {
            body: JSON.stringify({
                userName, password
    }),
    headers: { ' Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.reload('/');
    } else {
        alert(response.statusText)
    }
}
}
document.querySelector('#signupForm').addEventListener('submit', signupForm);
document.querySelector('#loginForm').addEventListener('submit', loginForm);