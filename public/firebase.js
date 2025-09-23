import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

    // Your Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBZqJg5jwfgPNjRz_iDANfJdYjhH8mRZMQ",
      authDomain: "herdrivef1.firebaseapp.com",
      projectId: "herdrivef1",
      storageBucket: "herdrivef1.firebasestorage.app",
      messagingSenderId: "918170990871",
      appId: "1:918170990871:web:a0f4df3e90448b34cd1f52",
      measurementId: "G-59HRMKGDVT"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);