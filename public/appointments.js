document.addEventListener('DOMContentLoaded', () => {
    const DOCTORS = [
      { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist" },
      { id: 2, name: "Dr. Michael Chen", specialty: "Orthopedist" },
      { id: 3, name: "Dr. Emily Brown", specialty: "Neurologist" },
      { id: 4, name: "Dr. David Wilson", specialty: "Pediatrician" },
      { id: 5, name: "Dr. Lisa Martinez", specialty: "Dermatologist" },
      { id: 6, name: "Dr. James Taylor", specialty: "Psychiatrist" }
    ];
  
    const specialtyGrid = document.getElementById('specialty-grid');
    const doctorGrid = document.getElementById('doctor-grid');
    const dateGrid = document.getElementById('date-grid');
    const slotGrid = document.getElementById('slot-grid');
    const bookingSection = document.getElementById('booking-section');
    const bookingStatus = document.getElementById('booking-status');
    const bookBtn = document.getElementById('book-btn');
  
    let selectedSpecialty = '';
    let selectedDoctor = null;
    let selectedDate = '';
    let selectedSlot = '';
    let availableSlots = [];
  
    const specialties = [...new Set(DOCTORS.map(doctor => doctor.specialty))];
    
    specialties.forEach(specialty => {
      const button = document.createElement('button');
      button.textContent = specialty;
      button.addEventListener('click', () => selectSpecialty(specialty));
      specialtyGrid.appendChild(button);
    });
    
    function renderSpecialties() {
      specialtyGrid.innerHTML = '';
      specialtyGrid.classList.add('grid'); 
      specialties.forEach(specialty => {
          const button = document.createElement('button');
          button.textContent = specialty;
          button.addEventListener('click', () => selectSpecialty(specialty));
          specialtyGrid.appendChild(button);
      });
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      renderSpecialties();
    });
    
  
    function selectSpecialty(specialty) {
      selectedSpecialty = specialty;
      selectedDoctor = null;
      selectedDate = '';
      selectedSlot = '';
      availableSlots = [];
      bookingStatus.textContent = '';
      bookingSection.style.display = 'none';
  
      document.querySelectorAll('#specialty-grid button').forEach(btn => btn.classList.remove('selected'));
      document.querySelectorAll('#specialty-grid button').forEach(btn => {
        if (btn.textContent === specialty) {
          btn.classList.add('selected');
        }
      });
      
  
      renderDoctors();
    }
  
    function renderDoctors() {
      doctorGrid.innerHTML = '';
      const filteredDoctors = DOCTORS.filter(doctor => doctor.specialty === selectedSpecialty);
      filteredDoctors.forEach(doctor => {
        const button = document.createElement('button');
        button.textContent = doctor.name;
        button.addEventListener('click', () => selectDoctor(doctor));
        doctorGrid.appendChild(button);
      });
      document.getElementById('doctor-card').style.display = 'block';
    }
  
    function selectDoctor(doctor) {
      selectedDoctor = doctor;
      selectedDate = '';
      selectedSlot = '';
      availableSlots = [];
      bookingStatus.textContent = '';
      bookingSection.style.display = 'none';
  
      document.querySelectorAll('#doctor-grid button').forEach(btn => btn.classList.remove('selected'));
      document.querySelectorAll('#doctor-grid button').forEach(btn => {
        if (btn.textContent === doctor.name) {
          btn.classList.add('selected');
        }
      });
  
      renderDates();
    }
  
    function renderDates() {
      document.getElementById('date-card').style.display = 'block';
      const datePicker = document.getElementById('date-picker');
      datePicker.value = ''; 
      
      
      const today = new Date();
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 7);
      
      datePicker.min = today.toISOString().split('T')[0];
      datePicker.max = maxDate.toISOString().split('T')[0];
  
      datePicker.addEventListener('change', (event) => {
          selectDate(event.target.value);
      });
  }
  
  function selectDate(date) {
      selectedDate = date;
      selectedSlot = '';
      availableSlots = generateRandomSlots();
      bookingStatus.textContent = '';
      bookingSection.style.display = 'none';
  
      renderSlots();
  }
  
  
    function renderSlots() {
      slotGrid.innerHTML = '';
      availableSlots.forEach(slot => {
        const button = document.createElement('button');
        button.textContent = slot;
        button.addEventListener('click', () => selectSlot(slot));
        slotGrid.appendChild(button);
      });
      document.getElementById('slot-card').style.display = 'block';
    }
  
    function selectSlot(slot) {
      selectedSlot = slot;
      bookingStatus.textContent = '';
  
      document.querySelectorAll('#slot-grid button').forEach(btn => btn.classList.remove('selected'));
      document.querySelectorAll('#slot-grid button').forEach(btn => {
        if (btn.textContent === slot) {
          btn.classList.add('selected');
        }
      });
  
      bookingSection.style.display = 'block';
    }
  
    function generateRandomSlots() {
      const slots = [];
      const startHour = 9;
      const endHour = 17;
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute of ['00', '30']) {
          if (Math.random() < 0.7) {
            slots.push(`${hour}:${minute}`);
          }
        }
      }
      return slots;
    }
  
    bookBtn.addEventListener('click', handleBooking);
  
    function handleBooking() {
      if (selectedDoctor && selectedDate && selectedSlot) {
        const success = Math.random() < 0.9;
        if (success) {
          bookingStatus.textContent = 'Appointment booked successfully!';
          bookingStatus.classList.add('success');
          availableSlots = availableSlots.filter(slot => slot !== selectedSlot);
          renderSlots();
        } else {
          bookingStatus.textContent = 'Booking failed. Please try again.';
          bookingStatus.classList.add('error');
        }
      }
    }
  });
  