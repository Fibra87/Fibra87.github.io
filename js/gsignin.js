function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential)
    console.log(response);
    console.log(data);
    
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