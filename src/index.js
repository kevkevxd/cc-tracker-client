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
    currentUserStats.innerHTML = `MONEY: ${user.accrued_points} ${user.accrued_cash}`
    churnBody.append(currentUserStats) 
  }
  getUsers()
  // find current user id, push through into patch request

  // submit listener for user information
  // post to my information list
  const submitHandler = () => {
    document.addEventListener("submit", (e) => {
      e.preventDefault();
      let currentUser = qs(".user-stats")
      let id = currentUser.getAttribute("data-id")
      let pointsForm = document.getElementById('create-points-form')
      //get current user through fetch
      if (e.target.matches("#create-points-form")) {
        // const theForm = e.target
        let qsCashInput = qs("#accrued-cash").value;
        let cashInput = parseInt(qsCashInput)
        let qsPointInput = qs("#accrued-points").value
        let pointsInput = parseInt(qsPointInput)
        let currentCash = currentUser.dataset.cash
        let currentPoints = currentUser.dataset.points
        let totalCash = cashInput + currentCash
        let totalPoints = pointsInput + currentPoints
        // expirationForm.reset();

        const formData = {
              accrued_points: totalPoints,
              accrued_cash: totalCash
        }
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
