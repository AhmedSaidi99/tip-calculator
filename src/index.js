let inputs = document.querySelectorAll("input[type=text]");
let tips = document.querySelectorAll(".fields__tip__btns input[type=submit]");
let customTip = document.querySelector("input[name=custom]");
let results = document.querySelectorAll(".result__num");
let resetBtn = document.querySelector(".result__reset");
let errorMsg = document.querySelector('.fields__people span')

let factors = {
  bill: null,
  tip: null,
  people: null,
};


function calculate(data) {
  const { bill, tip, people } = data;
  let tipPerPerson = (bill * tip) / people;
  let totalPerPerson = (bill / people) + tipPerPerson;
  results.forEach((result) => {
    if (result.parentNode.classList.contains("result__tip")) {
      result.textContent = `$${tipPerPerson.toFixed(2)}`;
    } else if (result.parentNode.classList.contains("result__total")) {
      result.textContent = `$${totalPerPerson.toFixed(2)}`;
    }
  });
  resetBtn.classList.add('active')
}

function reset() {
  resetBtn.classList.remove('active')
  results.forEach(result => result.textContent = '$0.00')
  factors = {
    bill: null,
    tip: null,
    people: null
  }
  inputs.forEach((input) => {
    input.value = "";
  });
  tips.forEach(tip => tip.classList.remove('active'))
}

inputs.forEach((input) => {
  input.onclick = (e) => {
    if (e.target.name === 'custom') {
      tips.forEach(tip => tip.classList.remove('active'))
    }
  }
  input.onchange = (e) => {
    switch (e.target.name) {
      case 'bill':
        factors.bill = +e.target.value;
        break;
      case 'custom':
        factors.tip = +e.target.value / 100;
        break;
      case 'people':
        if (e.target.value === '0') {
          e.target.classList.add('false') 
          errorMsg.style.display = 'inline'
        } else {
          e.target.classList.remove('false') 
          errorMsg.style.display = 'none'
          factors.people = +e.target.value;
        }
        break;
    }
    if (Object.keys(factors).every(factor => factors[factor])) calculate(factors)
  };
  
});

tips.forEach((tip) => {
  tip.onclick = (e) => {
    tips.forEach(tip => tip.classList.remove('active'))
    customTip.value = "";
    factors.tip = +e.target.dataset.percentage;
    e.target.classList.add('active')
    if (Object.keys(factors).every(factor => factors[factor])) calculate(factors)
  };
});

resetBtn.addEventListener('click', reset)