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
      const homeHeader = ce('h1')
      homeHeader.textContent = "Welcome to Churn"
      churnBody.append(homeHeader)
    }
// ----------------My cards----------------------
    const fetchCard = () => {
      let currentUser = qs(".user-stats")
      let id = currentUser.getAttribute("data-id")
      fetch(`http://localhost:3000/users/${id}`)
        .then(jsonRes)
        .then((credit_cards) => renderCards(credit_cards))
        
    }
    
    const renderCards = (credit_cards) => {
        for (const cahd of credit_cards) {
        renderCard(cahd)
      }
    }
    const renderCard = (cahd) => {
    //   let browseHeader = ce('div')
      console.log(cahd)

    // //   browseHeader.innerText = cahd.credit_cards
    // //   // credit card id associated with user
    // //   churnBody.append(browseHeader)
    }

    //------------All cards------------------
    const fetchBrowse = () => {
      fetch("http://localhost:3000/credit_cards/")
        .then(jsonRes)
        .then((cards) => browseCards(cards));
    };
    const browseCards = (cards) => {
      for (const aCard of cards) {
        renderBrowseCard(aCard);
      }
    };
    const renderBrowseCard = (aCard) => {
      const cardDiv = qs("div#cards");
      const newCardDiv = ce("div");
      newCardDiv.innerHTML = `
      <h4> ${aCard.name} | Fee: $${aCard.annual_fee} </h4>
      <h6> ${aCard.earn_description} </h6>
      `;
      churnBody.append(newCardDiv);
    }

  const getUsers = () => {
    fetch("http://localhost:3000/users/")
    .then(jsonRes)
    .then(users => {for (const user of users){
      renderUser(user)
    }}) 
  }
  const renderUser = (user) => {
    let currentUserStats = ce('div') 
    currentUserStats.classList.add("user-stats")
    currentUserStats.setAttribute("data-id", `${user.id}`) 
    currentUserStats.setAttribute("data-cash", `${user.accrued_cash}`)
    currentUserStats.setAttribute("data-points", `${user.accrued_points}`)
    currentUserStats.innerHTML = `Points: ${user.accrued_points} | Cash: $${user.accrued_cash}`
    rightSideBar.append(currentUserStats)    
  }

  const submitHandler = () => {
    document.addEventListener("click", (e) => {
      e.preventDefault();
      let currentUser = qs(".user-stats")
      let id = currentUser.getAttribute("data-id")
      if (e.target.matches("#add-points")) {
        let qsPointInput = qs("#accrued-points").value
        let pointsInput = parseInt(qsPointInput)
        let currentPoints = parseInt(currentUser.dataset.points)
        let totalPoints = pointsInput + currentPoints  
        let formData = {accrued_points: totalPoints}
        updateStashValues(id, formData)

      } else if (e.target.matches("#add-cash")) {
        let qsCashInput = qs("#accrued-cash").value;
        let cashInput = parseInt(qsCashInput)
        let currentCash = parseInt(currentUser.dataset.cash)
        let totalCash = cashInput + currentCash
        let formData = {accrued_cash: totalCash}
        updateStashValues(id, formData)
      }
    });
  };

  const updateStashValues = (id, formData) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:3000/users/${id}`, configObj)
    .then(jsonRes)
    .then((data) => {    
      const dataId = data.id
      const cash = data.accrued_cash
      const putPoints = data.accrued_points
      let stats = qs(`div[data-id="${dataId}"].user-stats`)
      stats.dataset.cash = cash
      stats.dataset.points = putPoints
      stats.innerText = `Points: ${putPoints} Cash: $${cash}`
    })
  }
  
  const clickHandler = () => {
    const navBar = qs(".nav");
    navBar.addEventListener("click", (e) => {
      if (e.target.matches(".nav-bar-home")) {
        fetchHome()
      } else if (e.target.matches(".nav-bar-my-cards")) {
        fetchCard()
      } else if (e.target.matches(".nav-bar-browse-cards")) {
        fetchBrowse()
      } else if (e.target.matches(".nav-bar-bookmarks")) {
        
      } else if (e.target.matches(".nav-bar-perks")) {
        
      }
      // } else if (e.target.matches(".nav-bar-spend")) {
      // } else if (e.target.matches(".nav-bar-settings")) {
      // } else if (e.target.matches(".nav-bar-notifications")) {
        
    })
  }
  submitHandler();
  clickHandler();
  getUsers()
    // fetchCards();
})