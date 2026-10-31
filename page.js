document.querySelectorAll("[data-mail-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const phoneInput = form.querySelector('input[name="Phone"]');
    const countryCode = form.querySelector('[data-phone-country]');
    if (phoneInput && countryCode) {
      const localNumber = phoneInput.value.trim();
      if (localNumber) data.set("Phone", `${countryCode.value} ${localNumber}`);
      else data.delete("Phone");
    }
    const lines = [];
    data.forEach((value, key) => {
      if (String(value).trim()) lines.push(`${key}: ${value}`);
    });
    const subject = form.dataset.subject || "Nacre Dental enquiry";
    const href = `mailto:hello@nacredental.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    const status = form.querySelector(".form-status");
    if (status) status.textContent = "Your email app is opening with the details you entered.";
    window.location.href = href;
  });
});

document.querySelectorAll('[data-phone-country]').forEach((countryCode) => {
  const phoneInput = countryCode.closest('.phone-input').querySelector('input[type="tel"]');
  countryCode.addEventListener('change', () => {
    const selected = countryCode.selectedOptions[0];
    phoneInput.placeholder = countryCode.value === '+971' ? '50 123 4567' : 'Phone number';
  });
});

const requestedService = new URLSearchParams(window.location.search).get("service");
const serviceSelect = document.querySelector("#service");
if (requestedService && serviceSelect && [...serviceSelect.options].some((option) => option.value === requestedService)) {
  serviceSelect.value = requestedService;
}

const requestedDoctor = new URLSearchParams(window.location.search).get("doctor");
const doctorNames = { layla: "Dr. Layla Hassan", omar: "Dr. Omar Kareem", maya: "Dr. Maya Rahal", rashid: "Dr. Rashid Al Noor", sana: "Dr. Sana Mehta", tariq: "Dr. Tariq Haddad" };
const bookingForm = document.querySelector("#booking-form form");
if (requestedDoctor && doctorNames[requestedDoctor] && bookingForm) {
  const doctorField = document.createElement("input");
  doctorField.type = "hidden";
  doctorField.name = "Requested dentist";
  doctorField.value = doctorNames[requestedDoctor];
  bookingForm.append(doctorField);
  const status = bookingForm.querySelector(".form-status");
  if (status) status.textContent = `Requesting an appointment with ${doctorNames[requestedDoctor]}.`;
}
