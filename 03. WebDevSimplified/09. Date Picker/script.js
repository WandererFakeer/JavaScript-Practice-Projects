const buttonEl = document.querySelector("button");
const dateEl = document.querySelector("#date");
const dateToday = Temporal.Now.plainDateISO();
const state = {
  month: dateToday.toLocaleString("en-US", { month: "long" }),
  day: formatDate(dateToday.day),
  year: dateToday.year,
};

function render() {
  buttonEl.textContent = `${state.month} ${state.day}, ${state.year}`;
}

function formatDate(day) {
  if (day === 1 || day === 21 || day === 31) {
    return `${day}st`;
  } else if (day === 2 || day === 22) {
    return `${day}nd`;
  } else if (day === 3 || day === 23) {
    return `${day}rd`;
  } else {
    return `${day}th`;
  }
}

function changeDate(e) {
  const datePicked = e.target.value;
  const plainDate = Temporal.PlainDate.from(datePicked);

  state.month = plainDate.toLocaleString("en-US", { month: "long" });
  state.day = formatDate(plainDate.day);
  state.year = plainDate.year;

  render();
}

render();

buttonEl.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    dateEl.showPicker();
  } catch (error) {
    console.error(error);
  }
});

dateEl.addEventListener("change", changeDate);
