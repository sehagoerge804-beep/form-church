import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* Firebase */
const firebaseConfig = {
  apiKey: "AIzaSyAb-_6wjv_FA2699wj5X8Fl5G16kAktTs0",
  authDomain: "church-families-93eef.firebaseapp.com",
  projectId: "church-families-93eef"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* DOM */
const form = document.getElementById("familyForm");
const resultBox = document.getElementById("resultBox");
const editBtn = document.getElementById("editResponseBtn");
const membersContainer = document.getElementById("membersContainer");
const addMemberBtn = document.getElementById("addMemberBtn");

const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const phoneInput = document.getElementById("phone");
const regionInput = document.getElementById("region");
const confessionFatherInput = document.getElementById("confessionFather");

let savedData = null;

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
form.onsubmit = async (e) => {
  e.preventDefault();

  const members = [...membersContainer.children].map(m => ({
    name: m.querySelector(".mName").value,
    age: m.querySelector(".mAge").value,
    status: m.querySelector(".mStatus").value,
    phone: m.querySelector(".mPhone").value,
    confessionFather: m.querySelector(".mFather").value
  }));

  savedData = {
    name: nameInput.value,
    address: addressInput.value,
    phone: phoneInput.value,
    region: regionInput.value,
    confessionFather: confessionFatherInput.value,
    members
  };

  /* حفظ على Firebase */
  try {
    await addDoc(collection(db,"families"), savedData);
  } catch(err) {
    console.error("Error saving to Firebase:", err);
  }

  form.style.display = "none";
  resultBox.style.display = "block";
};

/* تعديل الرد */
editBtn.onclick = () => {
  resultBox.style.display = "none";
  form.style.display = "block";

  nameInput.value = savedData.name;
  addressInput.value = savedData.address;
  phoneInput.value = savedData.phone;
  regionInput.value = savedData.region;
  confessionFatherInput.value = savedData.confessionFather;

  membersContainer.innerHTML = "";
  savedData.members.forEach(m => {
    addMemberBtn.click();
    const last = membersContainer.lastElementChild;
    last.querySelector(".mName").value = m.name;
    last.querySelector(".mAge").value = m.age;
    last.querySelector(".mStatus").value = m.status;
    last.querySelector(".mPhone").value = m.phone;
    last.querySelector(".mFather").value = m.confessionFather;
  });
};
