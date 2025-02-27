emailjs.init('hYQw3WrxHepHNIlko'); //EmailJS user ID

const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const buttonsContainer = document.querySelector('.carousel-buttons');
let currentIndex = 0;


items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    buttonsContainer.appendChild(dot);
});

function goToSlide(index) {
    currentIndex = index;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;


    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}


document.querySelector('.carousel-arrow.left').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    goToSlide(currentIndex);
});
document.querySelector('.carousel-arrow.right').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    goToSlide(currentIndex);
});


let autoAdvance = setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    goToSlide(currentIndex);
}, 5000);


carousel.addEventListener('mouseenter', () => {
    clearInterval(autoAdvance);
});

carousel.addEventListener('mouseleave', () => {
    autoAdvance = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }, 5000);
});

const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        //'MY_SERVICE_ID' and 'MY_TEMPLATE_ID' 
        await emailjs.sendForm('service_ofnnnbo', 'template_upb974c', contactForm);

        contactForm.reset();
        successMessage.classList.add('show');
        errorMessage.classList.remove('show');
        setTimeout(() => successMessage.classList.remove('show'), 5000);
    } catch (error) {
        console.error('Error sending email:', error);
        errorMessage.textContent = `Failed to send message: ${error.text}`;
        errorMessage.classList.add('show');
        successMessage.classList.remove('show');
        setTimeout(() => errorMessage.classList.remove('show'), 5000);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send';
    }
});

const feedbackForm = document.getElementById('feedback-form');
const feedbackSuccessMessage = document.getElementById('feedbackSuccessMessage');
const feedbackErrorMessage = document.getElementById('feedbackErrorMessage');

feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = feedbackForm.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
        await emailjs.sendForm('service_ofnnnbo', 'template_upb974c', feedbackForm);

        feedbackForm.reset();
        feedbackSuccessMessage.classList.add('show');
        feedbackErrorMessage.classList.remove('show');
        setTimeout(() => feedbackSuccessMessage.classList.remove('show'), 5000);
    } catch (error) {
        console.error('Error sending feedback:', error);
        feedbackErrorMessage.textContent = `Failed to send feedback: ${error.text}`;
        feedbackErrorMessage.classList.add('show');
        feedbackSuccessMessage.classList.remove('show');
        setTimeout(() => feedbackErrorMessage.classList.remove('show'), 5000);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Feedback';
    }
});
