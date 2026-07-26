import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, query, orderByChild, equalTo, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWTSFTecq2_QeDyg90mM1hPNytwPXYyZ0",
  authDomain: "admin-37e09.firebaseapp.com",
  databaseURL: "https://admin-37e09-default-rtdb.firebaseio.com",
  projectId: "admin-37e09",
  storageBucket: "admin-37e09.firebasestorage.app",
  messagingSenderId: "637953105703",
  appId: "1:637953105703:web:db22cf323186b157de5302",
  measurementId: "G-GQDLTK8FY6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

// دالة فحص الحظر (تعمل في كل صفحة)
export function checkBanStatus() {
    const username = localStorage.getItem('username');
    if (!username && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
        return;
    }
    
    if (username) {
        const banRef = ref(db, 'banned/' + username);
        onValue(banRef, (snapshot) => {
            if (snapshot.exists() && snapshot.val() === true) {
                document.body.innerHTML = `
                    <div class="banned-screen">
                        <h1>تم حظرك يا ${username} لتعدي سياسات الموقع</h1>
                        <p>لفتح الموقع والاستفسار اذهب الي صفحة الفيس بوك</p>
                        <a href="https://www.facebook.com/profile.php?id=61584178882412&locale=ar_AR" target="_blank">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="80">
                        </a>
                    </div>
                `;
            }
        });
    }
}

export { db, storage, ref, push, set, onValue, query, orderByChild, equalTo, update, storageRef, uploadBytes, getDownloadURL };
