function validateForm(form) {
  const username = form.username.value;
  const password = form.password.value;

  if (username !== "admin" || password !== "1234") {
    alert("Nombre de usuario o contraseña incorrectos");
    return false;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  form.action = "cartas/cartas.html";
  form.submit();
  return false;
}
