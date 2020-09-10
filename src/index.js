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
            let creditCard = ce('div')
            creditCard.innerHTML =`
            <div>CC: ${myCard.name}</div>
            <div>approval_date: ${myCard.approval_date}</div>
            <div> bonus amount:${myCard.bonus_amount}</div>          
            <div><button class="edit-self-card">delete</button></div>

            <form id="edit-card-date-form" action="#" method="post">
            <input type="number" id="date-form" name="${myCard.id}" placeholder="approval date">
            <input type="submit" id="approval-date-edit" name="${myCard.id}" value="enter">
            
            <form id="enter-bonus-form" action="#" method="post"> 
            <input type="number" id="bonus-amt" name="${myCard.id}" placeholder="bonus amount">
            <input type="submit" id="acquired-bonus" name="${myCard.id}" value="enter">
            
            `
            churnBody.append(creditCard)
          }

    const updateCard = (ccId, formData) => {
      let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:3000/credit_cards/${ccId}`, configObj)
      .then(jsonRes)
      .then(data => console.log(data))
  } 
  

  
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
      newCardDiv.dataset.num = aCard.id
      
      newCardDiv.dataset.bookMark = aCard.is_bookedmarked
      if(newCardDiv.dataset.bookMark != null){
        newCardDiv.dataset.bookMark = false
      }

      //set a variable to boolean passed through 
      newCardDiv.innerHTML = `
      <h4> ${aCard.name} | Fee: $${aCard.annual_fee} </h4>
      <button id="bookmark-button" data-book-mark="${aCard.is_bookedmarked}">Bookmark</button>
      <h6> ${aCard.earn_description} </h6>
      `;
      churnBody.append(newCardDiv);
    }
// ---------------------------Bookmarked Cards----------------------------

  const updateBookmark = (ccId, dataObject, cardBoolean) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataObject)
    }
    fetch(`http://localhost:3000/credit_cards/${ccId}`, configObj)
      .then(jsonRes)
      .then(aCard => renderBrowseCard(aCard))
      console.log(cardBoolean)
      // update db values here

      //start copy pasting dog lab shit in here

  }
  
  // const getBookmarks = () => {
  //   fetch(userUrl)
  //   .then(jsonRes)
  //   .then(users => renderBookmarks(users))
  // }
  
  // const renderBookmarks = (users) => {
  //   for (const card of users) {
  //     renderBookmark(card)
  //   }
  // }
  // const renderBookmark = (user) => {
  // let bookmarkButtonDiv = ce('div')
  //   bookmarkButtonDiv.dataset.num = user.id
  //   bookmarkButtonDiv.dataset.bookMark = user.is_bookedmarked
  //   console.log(bookmarkButtonDiv)
  //   // correctly associates id and is_bookmarked
  //   churnBody.append(bookmarkButtonDiv)
  // }
  
  // getBookmarks()
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
    if(currentUserStats.dataset.cash === "null"){
      currentUserStats.dataset.cash = 0
    }
    currentUserStats.setAttribute("data-points", `${user.accrued_points}`)
    if(currentUserStats.dataset.points === "null"){
      currentUserStats.dataset.points = 0
    }
    // let dc1 = dc.dataset.cash
    rightSideBar.append(currentUserStats)  
    let dc = qs(".user-stats")
    let dc1 = dc.dataset.cash
    let dp = dc.dataset.points 

    // currentUserStats.innerHTML = `
    // Points: ${user.accrued_points} | Cash: $${user.accrued_cash}
    // `
    let displayDiv = ce('div')
    displayDiv.innerHTML = `Points: ${dp}  Cash: ${dc1}`
    currentUserStats.append(displayDiv)
  }
  
  const submitHandler = () => {
    // add code to reset form 
    // form.reset()
    // const pointsForm = qs("#accrued-points")
    // pointsForm.reset
    document.addEventListener("click", (e) => {
      e.preventDefault();
      let currentUser = qs(".user-stats")
      let id = currentUser.getAttribute("data-id")

      let currentCard = qs(".credit-card")
      
      // let ccId = currentCard.id
      
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

      } else if (e.target.matches("#approval-date-edit")) {
        let qsDateForm = qs("#date-form")
        let dateInput = qsDateForm.value
        let ccId = e.target.name
        let formData = {approval_date: dateInput}
        updateCard(ccId, formData)

      } else if (e.target.matches("#acquired-bonus")){
        let qsBonus = qs("#bonus-amt")
        let bonusInput = qsBonus.value
        let ccId = e.target.name
        let formData = {bonus_amount: bonusInput}
        updateCard(ccId, formData)
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
    // const navBar = qs(".nav");
    document.addEventListener("click", (e) => {
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
        
        // patch is_bookedmarked true?
        // if true display here.
      } else if (e.target.matches(".nav-bar-perks")) {
        //same starter code as my cards, but displays global entry and insurance crap
      } else if (e.target.matches("#bookmark-button")){
        let button = e.target
        let cardId = button.previousElementSibling.parentElement.dataset.num
        let cardBoolean = button.parentElement.dataset.bookMark
        // debugger
        // console.log(bookmarkButton)
        //pull current state of isbookmarked from the card T/F?
        // set it to opposite value in dataobject
        if (button.textContent === "Bookmark") {
          button.textContent = "Bookmarked!"
          button.dataset.bookMark = "true"
        } else if (button.textContent === "Bookmarked!") {
          button.textContent = "Bookmark"
          // cardBoolean = "false"
          button.dataset.bookMark = "false"

        let dataObject = {is_bookedmarked: cardBoolean}
        updateBookmark(cardId, dataObject, cardBoolean) 
        
        
        

        // change button to "Bookmarked!"
        







        // patchCard(cardId, "true")
        }
      }
      // } else if (e.target.matches(".nav-bar-spend")) {
      // } else if (e.target.matches(".nav-bar-settings")) {
      // } else if (e.target.matches(".nav-bar-notifications")) {
        
    })
  }

  // const patchCard = (cardId, value) => {
  //   const options = {
  //     methiod: 'PATCH',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({ is_bookedmarked: value })
  //   }
  //   fetch((creditCardUrl + cardId), options)
  //       .then(jsonRes)
  //       .then((cards) => console.log(cards));
  //       churnBody.innerText = ""
    
  // }
  submitHandler();
  clickHandler();
  getUsers()
})