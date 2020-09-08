document.addEventListener("DOMContentLoaded", () => {
  //   const Fetcheroo = new FetchAdapter("https://localhost:3000/");
  //   const getUsersCallback = (users) => users.forEach(console.log * "users");
  //   const getCreditCardsCallback = (creditCards) =>
  //     creditCards.forEach(console.log * "ccs");
  //   Fetcheroo.get("users", getUsersCallback);
  //   Fetcheroo.get("credit_cards", getCreditCardsCallback);
});

// submit listener for user information
// post to my information list
fetch("https://localhost:3000/credit_cards")
  .then((response) => response.json())
  .then((creditCards) => renderCards(creditCards)

const renderCards = (creditCards) = {
  for (const creditCards of cards) {
    renderCard(card)
  }
}

renderCard(aCard) {
const cardDiv = document.querySelector(div#cards)
const newCardDiv = document.createElement('div')
newCardDiv.innerHTML = `<h4> ${aCard.name} ${a.Card.annual_fee} </h4>`
cardDiv.append(newCardDiv)
}

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const pointsForm = document.querySelector("#create-points-form");
  const cashForm = document.querySelector("#create-cash-form");
  const expirationForm = document.querySelector("#create-expirations-form");
  if (e.target === pointsForm) {
    const pointInput = document.querySelector("#accrued-points").value;
    const pointLi = document.createElement("li");
    pointLi.textContent = pointInput;

    const informationUl = document.querySelector("#information");
    informationUl.append(pointLi);
    pointsForm.reset();
  } else if (e.target === cashForm) {
    const cashInput = document.querySelector("#accrued-cash").value;
    const cashLi = document.createElement("li");
    cashLi.textContent = cashInput;

    const cashUl = document.querySelector("#information");
    cashUl.append(cashLi);
    cashForm.reset();
  } else if (e.target === expirationForm) {
    const expirationInput = document.querySelector("#point-expirations").value;
    const expirationLi = document.createElement("li");
    expirationLi.textContent = expirationInput;

    const informationUl = document.querySelector("#information");
    informationUl.append(expirationLi);
    expirationForm.reset();
  }
});
