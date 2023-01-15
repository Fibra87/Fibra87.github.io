function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential)
    console.log(data);
    if (data.email_verified === true){
        let email = data.email
        localStorage.setItem("usuario", email) 
        //seteo en localStorage id ficticio obtenido desde el servidor por el Usuario logueado
        localStorage.setItem("IDusuario", 25801 )
        window.location.href = "inicio.html";
    }

    //console.log("Encoded JWT ID token: " + response.credential);
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "504424347310-n8gvg7gjgcos1jhsr5851fjrslfim91n.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }