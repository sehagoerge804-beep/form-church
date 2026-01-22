const form = document.getElementById("familyForm");
const resultBox = document.getElementById("resultBox");
const editBtn = document.getElementById("editResponseBtn");
const membersContainer = document.getElementById("membersContainer");
const addMemberBtn = document.getElementById("addMemberBtn");

const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const confessionFatherInput = document.getElementById("confessionFather");

/* إضافة عضو */
addMemberBtn.onclick = () => {
  const div = document.createElement("div");
  div.className = "member";
  div.innerHTML = `
    <input class="mName" placeholder="الاسم">
    <input class="mAge" type="number" placeholder="السن">
    <input class="mStatus" placeholder="الحالة (ابن / زوجة)">
    <input class="mPhone" placeholder="رقم الهاتف">
    <input class="mFather" placeholder="أب الاعتراف">
    <button type="button">حذف</button>
  `;
  div.querySelector("button").onclick = () => div.remove();
  membersContainer.appendChild(div);
};

/* حفظ البيانات */
form.onsubmit = (e) => {
  e.preventDefault();

  if (!emailInput.value.endsWith("@gmail.com")) {
    alert("من فضلك اكتب Gmail صحيح");
    return;
  }

  const members = [...membersContainer.children].map(m => ({
    name: m.querySelector(".mName").value,
    age: m.querySelector(".mAge").value,
    status: m.querySelector(".mStatus").value,
    phone: m.querySelector(".mPhone").value,
    confessionFather: m.querySelector(".mFather").value
  }));

  const savedData = {
    name: nameInput.value,
    address: addressInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    confessionFather: confessionFatherInput.value,
    members
  };

  localStorage.setItem("churchForm", JSON.stringify(savedData));

  form.style.display = "none";
  resultBox.style.display = "block";
};

/* تعديل الرد */
editBtn.onclick = () => {
  const data = JSON.parse(localStorage.getItem("churchForm"));
  if (!data) return;

  nameInput.value = data.name;
  addressInput.value = data.address;
  phoneInput.value = data.phone;
  emailInput.value = data.email;
  confessionFatherInput.value = data.confessionFather;

  membersContainer.innerHTML = "";
  data.members.forEach(m => {
    addMemberBtn.click();
    const last = membersContainer.lastElementChild;
    last.querySelector(".mName").value = m.name;
    last.querySelector(".mAge").value = m.age;
    last.querySelector(".mStatus").value = m.status;
    last.querySelector(".mPhone").value = m.phone;
    last.querySelector(".mFather").value = m.confessionFather;
  });

  resultBox.style.display = "none";
  form.style.display = "block";
};
