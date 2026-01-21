import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAb-_6wjv_FA2699wj5X8Fl5G16kAktTs0",
  authDomain: "church-families-93eef.firebaseapp.com",
  projectId: "church-families-93eef",
  storageBucket: "church-families-93eef.firebasestorage.app",
  messagingSenderId: "406059811621",
  appId: "1:406059811621:web:b362f7a8e2fbb2045bd0cc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("familyForm");
const membersContainer = document.getElementById("membersContainer");
const addMemberBtn = document.getElementById("addMemberBtn");
const toast = document.getElementById("successToast");

// إضافة عضو
addMemberBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "member";
  div.innerHTML = `
    <input class="memberName" placeholder="اسم العضو" required>
    <input class="memberAge" type="number" placeholder="السن">
    <select class="memberStatus">
      <option>ابن</option>
      <option>ابنة</option>
      <option>زوج</option>
      <option>زوجة</option>
      <option>فرد آخر</option>
    </select>
    <input class="memberPhone" placeholder="رقم الهاتف">
    <input class="memberFather" placeholder="أب الاعتراف">
    <input class="memberYears" type="number" placeholder="كام سنة">
    <button type="button" onclick="this.parentElement.remove()">❌ حذف</button>
  `;
  membersContainer.appendChild(div);
});

// حفظ البيانات
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const members = [...membersContainer.children].map(m => ({
      name: m.querySelector(".memberName").value,
      age: m.querySelector(".memberAge").value,
      status: m.querySelector(".memberStatus").value,
      phone: m.querySelector(".memberPhone").value,
      confessionFather: m.querySelector(".memberFather").value,
      years: m.querySelector(".memberYears").value
    }));

    const data = {
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      phone: document.getElementById("phone").value,
      confessionFather: document.getElementById("confessionFather").value,
      blessing: document.querySelector('input[name="blessing"]:checked').value,
      blessingDate: document.getElementById("blessingDate").value,
      members
    };

    // حفظ في Firebase
    await addDoc(collection(db, "families"), data);

    // إظهار رسالة النجاح
    toast.classList.add("show");

    // إخفاء الفورم
    form.style.display = "none";

    // إعادة تعيين الفورم بعد فترة قصيرة
    setTimeout(() => {
      toast.classList.remove("show");
      form.reset();
      membersContainer.innerHTML = "";
      form.style.display = "block"; // لو عايز الفورم يظهر تاني
    }, 2000);

  } catch (err) {
    alert("حصل خطأ أثناء الحفظ، تأكد من الاتصال بالإنترنت");
    console.error(err);
  }
});
