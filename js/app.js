const cvData = {
  name: "Sirajulhaq Wahaj",
  email: "siraj.wahaj@outlook.com",
  phone: "+46 727 718 823",
  address: "Professorsgatan 8B, 215 53 Malmö, Sweden",
  linkedin: "https://linkedin.com/in/sirajwahaj",
  github: "https://github.com/sirajwahaj",
  lastUpdated: new Date().toLocaleDateString(),
  summary: "Motivated DevOps and Data Science enthusiast with hands-on experience in cloud deployment, CI/CD, and Python programming.",
  education: [
    { degree: "Master's in Data Science", school: "Malmö University", date: "2023 - Present" },
    { degree: "Bachelor's in Computer Science", school: "University XYZ", date: "2019 - 2023" }
  ],
  skills: [
    { category: "Programming", items: ["Python", "Java", "Flask"] },
    { category: "DevOps Tools", items: ["Docker", "Git", "Linux"] },
    { category: "Networking", items: ["TCP/IP", "DNS", "HTTP"] }
  ],
  experience: [
    { title: "DevOps Trainee", company: "Company XYZ", date: "2024 - Present", description: ["Implemented CI/CD pipelines using GitHub Actions", "Automated deployment scripts using Python and Bash"] },
    { title: "Data Science Intern", company: "Company ABC", date: "2023", description: ["Analyzed datasets using Python", "Built predictive models for business insights"] }
  ],
  certifications: ["AWS Certified Solutions Architect", "Docker Certified Associate", "Python Advanced Certification"],
  languages: [{ name: "English", level: "Fluent" }, { name: "Pashto", level: "Native" }]
};

function fillCV() {
  document.getElementById("cv-name").textContent = cvData.name;
  document.getElementById("cv-email").textContent = cvData.email;
  document.getElementById("cv-email").href = "mailto:" + cvData.email;
  document.getElementById("cv-phone").textContent = cvData.phone;
  document.getElementById("cv-address").textContent = cvData.address;
  document.getElementById("cv-linkedin").href = cvData.linkedin;
  document.getElementById("cv-linkedin").textContent = cvData.linkedin.replace("https://", "");
  document.getElementById("cv-github").href = cvData.github;
  document.getElementById("cv-github").textContent = cvData.github.replace("https://", "");
  document.getElementById("cv-summary").textContent = cvData.summary;
  document.getElementById("cv-last-updated").textContent = cvData.lastUpdated;

  // Education
  const eduContainer = document.getElementById("cv-education");
  cvData.education.forEach(edu => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `<div class="item-header"><span class="item-title">${edu.degree}</span><span class="item-date">${edu.date}</span></div><div class="item-subtitle">${edu.school}</div>`;
    eduContainer.appendChild(div);
  });

  // Skills
  const skillsContainer = document.getElementById("cv-skills");
  cvData.skills.forEach(skill => {
    const div = document.createElement("div");
    div.classList.add("skill-category");
    div.innerHTML = `<h4><i class="fas fa-star"></i>${skill.category}</h4><p>${skill.items.join(", ")}</p>`;
    skillsContainer.appendChild(div);
  });

  // Experience
  const expContainer = document.getElementById("cv-experience");
  cvData.experience.forEach(exp => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `<div class="item-header"><span class="item-title">${exp.title}</span><span class="item-date">${exp.date}</span></div><div class="item-subtitle">${exp.company}</div><div class="item-description"><ul>${exp.description.map(d => `<li>${d}</li>`).join("")}</ul></div>`;
    expContainer.appendChild(div);
  });

  // Certifications
  const certContainer = document.getElementById("cv-certifications");
  cvData.certifications.forEach(cert => {
    const div = document.createElement("div");
    div.classList.add("badge");
    div.textContent = cert;
    certContainer.appendChild(div);
  });

  // Languages
  const langContainer = document.getElementById("cv-languages");
  cvData.languages.forEach(lang => {
    const div = document.createElement("div");
    div.classList.add("language-item");
    div.innerHTML = `<span class="language-name">${lang.name}</span> <span class="language-level">${lang.level}</span>`;
    langContainer.appendChild(div);
  });
}

fillCV();

// PDF download
document.getElementById("download-pdf").addEventListener("click", () => {
  const element = document.querySelector(".cv-container");
  const opt = {
    margin: 0.3,
    filename: "Sirajulhaq_Wahaj_CV.pdf",
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});
