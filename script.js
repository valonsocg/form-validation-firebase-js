const firebaseConfig = {
  apiKey: "AIzaSyAo1DGT76WxpXE9PBRnAhh8nW0DzUBTupw",
  authDomain: "formulario-datos-edfd1.firebaseapp.com",
  projectId: "formulario-datos-edfd1",
  storageBucket: "formulario-datos-edfd1.appspot.com",
  messagingSenderId: "271868588562",
  appId: "1:271868588562:web:083185b46f6da4240c1ecb",
  measurementId: "G-WC1JH6PPBF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  //validar campo nombre
  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");

  if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "Porfavor, escribir su numbre";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  //validar correo electronico

  let entradaEmail = document.getElementById("email");
  let errorEmail = document.getElementById("emailError");
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(entradaEmail.value)) {
    errorEmail.textContent = "Porfavor introducir un email valido";
    errorEmail.classList.add("error-message");
  } else {
    errorEmail.textContent = "";
    errorEmail.classList.remove("error-message");
  }

  //validar contrasena

  let entradaContrasena = document.getElementById("password");
  let errorContrasena = document.getElementById("passwordError");

  if (entradaContrasena.value.length < 8) {
    errorContrasena.textContent =
      "Porfavor, escribir una contraseña de al menos 8 caracteres";
    errorContrasena.classList.add("error-message");
  } else {
    errorContrasena.textContent = "";
    errorContrasena.classList.remove("error-message");
  }

  //si todos los campos son validos

  if (
    !errorNombre.textContent &&
    !errorContrasena.textContent &&
    !errorEmail.textContent
  ) {
    //enviar info a backend

    db.collection("users")
      .add({
        nombre: entradaNombre.value,
        email: entradaEmail.value,
        contrasena: entradaContrasena.value,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    alert("El formulario se ha enviado con exito");
    document.getElementById("formulario").reset();
  }
});
