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

export function enforceSecurity() {
    const username = localStorage.getItem('username');
    const currentPath = window.location.pathname;

    // 1. منع دخول غير المسجلين لغير صفحة تسجيل الدخول
    if (!username && !currentPath.includes('/login') && !currentPath.includes('/error')) {
        window.location.replace('/login');
        return;
    }

    // 2. منع المسجل من العودة لصفحة تسجيل الدخول (لتغيير اسمه)
    if (username && currentPath.includes('/login')) {
        window.location.replace('/question');
        return;
    }

    // 3. فحص الحظر الصارم (يطرد المستخدم فوراً)
    if (username) {
        const banRef = ref(db, 'banned/' + username);
        onValue(banRef, (snapshot) => {
            if (snapshot.exists() && snapshot.val() === true) {
                // تدمير واجهة الموقع بالكامل واستبدالها بشاشة الحظر
                document.body.innerHTML = `
                    <div class="banned-overlay">
                        <div class="banned-card">
                            <div class="ban-icon">⚠️</div>
                            <h1>تم حظرك يا ${username}</h1>
                            <p>لقد قمت بانتهاك سياسات المنصة.</p>
                            <p>للاستفسار أو طلب رفع الحظر، تواصل معنا عبر فيسبوك.</p>
                            <a href="https://www.facebook.com/profile.php?id=61584178882412&locale=ar_AR" target="_blank" class="fb-btn">
                                تواصل مع الإدارة
                            </a>
                        </div>
                    </div>
                `;
                // إيقاف أي سكربتات أخرى
                window.stop(); 
            }
        });
    }
}

export { db, storage, ref, push, set, onValue, query, orderByChild, equalTo, update, storageRef, uploadBytes, getDownloadURL };
