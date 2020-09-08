document.addEventListener("DOMContentLoaded", () => {
  // const Fetcheroo = new FetchAdapter("http://localhost:3000/");
  // const getUsersCallback = (users) => users.forEach(console.log * "users");
  // const getCreditCardsCallback = (creditCards) =>
  //   creditCards.forEach(console.log * "ccs");
  // Fetcheroo.get("users", getUsersCallback);
  // Fetcheroo.get("credit_cards", getCreditCardsCallback);
  let jsonRes = response => response.json()
  const ce = (tag) => document.createElement(tag)
  const qs = (selector) => document.querySelector(selector)
  let rightSideBar = qs(".sidebar-right")
  let churnBody = qs('#main-content')
  
    const fetchHome = () => {
      // const homeHeader = ce('h1')
      // homeHeader.innerText = 
      // p
    }

    const fetchbrowse = () => {
      fetch("http://localhost:3000/credit_cards/")
        .then(jsonRes)
        .then((cards) => browseCards(cards))
    }
    const browseCards = (cards) => {
      for (const cahd of cards) {
        renderBrowseCard(cahd)
      }
    }
    const renderBrowseCard = (cahd) => {
      let browseHeader = ce('div')
      browseHeader.innerText = cahd.name   
      churnBody.append(browseHeader)
    }

  
    const fetchCards = () => {
      fetch("http://localhost:3000/credit_cards/")
        .then(jsonRes)
        .then((cards) => renderCards(cards));
    };
    const renderCards = (cards) => {
      for (const aCard of cards) {
        renderCard(aCard);
      }
    };
    const renderCard = (aCard) => {
      const cardDiv = qs("div#cards");
      const newCardDiv = ce("div");
      newCardDiv.innerHTML = `
      <h4> ${aCard.name} | Fee: $${aCard.annual_fee} </h4>
      <h6> ${aCard.earn_description} </h6>
      `;
      cardDiv.append(newCardDiv);
    }

  // submit listener for user information
  // post to my information list
  const submitHandler = () => {
    document.addEventListener("submit", (e) => {
      e.preventDefault();

      if (e.target === ("#create-points-form")) {
        const pointInput = qs("#accrued-points").value;
        const pointDiv = ce("div");
        pointDiv.textContent = pointInput;

        // informationDiv.append(pointDiv);
        pointsForm.reset();
      } else if (e.target === ("#create-cash-form")) {
        const cashInput = qs("#accrued-cash").value;
        const cashDiv = ce("div");
        cashDiv.textContent = cashInput;

        // informationDiv.append(cashDiv);
        cashForm.reset();
      } else if (e.target === ("#create-expirations-form")) {
        const expirationInput = qs("#point-expirations")
          .value;
        const expirationDiv = ce("div");
        expirationDiv.textContent = expirationInput;

        // informationDiv.append(expirationDiv);
        expirationForm.reset();

        const formData = {
              accrued_points: pointInput,
              accrued_cash: cashInput,
              point_expirations: expirationInput
        }
        updateStashValues(id, formData)
      }
    });
  };

  const updateStashValues = (id, formData) => {
    let configObj = {
      method: "Patch",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:3000/users/${id}`, configObj)
  }
  


  const clickHandler = (e) => {
    const navBar = qs(".nav");
    navBar.addEventListener("click", (e) => {
      if (e.target.matches(".nav-bar-home")) {
        fetchHome()
        // pageContent = qs(maincontent)
        //updatePageContent(pageContent){}
        // to get forms on page:
        // querySelector the right side bar
        // append forms to right bar
      } else if (e.target.matches(".nav-bar-my-cards")) {
      } else if (e.target.matches(".nav-bar-spend")) {
      } else if (e.target.matches(".nav-bar-perks")) {
      } else if (e.target.matches(".nav-bar-settings")) {
      } else if (e.target.matches(".nav-bar-notifications")) {
      } else if (e.target.matches(".nav-bar-bookmarks")) {
      } else if (e.target.matches(".nav-bar-browse-cards")) {
          fetchbrowse()
      }
    })
  
    
  }
  
  // fetchCards();
  clickHandler();
  submitHandler();
})
