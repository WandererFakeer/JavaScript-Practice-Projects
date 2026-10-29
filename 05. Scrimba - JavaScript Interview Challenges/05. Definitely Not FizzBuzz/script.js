/* Totally Not Another FizzBuzz 

Scrimba CEO Per Borgen wants you to write a program to grant special bonuses to all his employees based on their employee ID numbers! 

Scrimba has 100 employees and their employee ID numbers range from 1 - 100. If the employee's ID number is: 

Divisible by 3 - Vacation! 
Divisible by 5 - $100,000 bonus! 
Divisible by both 3 and 5 - JACKPOT! 1 Million and a Yacht!
Not divisible by 3 or 5 - :(
    
Write a program to loop through all the ID numbers and print their prize. 
Your function's output should look something like this: 

1 - :(
2 - :(
3 - Vacation! 
4 - :(
5 - $100,000 bonus!
*/

const ulEl = document.querySelector("ul");

const prizes = [];

function render() {
  //ulEl.remove();

  const fragment = document.createDocumentFragment();

  for (const prize of prizes) {
    const li = document.createElement("li");
    li.textContent = `${Object.keys(prize)} - ${Object.values(prize)}`;

    fragment.append(li);
  }

  ulEl.append(fragment);
}

function definitelyNotFizzBuzz(numberOfEmployee) {
  for (let employeeID = 1; employeeID <= numberOfEmployee; employeeID++) {
    if (employeeID % 3 === 0 && employeeID % 5 === 0) {
      prizes.push({ [employeeID]: "JACKPOT! 1 Million and a Yacht!" });
    } else if (employeeID % 3 === 0) {
      prizes.push({ [employeeID]: "Vacation!" });
    } else if (employeeID % 5 === 0) {
      prizes.push({ [employeeID]: "$100,000 bonus!" });
    } else {
      prizes.push({ [employeeID]: ":(" });
    }
  }

  render();
}

definitelyNotFizzBuzz(100);
