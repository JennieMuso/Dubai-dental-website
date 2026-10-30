const doctors = {
  layla: { name: "Dr. Layla Hassan", specialty: "General Dentist", position: "0%", color: "#efc4a4", summary: "Gentle, prevention-led dentistry with a focus on clear explanations and long-term oral health.", approach: "Every appointment begins with listening, a careful examination and a plan that makes the available options easy to compare.", focus: ["Preventive care", "Dental check-ups", "Restorative dentistry"] },
  omar: { name: "Dr. Omar Kareem", specialty: "Implant Dentist", position: "33.33%", color: "#9b4325", summary: "Restorative and implant care planned around function, comfort and a natural-looking result.", approach: "Digital imaging and careful diagnosis guide each stage, from the first consultation through restoration and review.", focus: ["Dental implants", "Restorative care", "Digital planning"] },
  maya: { name: "Dr. Maya Rahal", specialty: "Cosmetic Dentist", position: "66.66%", color: "#f3d47d", summary: "Conservative cosmetic dentistry that respects facial balance, tooth structure and the way you naturally smile.", approach: "Goals, shade, proportion and bite are considered together before any cosmetic treatment is recommended.", focus: ["Smile design", "Teeth whitening", "Composite bonding"] },
  rashid: { name: "Dr. Rashid Al Noor", specialty: "Orthodontist", position: "100%", color: "#bdd2f4", summary: "Clear, practical orthodontic planning for adults and teens using modern digital tools.", approach: "Treatment is mapped as a sequence, with progress reviews and clear guidance for keeping teeth healthy throughout alignment.", focus: ["Invisalign", "Adult orthodontics", "Teen orthodontics"] }
};
const key = new URLSearchParams(window.location.search).get("doctor") || "layla";
const doctor = doctors[key] || doctors.layla;
document.title = `${doctor.name} — Nacre Dental`;
document.querySelector("#doctor-name").textContent = doctor.name;
document.querySelector("#doctor-specialty").textContent = doctor.specialty;
document.querySelector("#doctor-summary").textContent = doctor.summary;
document.querySelector("#doctor-approach").textContent = doctor.approach;
document.querySelector("#doctor-portrait").style.backgroundPosition = `${doctor.position} 25%`;
document.querySelector("#doctor-portrait").style.borderColor = doctor.color;
document.querySelector("#doctor-portrait").setAttribute("aria-label", doctor.name);
document.querySelector("#doctor-focus").innerHTML = doctor.focus.map((item) => `<span>${item}</span>`).join("");
const bookingUrl = `booking.html?doctor=${encodeURIComponent(key)}`;
document.querySelector("#doctor-book").href = bookingUrl;
document.querySelector("#doctor-contact").href = bookingUrl;
