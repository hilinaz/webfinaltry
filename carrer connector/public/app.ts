// Attach event listener to the form submission
document
  .getElementById('signupForm')
  ?.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents default form submission

    // Get the values of the form fields
    const fullname = (document.getElementById('fullName') as HTMLInputElement)
      .value;
    const username = (document.getElementById('username') as HTMLInputElement)
      .value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;

    // Create the user data object
    const user = {
      fullname,
      username,
      email,
      password,
    };

    try {
      // Send the data to the backend via POST request
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Sending the user data as JSON
      });

      // Handle response from the server
      if (response.ok) {
       const successMessage = document.createElement('div');
       successMessage.className = 'success-message';
       successMessage.innerHTML = `
          <span style="color: green; font-size: 24px;">&#10003;</span> Login successful!`;

       const formContainer = document.getElementById('signupForm');
       if (formContainer) {
         formContainer.appendChild(successMessage);
       }
        // Optionally redirect to another page, like login page
        window.location.href = 'login.html';
      } else {
        const errorMessage = await response.text();
        console.log('Error: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    
    }
  });
