window.onload = () => {
  alert("👋 Welcome! Please fill the registration form.");
  loadMembers();
};

document.getElementById("registerBtn").addEventListener("click", validateForm);
document.getElementById("themeBtn").addEventListener("click", changeTheme);
document.getElementById("clearBtn").addEventListener("click", clearMembers);
document.getElementById("clickBtn").addEventListener("click", () => {
  document.querySelector(".members-section").style.background = "#e0f7fa";
  document.querySelector(".members-section h3").textContent = "💡 Section Changed!";
});

function validateForm() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let dept = document.getElementById("department").value;
  let year = document.getElementById("year").value;
  let project = document.getElementById("project").value.trim();

  if (!name || !email || !dept || !year || !project) {
    showToast("⚠ Please fill all fields", "error");
    return;
  }

  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  if (!emailPattern.test(email)) {
    showToast("⚠ Invalid email format", "error");
    return;
  }

  addMember(name, email, dept, year, project);
  showToast("✅ Registration Successful!", "success");
  document.getElementById("regForm").reset();
}

function addMember(name, email, dept, year, project) {
  let list = document.getElementById("memberList");
  let li = document.createElement("li");
  li.innerHTML = `<strong>${name}</strong> - ${dept}, ${year} <br>📧 ${email} <br>📌 ${project}`;
  list.appendChild(li);

  saveMember({ name, email, dept, year, project });
}

function saveMember(member) {
  let members = JSON.parse(localStorage.getItem("members")) || [];
  members.push(member);
  localStorage.setItem("members", JSON.stringify(members));
}

function loadMembers() {
  let members = JSON.parse(localStorage.getItem("members")) || [];
  let list = document.getElementById("memberList");
  list.innerHTML = "";
  members.forEach(m => {
    let li = document.createElement("li");
    li.innerHTML = `<strong>${m.name}</strong> - ${m.dept}, ${m.year} <br>📧 ${m.email} <br>📌 ${m.project}`;
    list.appendChild(li);
  });
}

function clearMembers() {
  if (confirm("Are you sure you want to clear all members?")) {
    localStorage.removeItem("members");
    document.getElementById("memberList").innerHTML = "";
    showToast("🗑 All members cleared", "success");
  }
}

function changeTheme() {
  let themes = [
    ["#4CAF50", "#ff9800"],
    ["#3f51b5", "#ff4081"],
    ["#009688", "#ffc107"],
    ["#e91e63", "#00bcd4"],
    ["#9c27b0", "#8bc34a"]
  ];
  let randomTheme = themes[Math.floor(Math.random() * themes.length)];
  document.documentElement.style.setProperty('--primary', randomTheme[0]);
  document.documentElement.style.setProperty('--secondary', randomTheme[1]);
  showToast("🎨 Theme changed!", "success");
}

function showToast(message, type) {
  let toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => { toast.classList.add("show"); }, 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => { toast.remove(); }, 300);
  }, 2500);
}
