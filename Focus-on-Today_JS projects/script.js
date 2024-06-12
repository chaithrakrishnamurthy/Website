const checkBoxHandle = document.querySelectorAll(".custom-checkbox");
let inputValList = document.querySelectorAll(".goal-input");
let progressTag = document.querySelector(".progress-bar");
let progressValue = document.querySelector(".progress-value");
let progressLabel = document.querySelector(".progress-label");
let quoteLabel = document.querySelector(".quote");

const goalQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];
const footerTitle = [
  "“Move one step ahead, today!”",
  "“Keep Going, You’re making great progress!”",
];
// const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
//   first: {
//     name: "",
//     completed: false,
//   },
//   second: {
//     name: "",
//     completed: false,
//   },
//   third: {
//     name: "",
//     completed: false,
//   },
// };
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.style.width = `${(completedGoalCount / inputValList.length) * 100}%`;

checkBoxHandle.forEach((checkbox, i) => {
  checkbox.addEventListener("click", (e) => {
    const filledValue = [...inputValList].every((input, i) => {
      return input.value;
    });
    if (filledValue) {
      // progressTag.classList.remove("show-error");
      checkbox.parentElement.classList.toggle("completed");
      const checkId = checkbox.nextElementSibling.id;
      allGoals[checkId].completed = !allGoals[checkId].completed;
      completedGoalCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoalCount / inputValList.length) * 100}%`;
      progressValue.firstChild.innerText = `${completedGoalCount}/${inputValList.length} Completed`;
if(completedGoalCount>3){
  progressLabel.innerText = goalQuotes[3];
} else{
  progressLabel.innerText = goalQuotes[completedGoalCount];
}
      
      completedGoalCount === 0
        ? (quoteLabel.innerText = footerTitle[0])
        : (quoteLabel.innerText = footerTitle[1]);
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressTag.classList.add("show-error");
    }
  });
});

inputValList.forEach((input) => {
  // console.log(allGoals[input.id])
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressTag.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name:input.value,
        completed:false
      };
    }

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

// if(inputValList.length)
