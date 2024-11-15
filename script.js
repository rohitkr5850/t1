const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("message");
  
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const snapshot = await firebase.database().ref("users").get();
      const users = snapshot.val();
  
      let authenticated = false;
  
      for (let key in users) {
        if (users[key].username === username && users[key].password === password) {
          authenticated = true;
          break;
        }
      }
  
      if (authenticated) {
        message.textContent = "Login successful!";
        message.style.color = "green";
        // Redirect to dashboard (if required)
        window.location.href = "dashboard.html";
      } else {
        message.textContent = "Invalid credentials";
        message.style.color = "red";
      }
    } catch (error) {
      console.error("Error:", error);
      message.textContent = "An error occurred. Please try again.";
      message.style.color = "red";
    }
  });