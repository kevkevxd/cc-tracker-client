document.addEventListener("DOMContentLoaded", () => {
  // const FetchThing = new FetchAdapter("http://localhost:3000/");
  // const getUsersCallback = (users) => users.forEach(console.log * "users");
  // Fetcheroo.get("users", getUsersCallback);
  const userUrl = "http://localhost:3000/users/"
  const creditCardUrl = "http://localhost:3000/credit_cards/"
  let jsonRes = response => response.json()
  const ce = (tag) => document.createElement(tag)
  const qs = (selector) => document.querySelector(selector)
  let rightSideBar = qs(".sidebar-right")
  let churnBody = qs('#main-content')
  
// ---------------Welcome Message----------------
  const fetchHome = () => {
      churnBody.innerText = ""
      const homeHeader = ce('h1')
      homeHeader.textContent = "Welcome back Victor"
      churnBody.append(homeHeader)
    }
// ----------------My cards----------------------
    const fetchCard = () => {
      let currentUser = qs(".user-stats")
      let id = currentUser.getAttribute("data-id")
      fetch(`http://localhost:3000/users/${id}`)
        .then(jsonRes)
        .then((first_obj) => renderCards(first_obj))
        churnBody.innerText = ""
        
    }
    const renderCards = (first_obj) => {
        let ccArray = first_obj.credit_cards
        ccArray.forEach(
          renderCard
        )
    }    
          const renderCard = (myCard) => {
            let browseHeader = ce('div')
            // console.log(myCard.name)
            browseHeader.innerHTML =`
            <h3><div>CC: ${myCard.name}</div>
            <div>approval_date: ${myCard.approval_date}</div>
            <div> bonus amount:${myCard.bonus_amount}</div></h3>
            <div><input type="radio" name="list" value="delete-card">delete-card <button>delete</button></div>
            <div><button class="edit-self-card">Default</button></div>
            `
            // // credit card id associated with user
            churnBody.append(browseHeader)
          }

    const updateCard = (id, formdata) => {
      let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:3000/users/${id}`, configObj)
    .then(jsonRes)}
//-----------------All cards-------------------
    const fetchBrowse = () => {
      fetch(creditCardUrl)
        .then(jsonRes)
        .then((cards) => browseCards(cards));
        churnBody.innerText = ""
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
      <button>Bookmark</button>
      <h6> ${aCard.earn_description} </h6>
      `;
      churnBody.append(newCardDiv);
    }
// ---------------------------Bookmarked Cards----------------------------

  const getBookmarks = () => {
    fetch(userUrl)
    .then(jsonRes)
    .then(users => {for (const user of users){
      renderBookmark(user)
    }})
  }
  const renderBookmark = (user) => {
    let bookmarkButtonDiv = ce('div')
    bookmarkButtonDiv.dataset.num = user.id
    
  }
  

// ----------------------User stats on right bar---------------------------
  const getUsers = () => {
    fetch(userUrl)
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
    currentUserStats.innerHTML = `
    Points: ${user.accrued_points} | Cash: $${user.accrued_cash}
    `
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
        fetchHome() //add stash values here maybe
      } else if (e.target.matches(".nav-bar-my-cards")) {
        fetchCard() //add edit functionalities (patch)
        //delete from my cards, expirations, sign-up date, notes 
        //maybe eventually move the original forms to this page
        //needs a delete, create an edit button, which will patch data OBJ through
      } else if (e.target.matches(".nav-bar-browse-cards")) {
        fetchBrowse() //add bookmark functionality -victor
      } else if (e.target.matches(".nav-bar-bookmarks")) {
        //patch is_bookedmarked true?
        // if true display here.
      } else if (e.target.matches(".nav-bar-perks")) {
        //same starter code as my cards, but displays global entry and insurance crap
      } else if (e.target.matches(".edit-self-card"))
        updateCard(id, formData)
      // } else if (e.target.matches(".nav-bar-spend")) {
      // } else if (e.target.matches(".nav-bar-settings")) {
      // } else if (e.target.matches(".nav-bar-notifications")) {
        
    })
  }
  submitHandler();
  clickHandler();
  getUsers()
})