document.addEventListener("DOMContentLoaded", () => {
  // const Fetcheroo = new FetchAdapter("http://localhost:3000/");
  // const getUsersCallback = (users) => users.forEach(console.log * "users");
  // const getCreditCardsCallback = (creditCards) =>
  //   creditCards.forEach(console.log * "ccs");
  // Fetcheroo.get("users", getUsersCallback);
  // Fetcheroo.get("credit_cards", getCreditCardsCallback);



  // PAGES --------------------------------------------------------
  // The main content container is the "main page"
  const mainContent = document.querySelector('#main-content');
  // Call updatePageContent whenever you need to change the "page"
  const updatePageContent = (innerHTMLContent) => {
    mainContent.innerHTML = innerHTMLContent;
  }
  
  const getHomePageHTMLContent = () => '<div>Home Page Content</div>';
  const getMyCardsPageHTMLContent = (card) => `
    <div>
      <h4> ${card.name} | $${card.annual_fee} </h4>
    </div>
  `;
  // ---------------------------------------------------------------




  // API FETCH REQUESTS --------------------------------------------
  const fetchCards = () => {
    fetch("http://localhost:3000/credit_cards/")
      .then((response) => response.json())
      .then((cards) => renderCards(cards));
  };
  // ---------------------------------------------------------------



  // UPDATING --------------------------------------------------------
  const renderCards = (cards) => {
    for (const aCard of cards) {
      renderCard(aCard);
    }
  };

  function renderCard(aCard) {
    // const cardDiv = document.querySelector("div#cards");
    // const newCardDiv = document.createElement("div");
    // newCardDiv.innerHTML = `
    // <h4> ${aCard.name} | $${aCard.annual_fee} </h4>
    // `;
    // cardDiv.append(newCardDiv);
    pageContent = getMyCardsPageHTMLContent(aCard);
    updatePageContent(pageContent);
  }
  // -----------------------------------------------------------------



  // EVENT HANDLERS -----------------------------------------------
  // submit listener for user information
  // post to my information list
  const submitHandler = () => {
    document.addEventListener("submit", (e) => {
      e.preventDefault();
      const pointsForm = document.querySelector("#create-points-form");
      const cashForm = document.querySelector("#create-cash-form");
      const expirationForm = document.querySelector("#create-expirations-form");
      const informationDiv = document.querySelector("#information");

      if (e.target === pointsForm) {
        const pointInput = document.querySelector("#accrued-points").value;
        const pointDiv = document.createElement("div");
        pointDiv.textContent = pointInput;

        informationDiv.append(pointDiv);
        pointsForm.reset();
      } else if (e.target === cashForm) {
        const cashInput = document.querySelector("#accrued-cash").value;
        const cashDiv = document.createElement("div");
        cashDiv.textContent = cashInput;

        informationDiv.append(cashDiv);
        cashForm.reset();
      } else if (e.target === expirationForm) {
        const expirationInput = document.querySelector("#point-expirations")
          .value;
        const expirationDiv = document.createElement("div");
        expirationDiv.textContent = expirationInput;

        informationDiv.append(expirationDiv);
        expirationForm.reset();
      }
    });
  };

  const clickHandler = (e) => {
    const navBar = document.querySelector(".nav");
    navBar.addEventListener("click", (event) => {
      if (event.target.matches(".nav-bar-home")) {
        updatePageContent(getHomePageHTMLContent());
        //click home, //wipe dom, //persist stash in right bar
      } else if (event.target.matches(".nav-bar-my-cards")) {
        updatePageContent(getMyCardsPageHTMLContent());
      } else if (event.target.matches(".nav-bar-spend")) {
      } else if (event.target.matches(".nav-bar-perks")) {
      } else if (event.target.matches(".nav-bar-settings")) {
      } else if (event.target.matches(".nav-bar-notifications")) {
      } else if (event.target.matches(".nav-bar-bookmarks")) {
      } else if (event.target.matches(".nav-bar-browse-cards")) {
      }
    });
  };

  clickHandler();
  fetchCards();
  submitHandler();
});
