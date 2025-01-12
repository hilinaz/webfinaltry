document
  .getElementById('loginForm')
  ?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();

        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <span style="color: green; font-size: 24px;">&#10003;</span> Login successful!`;

        const formContainer = document.getElementById('loginForm');
        if (formContainer) {
          formContainer.appendChild(successMessage);
        }

        localStorage.setItem('accessToken', data.accessToken);

        setTimeout(() => {
          window.location.href = 'postView.html';
        }, 1000);
      } else {
        const errorMessage = await response.text();

        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.className = 'error-message';
        errorMessageDiv.innerHTML = `
          <span style="color: red; font-size: 24px;">&#10060;</span> Error: ${errorMessage}`;

        const formContainer = document.getElementById('loginForm');
        if (formContainer) {
          formContainer.appendChild(errorMessageDiv);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);

      const networkErrorMessage = document.createElement('div');
      networkErrorMessage.className = 'error-message';
      networkErrorMessage.innerHTML = `
        <span style="color: red; font-size: 24px;">&#10060;</span> Network error. Please try again later.`;

      const formContainer = document.getElementById('loginForm');
      if (formContainer) {
        formContainer.appendChild(networkErrorMessage);
      }
    }
  });
