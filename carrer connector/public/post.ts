document.addEventListener('DOMContentLoaded', () => {
  // Attach event listener to the post form submission
  document
    .getElementById('postForm')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        alert('You must be logged in to create a post.');
        window.location.href = 'login.html';
        return;
      }

      function decodeJWT(token: string) {
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
      }

      try {
        const decodedToken = decodeJWT(accessToken);
        console.log(decodedToken);
        const userId = decodedToken.id;
        console.log(userId);

        if (!userId) {
          return;
        }

        const profession = (
          document.getElementById('Profession') as HTMLInputElement
        ).value;
        const experienceRange = (
          document.getElementById('experiance') as HTMLInputElement
        ).value;
        const phone_number = (
          document.getElementById('phoneNumber') as HTMLInputElement
        ).value;
        const cv = (document.getElementById('cv') as HTMLInputElement).value;
        const description = (
          document.getElementById('message') as HTMLTextAreaElement
        ).value;
        const wantedSalary = (
          document.getElementById('pay') as HTMLInputElement
        ).value;

        const gender = (
          document.querySelector(
            'input[name="gender"]:checked',
          ) as HTMLInputElement
        )?.value;

        if (
          !profession ||
          !experienceRange ||
          !phone_number ||
          !cv ||
          !description ||
          !wantedSalary ||
          !gender
        ) {
          alert('Please fill in all fields.');
          return;
        }

        const postData = {
          profession,
          experienceRange,
          phone_number,
          cv,
          description,
          wantedSalary,
          gender,
          userId,
        };

        const response = await fetch(
          `http://localhost:3000/api/post/create/${userId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(postData),
          },
        );

        if (response.ok) {
          const data = await response.json();
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = `
          <span style="color: green; font-size: 24px;">&#10003;</span> post successful!`;

          const formContainer = document.getElementById('postForm');
          if (formContainer) {
            formContainer.appendChild(successMessage);
          }
          window.location.href = 'postView.html';
        } else {
          const errorMessage = await response.text();
        }
      } catch (error) {
        console.error('Error during post creation:', error);
      }
    });
});
