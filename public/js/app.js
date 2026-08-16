// BHA Electrical LLC - Service Request Form Handler

document.addEventListener('DOMContentLoaded', function () {
  const serviceForm = document.getElementById('serviceForm');
  const formMessage = document.getElementById('formMessage');

  serviceForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(serviceForm);
    const data = Object.fromEntries(formData);

    // Show loading message
    formMessage.textContent = 'Sending your request...';
    formMessage.className = 'form-message loading';

    try {
      const response = await fetch('/api/send-service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        formMessage.textContent = 'Thank you! Your service request has been sent. We will contact you soon.';
        formMessage.className = 'form-message success';
        serviceForm.reset();
      } else {
        formMessage.textContent = result.message || 'Error sending request. Please try again.';
        formMessage.className = 'form-message error';
      }
    } catch (error) {
      console.error('Error:', error);
      formMessage.textContent = 'Error sending request. Please check your connection and try again.';
      formMessage.className = 'form-message error';
    }

    // Clear message after 8 seconds
    setTimeout(() => {
      formMessage.className = 'form-message';
      formMessage.textContent = '';
    }, 8000);
  });
});
