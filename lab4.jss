 const data = {
  name: "Emil Haciyev",
  title: "Information Security Specialist",
  profile: "Motivated Information Security student with strong interest in ethical hacking, system protection, and cybersecurity.",
  contact: {
    phone: "099-238-19-89",
    email: "Emilhaciyev@gmail.com",
    location: "Baki, Azerbaijan"
  },
  education: ["2024 - 2028, Azerbaijan Technical University, Information Security"],
  skills: ["Python (Basic)",  "C++"],
  languages: ["Azerbaijani ", "English (B2-C1)"],
  experience: [
    "CyberSecure Tech (2023 - 2024), Intern – Security Analyst",
    "CodemeinLab Academy (2022), Student Project Contributor"
  ],
  references: ["Elshen Abbasov – Senior Lecturer, AZTU – elshen.abbasov@aztu.edu.az"]
};

function renderContact() {
  const c = document.getElementById("contact-container");
  c.innerHTML = `
    <h3>Contact</h3>
    <p><img src="https://img.icons8.com/ios-filled/50/000000/phone.png" class="icon" /> ${data.contact.phone}</p>
    <p><img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" class="icon" /> ${data.contact.email}</p>
    <p><img src="https://img.icons8.com/ios-filled/50/000000/marker.png" class="icon" /> ${data.contact.location}</p>
  `;
}

function renderHeader() {
  const c = document.getElementById("header-container");
  const [firstName, ...rest] = data.name.split(" ");
  c.innerHTML = `<h2><strong>${firstName}</strong> ${rest.join(" ")}</h2><h4>${data.title}</h4>`;
}

function renderProfile() {
  document.getElementById("profile").innerHTML = `<p>${data.profile}</p>`;
}

function toggleSection(id, btn) {
  const sec = document.getElementById(id);
  const hidden = sec.style.display === "none";
  sec.style.display = hidden ? "block" : "none";
  btn.textContent = (hidden ? "[-] " : "[+] ") + btn.textContent.slice(4);
}

function renderSection(id) {
  const c = document.getElementById(id);
  c.innerHTML = "";
  c.style.display = "block";
  data[id].forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "entry";
    const span = document.createElement("span");
    span.textContent = item;
    const e = document.createElement("button");
    e.textContent = "Edit";
    e.onclick = () => {
      const v = prompt("Dəyişmək istədiyiniz mətni yazın:", item);
      if (v) {
        data[id][i] = v;
        renderSection(id);
      }
    };
    const d = document.createElement("button");
    d.textContent = "Delete";
    d.onclick = () => {
      data[id].splice(i, 1);
      renderSection(id);
    };
    div.append(span, e, d);
    c.appendChild(div);
  });
}

function addEntry(id) {
  const v = prompt("Yeni məlumat daxil et:");
  if (v) {
    data[id].push(v);
    renderSection(id);
  }
}

// --- Form funksionallığı --- //

function showError(id, msg) {
  const errorEl = document.getElementById(`error-${id}`);
  const inputEl = document.getElementById(`form-${id}`);
  errorEl.textContent = msg;
  inputEl.style.borderColor = msg ? "red" : "#ccc";
}

function validateInput() {
  const name = document.getElementById("form-name").value.trim();
  const email = document.getElementById("form-email").value.trim();
  const date = document.getElementById("form-date").value;
  const desc = document.getElementById("form-description").value.trim();

  let valid = true;
  const today = new Date().toISOString().split("T")[0];

  showError("name", name.length < 2 ? "Ad minimum 2 simvol olmalıdır." : "");
  if (name.length < 2) valid = false;

  const emailValid = /^[^\s@]+@gmail\.com$/.test(email);
  showError("email", !emailValid ? "Email '@gmail.com' formatında olmalıdır." : "");
  if (!emailValid) valid = false;

  showError("date", date === "" || date >= today ? "" : "Tarix yalnız bu gün və gələcək ola bilər.");
  if (date < today) valid = false;

  showError("description", desc.length < 10 ? "Təsvir minimum 10 simvol olmalıdır." : "");
  if (desc.length < 10) valid = false;

  return valid;
}

// real-time validation
["form-name", "form-email", "form-date", "form-description"].forEach(id => {
  document.getElementById(id).addEventListener("input", validateInput);
});

document.getElementById("cvForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const valid = validateInput();
  const status = document.getElementById("form-status");

  if (valid) {
    const formData = {
      name: document.getElementById("form-name").value.trim(),
      email: document.getElementById("form-email").value.trim(),
      date: document.getElementById("form-date").value,
      desc: document.getElementById("form-description").value.trim()
    };
    localStorage.setItem("cvFormData", JSON.stringify(formData));
    status.textContent = "Uğurla yadda saxlanıldı!";
    status.style.color = "green";
    document.getElementById("cvForm").reset();
    ["name", "email", "date", "description"].forEach(id => showError(id, ""));
  } else {
    status.textContent = "Xahiş edilir, duzgun doldurun.";
    status.style.color = "red";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("cvFormData");
  if (saved) {
    const { name, email, date, desc } = JSON.parse(saved);
    document.getElementById("form-name").value = name;
    document.getElementById("form-email").value = email;
    document.getElementById("form-date").value = date;
    document.getElementById("form-description").value = desc;
  }

  renderHeader();
  renderContact();
  renderProfile();
  ["education", "skills", "languages", "experience", "references"].forEach(renderSection);
});
