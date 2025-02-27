const diseaseOptions = {
    cardiology: ['Heart Disease', 'Hypertension', 'Arrhythmia'],
    neurology: ['Migraine', 'Epilepsy', 'Stroke'],
    orthopedics: ['Arthritis', 'Back Pain', 'Fractures'],
    pediatrics: ['Respiratory Infections', 'Growth Issues', 'Allergies'],
    dermatology: ['Acne', 'Eczema', 'Psoriasis']
};

// Form elements
const specializationSelect = document.getElementById('specialization');
const diseaseSelectContainer = document.getElementById('diseaseSelect');
const diseaseDropdown = document.getElementById('disease');
const starRating = document.getElementById('starRating');
const stars = starRating.getElementsByClassName('star');
const modal = document.getElementById('successModal');
let selectedRating = 0;

// Specialization change handler
specializationSelect.addEventListener('change', function() {
    const selectedSpecialization = this.value;
    
    if (selectedSpecialization) {
        updateDiseaseOptions(selectedSpecialization);
        diseaseSelectContainer.classList.add('visible');
    } else {
        diseaseSelectContainer.classList.remove('visible');
    }
});

// Updating disease options based on specialization
function updateDiseaseOptions(specialization) {
    diseaseDropdown.innerHTML = '<option value="">Choose Disease</option>';
    
    diseaseOptions[specialization].forEach(disease => {
        const option = document.createElement('option');
        option.value = disease.toLowerCase();
        option.textContent = disease;
        diseaseDropdown.appendChild(option);
    });
}

// Star rating functionality
Array.from(stars).forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.dataset.value;
        updateStars();
    });

    star.addEventListener('mouseover', function() {
        highlightStars(this.dataset.value);
    });
});

starRating.addEventListener('mouseout', function() {
    highlightStars(selectedRating);
});

function highlightStars(rating) {
    Array.from(stars).forEach(star => {
        star.classList.toggle('active', star.dataset.value <= rating);
    });
}

function updateStars() {
    highlightStars(selectedRating);
}

// Form submission handler
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const specialization = specializationSelect.value;
    const disease = diseaseDropdown.value;
    const suggestion = document.getElementById('suggestion').value;

    if (!specialization || !disease || !selectedRating || !suggestion.trim()) {
        alert('Please fill in all required fields and provide a rating.');
        return;
    }

    // Here you would typically send the data to your server
    const formData = {
        specialization,
        disease,
        suggestion,
        rating: selectedRating
    };

    console.log('Form Data:', formData);
    
    // Show success modal
    showModal();
    
    // Reset form
    this.reset();
    selectedRating = 0;
    updateStars();
    diseaseSelectContainer.classList.remove('visible');
});

// Modal functions
function showModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});