(function enableHints() {
  const hintBig = document.getElementById("hintBig");
  const initialTopHintBig = hintBig.getBoundingClientRect().top;

  const hintSmall = document.getElementById("hintSmall");
  const initialTopHintSmall = hintSmall.getBoundingClientRect().top;

  let tooltipsShown = false;
  hintBig.onclick = hintSmall.onclick = function () {
    if (!tooltipsShown) {
      showAlertsFromToolTips();
      tooltipsShown = true;
      hideElement(this);
    }
  };

  const progressBar = hintBig.querySelector(".progress-bar");
  const timeToHideJsHint = 2000;

  (function hideSmallHindAddClass() {
    hideElement(hintSmall);
    setTimeout(() => {
      hintSmall.classList.add("transitioned");
    });
  })();

  animate({
    duration: timeToHideJsHint,
    timing: function (timeFraction) {
      return timeFraction;
    },
    draw: function animateProgress(progress) {
      let roundedProgress = Math.round(progress * 100);
      let resultWidth = 100 - roundedProgress;
      progressBar.style.width = `${resultWidth}%`;
    },
  });

  function animate({ timing, draw, duration }) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      let progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        finishedAnimationHandler(progress);
      }
    });
  }

  function finishedAnimationHandler(progress) {
    if (!Number(1 - progress)) {
      setTimeout(() => {
        if (!tooltipsShown) {
          hideElement(hintBig);
          showElement(hintSmall, initialTopHintSmall);
        }
      }, 600);
    }
  }

  function hideElement(elem) {
    elem.style.top = -(elem.getBoundingClientRect().bottom + 10) + "px";
  }

  function showElement(elem, topToSet) {
    elem.style.top = topToSet + "px";
  }

  const isToolTip = (elem) => {
    if (elem.dataset && elem.dataset.tooltip) {
      return true;
    }
    return false;
  };

  function showAlertsFromToolTips() {
    const toolTipElements = document.querySelectorAll(".withToolTip");
    const hintElementsArr = Array.from(toolTipElements);

    hintElementsArr.forEach((msgPane) => {
      if (isToolTip(msgPane)) {
        const infoData = msgPane.dataset.tooltip;
        const messageAlert = getMessageAlert(infoData);
        msgPane.append(messageAlert);
      }
    });

    const nextHintElement = Array.from(hintElementsArr).find((el) => {
      if (!isToolTip(el)) return;
      let elementShowOrder = el.dataset.tooltipshoworder;
      let targetOrder = Number(elementShowOrder) === 1;
      return targetOrder;
    });

    if (nextHintElement) {
      nextHintElement.querySelector(".messageAlert").style.display = "block";
      nextHintElement.scrollIntoView();
    }
  }

  function getMessageAlert(info) {
    let divAlert = document.createElement("div");
    divAlert.classList.add("messageAlert", "alert", "alert-primary");

    let divClose = document.createElement("div");
    divClose.classList.add("closeButton");
    divClose.innerText = `[x]`;

    divClose.onclick = function (e) {
      divAlert.remove();
    };

    let pInfo = document.createElement("p");
    pInfo.innerText = info;

    divAlert.append(divClose);
    divAlert.append(pInfo);

    const nextToolTipButton = document.createElement("button");
    nextToolTipButton.classList.add(
      "btn",
      "btn-light",
      "border",
      "border-success",
      "rounded"
    );
    nextToolTipButton.innerText = "show next hint";

    nextToolTipButton.onclick = function (e) {
      const currentHint = e.target.closest(".messageAlert");
      const parentElement = e.target.closest(".withToolTip");
      const showOrder = parentElement.dataset.tooltipshoworder;

      let allHintElements = document.querySelectorAll(".withToolTip");
      const nextHintElement = Array.from(allHintElements).find((el) => {
        if (!isToolTip(el)) return;
        let elementShowOrder = el.dataset.tooltipshoworder;
        let targetOrder = Number(elementShowOrder) === Number(showOrder) + 1;
        return targetOrder;
      });
      currentHint.remove();
      if (nextHintElement) {
        nextHintElement.querySelector(".messageAlert").style.display = "block";
        nextHintElement.scrollIntoView();
      }
    };
    divAlert.append(nextToolTipButton);
    return divAlert;
  }
})();
