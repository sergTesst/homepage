"use strict";

const cl = console.log;

document.addEventListener("DOMContentLoaded", function (event) {
  updateDisplay();
});

const heart = document.getElementById("heartClick");
let count = sessionStorage.getItem("likesCount");
if (count == undefined || count == null || count == NaN) {
  count = 0;
}

heart.addEventListener("click", () => {
  count++;
  if (typeof Storage !== "undefined") {
    sessionStorage.setItem("likesCount", count);
  }
  updateDisplay();
});

heart.addEventListener("dblclick", () => {
  sessionStorage.clear();
  count = 0;
  document.getElementById("likeCounter").innerHTML = "";
});

function updateDisplay() {
  const likesSpan = document.getElementById("likeCounter");
  likesSpan.innerHTML = sessionStorage.getItem("likesCount");
}

document.querySelector("#labs-check").addEventListener("click", (event) => {
  const divLabsCont = document.querySelector(".labs-content");

  if (divLabsCont.style.fontSize == "") {
    divLabsCont.style.fontSize = "medium";
  } else {
    divLabsCont.style.fontSize = "";
  }
});

const projContainers = document.querySelectorAll(".project-container");
Array.prototype.forEach.call(projContainers, (projCont) => {
  const aEl = projCont.querySelector("a");

  function addListenersForElement(elem, container) {
    elem.addEventListener("mouseover", async (_) => {
      if (document.documentElement.clientWidth > 1000) {
        container.style.width = "100%";
      }
    });

    elem.addEventListener("mouseout", async (_) => {
      if (document.documentElement.clientWidth > 1000) {
        container.style.width = "";
      }
    });
  }
  addListenersForElement(aEl, projCont);
});

const LangConfigObj = {
  javascript: "#efd81d",
  react: "#61dafb",
  ["asp.net core"]: "#592c8c",
  ["entity framework core"]: "#652076",
  swagger: "#6a9500",
  docker: "#2391e6",
  xunit: "black",
  angular: "#c3002f",
  vue: "#3fb27f",
  typescript: `#2f74c0`,
};

function setRightColorForElements() {
  const timeLineCont = document.querySelector(".timeline");
  const allLinks = timeLineCont.querySelectorAll(`a[href]`);
  setColourForLinks(allLinks);
  function setColourForLinks(links) {
    Array.from(links).forEach((link) => {
      let innerHTMLOfLink = link.innerHTML.trim().toLowerCase();
      if (Object.keys(LangConfigObj).includes(innerHTMLOfLink)) {
        link.style.backgroundColor = `${LangConfigObj[innerHTMLOfLink]}`;
      }
    });
  }
}
setRightColorForElements();

function formOpportunityOfferValidation() {
  const form = document.forms.opportunityOffer;

  const {
    formNameInput: name,
    message,
    _replyto: email,
    submit,
  } = form.elements;

  function disableSubmit() {
    submit.setAttribute("disabled", true);
  }
  disableSubmit();

  const checkElementValueInEmpty = (elem) => Boolean(!elem.value.trim());

  form.addEventListener("focusout", focusOutHandler);
  function focusOutHandler(e) {
    const { target: focusOutElement } = e;
    addWarningIfEmpty(focusOutElement);
    let elementIsEmail = focusOutElement === email;
    if (elementIsEmail) handlerEmailValid();
  }

  function handlerEmailValid() {
    let isEmailValid = checkEmailValueValid(email.value.trim());
    let emailIsEmpty = Boolean(checkElementValueInEmpty(email));
    addOrRemoveEmailWarning(isEmailValid, emailIsEmpty);
  }

  function addOrRemoveEmailWarning(isEmailValid, emailIsEmpty) {
    let emailWarningEl = email
      .closest(".form-group")
      .querySelector(".invalid-feedback");
    if (!isEmailValid && !emailIsEmpty) {
      emailWarningEl.innerText =
        "Please provide a valid email like name@domain.com";
      emailWarningEl.style.display = "block";
    } else {
      if (emailWarningEl.style.display === "block")
        emailWarningEl.style.display = "none";
    }
  }

  function addWarningIfEmpty(elem) {
    const elementValueIsEmpty = checkElementValueInEmpty(elem);
    if (elementValueIsEmpty) {
      if (!elem.classList.contains("warning")) {
        elem.classList.add("warning");
        return true;
      }
      return true;
    }
    return false;
  }

  form.addEventListener("keydown", keyUpDownInputHandler);
  form.addEventListener("keyup", keyUpDownInputHandler);
  form.addEventListener("input", keyUpDownInputHandler);
  function keyUpDownInputHandler(e) {
    const { target: inputingelem } = e;
    if (checkElementValueInEmpty(inputingelem)) {
      inputingelem.classList.remove("warning");
    }

    checkFormElementsAreValid();
  }

  let allFormElementsAreValid = false;
  function checkFormElementsAreValid() {
    let isEmailValid = checkEmailValueValid(email.value.trim());
    let emailIsEmpty = Boolean(checkElementValueInEmpty(email));
    allFormElementsAreValid = Boolean(
      !checkElementValueInEmpty(name) &&
        !emailIsEmpty &&
        !checkElementValueInEmpty(message) &&
        isEmailValid
    );
    if (allFormElementsAreValid) {
      submit.removeAttribute("disabled");
    } else {
      disableSubmit();
      removeEmailWarning(isEmailValid, emailIsEmpty);
    }
  }
  function removeEmailWarning(isEmailValid, emailIsEmpty) {
    let emailWarningEl = email
      .closest(".form-group")
      .querySelector(".invalid-feedback");
    if (isEmailValid && !emailIsEmpty) {
      if (emailWarningEl.style.display === "block")
        emailWarningEl.style.display = "none";
    }
  }

  function checkEmailValueValid(emailVal) {
    let notAnyWhiteSpaceAndAtSignOneUnlimited = "[^s@]+";
    let completeRegEx = `^${notAnyWhiteSpaceAndAtSignOneUnlimited}@${notAnyWhiteSpaceAndAtSignOneUnlimited}\\.${notAnyWhiteSpaceAndAtSignOneUnlimited}$`;
    const regularEx = new RegExp(completeRegEx);
    let isEmailValid = regularEx.test(emailVal);

    return isEmailValid;
  }
}
formOpportunityOfferValidation();
