// Paths (adjust if you move files)
const YAML_PATH = './cv.yml';
const JSON_FALLBACK_PATH = './cv-data.json'; // optional fallback

// Load YAML file
async function loadYAML(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`YAML fetch failed: ${res.status}`);
  const text = await res.text();
  return jsyaml.load(text);
}

// Load JSON fallback
async function loadJSON(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`JSON fetch failed: ${res.status}`);
  return res.json();
}

// Convert array or string to comma-separated text
function asTextList(maybeArrayOrString) {
  if (Array.isArray(maybeArrayOrString)) return maybeArrayOrString.join(', ');
  return maybeArrayOrString || '';
}

// Update CV content
function updateCV(cv) {
  // Basic info
  document.getElementById('cv-name').textContent = cv.name || '';
  const emailEl = document.getElementById('cv-email');
  emailEl.textContent = cv.email || '';
  emailEl.href = cv.email ? `mailto:${cv.email}` : '#';
  document.getElementById('cv-phone').textContent = cv.phone || '';
  document.getElementById('cv-address').textContent = cv.address || '';
  const li = document.getElementById('cv-linkedin');
  if (li) li.href = cv.linkedin || '#';
  const gh = document.getElementById('cv-github');
  if (gh) gh.href = cv.github || '#';
  document.getElementById('cv-summary').textContent = cv.summary || '';
  document.getElementById('cv-last-updated').textContent = cv.last_updated || '';

  // Education
  const eduRoot = document.getElementById('cv-education');
  eduRoot.innerHTML = '';
  (cv.education || []).forEach(edu => {
    eduRoot.insertAdjacentHTML(
      'beforeend',
      `<div class="item">
        <div class="item-header">
          <span class="item-title">${edu.title || ''}</span>
          <span class="item-date">${edu.date || ''}</span>
        </div>
        <div class="item-subtitle">${edu.institution || ''}</div>
      </div>`
    );
  });

  // Skills
  const skillsRoot = document.getElementById('cv-skills');
  skillsRoot.innerHTML = '';
  (cv.skills || []).forEach(skill => {
    const itemsText = asTextList(skill.items);
    skillsRoot.insertAdjacentHTML(
      'beforeend',
      `<div class="skill-category">
        <h4><i class="fas fa-check-circle"></i> ${skill.category || ''}:</h4>
        <p>${itemsText}</p>
      </div>`
    );
  });

  // Experience
  const expRoot = document.getElementById('cv-experience');
  expRoot.innerHTML = '';
  (cv.professional_experience || []).forEach(exp => {
    const bullets = (exp.description || []).map(d => `<li>${d}</li>`).join('');
    expRoot.insertAdjacentHTML(
      'beforeend',
      `<div class="item">
        <div class="item-header">
          <span class="item-title">${exp.title || ''}</span>
          <span class="item-date">${exp.date || ''}</span>
        </div>
        <div class="item-subtitle">${exp.company || ''}</div>
        <div class="item-description">
          <ul>${bullets}</ul>
        </div>
      </div>`
    );
  });

  // Certifications
  const certRoot = document.getElementById('cv-certifications');
  certRoot.innerHTML = '';
  (cv.certifications || []).forEach(cert => {
    certRoot.insertAdjacentHTML(
      'beforeend',
      `<div class="item"><div class="item-title"><i class="fas fa-award"></i> ${cert}</div></div>`
    );
  });

  // Languages
  const langRoot = document.getElementById('cv-languages');
  langRoot.innerHTML = '';
  (cv.languages || []).forEach(lang => {
    langRoot.insertAdjacentHTML(
      'beforeend',
      `<div class="language-item">
        <span class="language-name">${lang.name || ''}:</span>
        <span class="language-level">${lang.level || ''}</span>
      </div>`
    );
  });
}

// Load CV data and update page
async function loadCVData() {
  try {
    const data = await loadYAML(YAML_PATH);
    updateCV(data);
  } catch (yamlErr) {
    console.warn('YAML load failed, trying JSON fallback:', yamlErr);
    try {
      const data = await loadJSON(JSON_FALLBACK_PATH);
      updateCV(data);
    } catch (jsonErr) {
      console.error('Both YAML and JSON loads failed:', jsonErr);
      updateCV({
        name: 'Sirajulhaq Wahaj',
        email: 'siraj.wahaj@outlook.com',
        phone: '+46 727 718 823',
        address: 'Malmö, Sweden',
        summary: 'Unable to load external data. Please check cv.yml or cv-data.json path.',
        last_updated: new Date().toLocaleString()
      });
    }
  }
}

// Function to download CV as PDF
// Function to download CV as PDF
function downloadCVasPDF() {
  const element = document.getElementById('cv-root');

  // PDF options for A4
  const opt = {
    margin: [10, 10, 10, 10], // top, left, bottom, right in mm
    filename: 'Sirajulhaq_Wahaj_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, logging: true, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}

// Attach button
document.getElementById('download-pdf').addEventListener('click', downloadCVasPDF);


// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadCVData();

  const downloadBtn = document.getElementById('download-pdf');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadCVasPDF);
  }
});
