import isEmail from "validator/lib/isEmail";

const username = document.querySelector(".username") as HTMLInputElement;
const email = document.querySelector(".email") as HTMLInputElement;
const password = document.querySelector(".password") as HTMLInputElement;
const confirmPassword = document.querySelector(
  ".password2"
) as HTMLInputElement;
const form = document.querySelector(".form") as HTMLFormElement;

form.addEventListener("submit", function (event: Event) {
  event.preventDefault();

  hideErrorMessages(this);
  checkFieldsIsEmpty(username, email, password, confirmPassword);
  checkUsername(username);
  checkEmailIsValid(email);
  checkEqualPassword(password, confirmPassword);

  if (sendForm()) {
    window.location.href = "/dist/formSucces.html";
  }

});

function checkFieldsIsEmpty(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value) {
      showErrorMessage(input, "Campo não pode ser vazio");
    }
  });
}

function checkUsername(input: HTMLInputElement): void {
  if (input.value.length < 3) {
    showErrorMessage(input, "Usuário deve ter 3 ou mais caracteres");
  }
}

function checkEmailIsValid(input: HTMLInputElement): void {
  if (!isEmail(input.value)) {
    showErrorMessage(input, "Email Inválido");
  }
}

function checkEqualPassword(
  password: HTMLInputElement,
  confirmPassword: HTMLInputElement
): void {
  if (password.value !== confirmPassword.value) {
    showErrorMessage(password, "Senhas devem ser iguais");
    showErrorMessage(confirmPassword, "Senhas devem ser iguais");
  }
}

function hideErrorMessages(form: HTMLFormElement) {
  const formError = form.querySelectorAll(".form-fields");
  formError.forEach((err) => err.classList.remove("show-error-message"));
}

function showErrorMessage(input: HTMLInputElement, msg: string): void {
  const formFields = input.parentNode as HTMLDivElement;
  const errorMessage = formFields.querySelector(
    ".error-message"
  ) as HTMLSpanElement;

  errorMessage.innerHTML = msg;
  formFields.classList.add("show-error-message");
}

function sendForm(): boolean {
  let send = true;

  const formError = form.querySelectorAll(".form-fields");
  formError.forEach((field) => {
    if (field.classList.contains("show-error-message")) {
      send = false;
    }
  });

  return send;
}
