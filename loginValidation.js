/**
 * getting all required elements
 */

const email = document.getElementById("getEm");
const phNum = document.getElementById("getPh");
const nam = document.getElementById("getNam");
const psw = document.getElementById("getPsw");
const er = document.getElementsByClassName("has-error");
const remem = document.getElementById("rememberMe");

/*
 *  Cookies storing for dark and light mode
 */
let cookiesDarkOff = "img=./assests/community_hands.png;    color=#fff";
let cookiesDarkOn = "img=./assests/community_img.jpeg; color=#eee";

/**
 *  Regular Expression
 */
const contnum = /^\d*$/;
const regname = /^\D*$/;
const regex1 = /^([a-z0-9\.-]+)@(trendz+)\.([a-z]{1,8})$/;
const regex2 = /^([a-z0-9\.-]+)@(trend+)\.([a-z]{1,8})(.[a-z]{1,8})$/;
const regtendigit = /^\d{10}$/;
const regpsw = /^([a-zA-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-\[\]\{\}<>`+_;:\=])(?=.*?[a-zA-z0-9]).{6,}$/;

/**
 * Email verification, error display in span
 */
email.onkeydown = () => {
  if (regex1.test(email.value) || regex2.test(email.value)) {
    er[2].innerText = "Your Email is Valid";
    er[2].style.color = "lime";
  } else {
    er[2].innerText = "Invalid Email Id";
    er[2].style.color = "red";
  }
};

/**
 * Email verification, error display in span
 */
nam.onkeydown = () => {

  if (nam.value.search(regname) == 0 && nam.value != "") {
    er[0].innerText = "valid name";
    er[0].style.color = "lime";
  } else {
    er[0].innerText = "invalid name";
    er[0].style.color = "red";
  }
};

/**
 * Email verification, error display in span
 */
phNum.onkeydown = () => {
  if (regtendigit.test(phNum.value)) {
    er[1].innerText = "valid phone number";
    er[1].style.color = "lime";
  } else {
    er[1].innerText = "invalid phone number";
    er[1].style.color = "red";
  }
};

/**
 * Email verification, error display in span
 */
psw.onkeydown = () => {
  if (regpsw.test(psw.value)) {
    er[3].innerText = "valid password";
    er[3].style.color = "lime";
  } else {
    er[3].innerText = "invalid password";
    er[3].style.color = "red";
  }
};

/**
 * change the image and background color using toggle switch
 */
function changeToDark() {
  let imgSrc = "./assests/community_hands.png";
  let bgcl = "#eee";
  img = document.getElementById("leftImg");
  dark_mode = document.getElementById("dark");

  /**
   *  adding Cookies based on the toggle switch
   */

  if (dark_mode.checked) {
    document.cookies = cookiesDarkOn;
  } else {
    document.cookies = cookiesDarkOff;
  }
  /**
   * Read the cokkie
   */
  imgSrc = document.cookies.split(";")[0].split("=")[1];
  bgcl = document.cookies.split(";")[1].split("=")[1];

  document.body.style.backgroundColor = bgcl;
  img.src = imgSrc;
}

/**
 * validate all the fields when submit is pressed and store the validated data into sessions or Local data based on remenber
 */

function valAll() {
  console.log("validating all the fiels");
  if (!(nam.value.search(regname) == 0 && nam.value != "")) {
    alert("Invalid user name");
  } else {
    if (!regtendigit.test(phNum.value)) {
      alert("Invalid phone number");
    } else {
      if (!(regex1.test(email.value) || regex2.test(email.value))) {
        alert("Invalid Email id");
      } else {
        if (!regpsw.test(psw.value)) {
          alert("password creteria is not met");
        } else {
          if (remem.checked) {
            localStorage.setItem("userName", nam.value);
            localStorage.setItem("phoneNumber", phNum.value);
            localStorage.setItem("emailID", email.value);
            localStorage.setItem("password", psw.value);
          } else {
            localStorage.removeItem("userName", nam.value);
            localStorage.removeItem("phoneNumber", phNum.value);
            localStorage.removeItem("emailID", email.value);
            localStorage.removeItem("password", psw.value);

            sessionStorage.setItem("userName", nam.value);
            sessionStorage.setItem("phoneNumber", phNum.value);
            sessionStorage.setItem("emailID", email.value);
            sessionStorage.setItem("password", psw.value);

            /* alert("Logging in"); */
          }
        }
      }
    }
  }
}

/**
 * function call for autofill
 */

fillAll();

/**
 *      Auto fill the fields using the local storage
 */
function fillAll() {
  if (
    !localStorage.getItem("userName") == "" ||
    !localStorage.getItem("phoneNumber", phNum.value) == "" ||
    !localStorage.getItem("emailID", email.value) == "" ||
    !localStorage.getItem("password", psw.value) == ""
  ) {
    console.log("filled the form using Local storage");
    nam.value = localStorage.getItem("userName");
    phNum.value = localStorage.getItem("phoneNumber", phNum.value);
    email.value = localStorage.getItem("emailID", email.value);
    psw.value = localStorage.getItem("password", psw.value);
    remem.checked = true;
  }
}
