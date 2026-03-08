document.getElementById("btn-login").addEventListener('click', function (e){
e.preventDefault();
  const userName = document.getElementById("userName").value;
  const pass = document.getElementById("pass").value;
  if(userName === "admin" && pass === "admin123"){
    alert("Login successful.");
    window.location.assign("../../home.html");
   // window.location.href = "../../home.html";
  }else {
    alert("Credential error, try again.")
  }
  
});

