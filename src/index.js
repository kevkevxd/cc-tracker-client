//  MY CARDS
//                       Add a card that you own button here
// Chase Sapphire Reserve
// 3% back restaurants
// 1.5% everything else
// $300 annual travel credit
//
// Discover Cards
// 5% back on Amazon, Target, etc

// the button where u add a card.. will send a post request
// produces a modal of stuff to fill out

document.addEventListener("DOMContentLoaded", () => {
  // const FetchThing = new FetchAdapter("http://localhost:3000/");
  // const getUsersCallback = (users) => users.forEach(console.log * "users");
  // Fetcheroo.get("users", getUsersCallback);
  const userUrl = "http://localhost:3000/users/";
  const creditCardUrl = "http://localhost:3000/credit_cards/";
  let jsonRes = (response) => response.json();
  const ce = (tag) => document.createElement(tag);
  const qs = (selector) => document.querySelector(selector);
  let rightSideBar = qs(".sidebar-right");
  let churnBody = qs("#main-content");
  let h3SectionHeader = qs(".section-header");

  // ---------------Welcome Message----------------
  const fetchHome = () => {
    churnBody.innerText = "";
    const homeHeader = ce("h3");
    homeHeader.textContent = "Welcome back Victor";
    churnBody.append(homeHeader);
  };

  // Display Reward type (MR/TYP/UR/DeltaSkyMiles/ETC) + current points left

  // ----------------My cards----------------------
  const fetchCard = () => {
    let currentUser = qs(".user-stats");
    let id = currentUser.getAttribute("data-id");
    fetch(`http://localhost:3000/users/${id}`)
      .then(jsonRes)
      .then((data) => renderCards(data));
    churnBody.innerText = "";
    // h2SectionHeader.innerText = "My cards"
    // rightSideBar.innerHTML = ""
    const homeHeader = ce("h3");
    homeHeader.textContent = "My Cards";
    churnBody.append(homeHeader);
  };
  const renderCards = (data) => {
    let ccArray = data.credit_cards;
    ccArray.forEach(renderCard);
  };
  const renderCard = (myCard) => {
    let creditCard = ce("div");
    creditCard.dataset.num = myCard.id;
    creditCard.innerHTML = `
            <h4>${myCard.name}</h4>
            <div class="card-div" data-cc="${myCard.id}"> Approval Date: ${myCard.approval_date} Bonus Amount: ${myCard.bonus_amount} </div>
            <div id="form-container"></div>
            <form id="edit-card-date-form" action="#" method="post">
            <input type="text" id="date-form" name="${myCard.id}" placeholder="approval date">
            <input type="submit" id="approval-date-edit" name="${myCard.id}" value="enter">
            
            <form id="enter-bonus-form" action="#" method="post"> 
            <input type="number" id="bonus-amt" name="${myCard.id}" placeholder="bonus amount">
            <input type="submit" id="acquired-bonus" name="${myCard.id}" value="enter">
            <button class="edit-self-card" data-num=${myCard.id}>delete</button></div>     
            `;
    // <button id="edit-owned-card" data-num=${myCard.id}>hide form</button>
    churnBody.append(creditCard);
  };

  const updateCard = (ccId, formData) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:3000/credit_cards/${ccId}`, configObj)
      .then(jsonRes)
      .then((value) => {
        const valueId = value.id;
        const putApproval = value.approval_date;
        const putBonus = value.bonus_amount;
        let newCc = qs(`div[data-cc="${valueId}"].card-div`);
        newCc.innerText = `Approval Date: ${putApproval} Bonus Amount: ${putBonus}`;
      });
  };

  //-----------------All cards (browse cards)-------------------
  const fetchBrowse = () => {
    fetch(creditCardUrl)
      .then(jsonRes)
      .then((cards) => browseCards(cards));
    churnBody.innerText = "";
    // h2SectionHeader.innerText = "All Cards"
    // rightSideBar.innerHTML = ""
    const homeHeader = ce("h3");
    homeHeader.textContent = "All Cards";
    churnBody.append(homeHeader);
  };
  const browseCards = (cards) => {
    for (const aCard of cards) {
      renderBrowseCard(aCard);
    }
  };
  const renderBrowseCard = (aCard) => {
    // const cardDiv = qs("div#cards");
    const newCardDiv = ce("div");
    newCardDiv.dataset.num = aCard.id;

    if (newCardDiv.dataset.bookMark != null) {
      newCardDiv.dataset.bookMark = false;
    }

    // let str = (aCard.earn_description);
    // let str = eval(aCard.earn_description);
    // let newString = "";
    // for (const strings of str) {
    // 	newString += " " + strings.title;
    // }
    // console.log(newString);

    newCardDiv.innerHTML = `
      <h4> ${aCard.name} | Fee: $${aCard.annual_fee} &nbsp&nbsp
      <button id="bookmark-button" data-num=${aCard.id} data-book-mark=${aCard.is_bookedmarked}>Bookmark</button>
      </h4>
      
      <ul id=${aCard.id}></ul>
			`;
    // debugger;
    // descriptionMap(aCard.earn_description)
    // console.log(aCard.earn_description)
    // debugger

    churnBody.append(newCardDiv);
    let ul = document.getElementById(`${aCard.id}`);
    for (let i = 0; i < aCard.earn_description.length; i++) {
      let li = document.createElement("li");
      li.innerText = aCard.earn_description[i];
      ul.append(li);
    }
  };

  // ---------------------------Bookmarked Cards----------------------------

  const updateBookmark = (ccId, dataObject) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataObject),
    };
    fetch(`http://localhost:3000/credit_cards/${ccId}`, configObj)
      .then(jsonRes)
      .then((data) => {
        const ccId = data.id;
        const boolean = data.is_bookedmarked;
        const button = qs(`button[data-num="${ccId}"]`);
        button.setAttribute("data-book-mark", boolean);
        if (button.dataset.bookMark == "true") {
          button.textContent = "Bookmarked!";
        } else if (button.dataset.bookMark == "false") {
          button.textContent = "Bookmark";
        }
      });
  };

  const getBookmarks = () => {
    let currentUser = qs(".user-stats");
    let id = currentUser.getAttribute("data-id");
    fetch(creditCardUrl)
      .then(jsonRes)
      .then((cards) => renderBookmarks(cards));
    churnBody.innerText = "";
    // h2SectionHeader.innerText = "Your Bookmarks"
    const homeHeader = ce("h3");
    homeHeader.textContent = "Bookmarked";
    churnBody.append(homeHeader);
  };

  const renderBookmarks = (cards) => {
    const filteredCards = cards.filter((card) => {
      return card.is_bookedmarked == true;
    });
    for (const aCard of filteredCards) {
      renderBookmark(aCard);
      // console.log(aCard)
    }
  };
  const renderBookmark = (aCard) => {
    const newCardDiv = ce("div");
    newCardDiv.dataset.num = aCard.id;

    // if(newCardDiv.dataset.bookMark === null){
    //   newCardDiv.dataset.bookMark = false
    // }
    // //set a variable to boolean passed through
    let str = eval(aCard.earn_description);
    let newString = "";
    for (const strings of str) {
      newString += " " + strings.title;
    }

    newCardDiv.innerHTML = `
    <h4> ${aCard.name} | Fee: $${aCard.annual_fee} &nbsp&nbsp
    <button id="bookmark-button" data-num=${aCard.id} data-book-mark=${aCard.is_bookedmarked}>Bookmark</button>
    </h4>
    
    <h5>${newString}</h5>
    `;

    churnBody.append(newCardDiv);
  };

  // ----------------------User stats on right bar---------------------------
  const getUsers = () => {
    fetch(userUrl)
      .then(jsonRes)
      .then((users) => {
        for (const user of users) {
          renderUser(user);
        }
      });
  };
  const renderUser = (user) => {
    let currentUserStats = ce("div");
    currentUserStats.classList.add("user-stats");
    currentUserStats.setAttribute("data-id", `${user.id}`);
    currentUserStats.setAttribute("data-cash", `${user.accrued_cash}`);
    if (currentUserStats.dataset.cash === "null") {
      currentUserStats.dataset.cash = 0;
    }
    currentUserStats.setAttribute("data-points", `${user.accrued_points}`);
    if (currentUserStats.dataset.points === "null") {
      currentUserStats.dataset.points = 0;
    }
    // let dc1 = dc.dataset.cash
    rightSideBar.append(currentUserStats);
    let dc = qs(".user-stats");
    let dc1 = dc.dataset.cash;
    let dp = dc.dataset.points;

    // currentUserStats.innerHTML = `
    // Points: ${user.accrued_points} | Cash: $${user.accrued_cash}
    // `
    let displayDiv = ce("div");
    displayDiv.innerHTML = `Points: ${dp}  Cash: ${dc1}`;
    currentUserStats.append(displayDiv);
  };

  const submitHandler = () => {
    // add code to reset form
    // form.reset()
    // const pointsForm = qs("#accrued-points")
    // pointsForm.reset
    document.addEventListener("click", (e) => {
      e.preventDefault();
      let currentUser = qs(".user-stats");
      let id = currentUser.getAttribute("data-id");

      let currentCard = qs(".credit-card");

      // let ccId = currentCard.id

      if (e.target.matches("#add-points")) {
        let qsPointForm = qs("#accrued-points");
        let qsPointInput = qsPointForm.value;
        let pointsInput = parseInt(qsPointInput);
        let currentPoints = parseInt(currentUser.dataset.points);
        let totalPoints = pointsInput + currentPoints;
        let formData = { accrued_points: totalPoints };
        updateStashValues(id, formData);
        // qsPointForm.reset()
        // reset form
      } else if (e.target.matches("#add-cash")) {
        let qsCashInput = qs("#accrued-cash").value;
        let cashInput = parseInt(qsCashInput);
        let currentCash = parseInt(currentUser.dataset.cash);
        let totalCash = cashInput + currentCash;
        let formData = { accrued_cash: totalCash };
        updateStashValues(id, formData);
      } else if (e.target.matches("#approval-date-edit")) {
        let qsDateForm = e.target.previousElementSibling;
        let dateInput = qsDateForm.value;
        let ccId = e.target.name;
        let formData = { approval_date: dateInput };
        updateCard(ccId, formData);
      } else if (e.target.matches("#acquired-bonus")) {
        let qsBonus = e.target.previousElementSibling;
        let bonusInput = qsBonus.value;
        let ccId = e.target.name;
        let formData = { bonus_amount: bonusInput };
        updateCard(ccId, formData);
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
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:3000/users/${id}`, configObj)
      .then(jsonRes)
      .then((data) => {
        const dataId = data.id;
        const cash = data.accrued_cash;
        const putPoints = data.accrued_points;
        let stats = qs(`div[data-id="${dataId}"].user-stats`);
        stats.dataset.cash = cash;
        stats.dataset.points = putPoints;
        stats.innerText = `Points: ${putPoints} Cash: $${cash}`;
      });
  };

  const deleteCard = (editId, deleteButton) => {
    const option = { method: "DELETE" };
    fetch(`http://localhost:3000/user_credit_cards/${editId}`, option)
      // can't find id of association
      .then((data) => {
        deleteButton.parentElement.parentElement.remove();
      });
    // debugger
    // delete whole thing off DOM use traversal
  };

  const clickHandler = () => {
    // const navBar = qs(".nav");
    document.addEventListener("click", (e) => {
      if (e.target.matches(".nav-bar-home")) {
        fetchHome(); //add stash values here maybe
      } else if (e.target.matches(".nav-bar-my-cards")) {
        fetchCard(); //add edit functionalities (patch)
        //delete from my cards, expirations, sign-up date, notes
        //maybe eventually move the original forms to this page
        //needs a delete, create an edit button, which will patch data OBJ through
      } else if (e.target.matches(".nav-bar-browse-cards")) {
        fetchBrowse(); //add bookmark functionality -victor
      } else if (e.target.matches(".nav-bar-bookmarks")) {
        getBookmarks();
      } else if (e.target.matches(".nav-bar-perks")) {
        //same starter code as my cards, but displays global entry and insurance crap
      } else if (e.target.matches("#bookmark-button")) {
        let button = e.target;
        let cardId = button.dataset.num;
        let bookButton = button.dataset.bookMark; //is a string, needs to be boolean
        let cardBoolean = !bookButton; //makes it a boolean
        let cardBoolean1 = !cardBoolean; //flips it
        let dataObject = { is_bookedmarked: cardBoolean1 };
        updateBookmark(cardId, dataObject);
      } else if (e.target.matches(".edit-self-card")) {
        let deleteButton = e.target;
        let editId = deleteButton.dataset.num;
        deleteCard(editId, deleteButton);
      } else if (e.target.matches("#edit-owned-card")) {
        let editForm = false;

        //  debugger
        const editFormContainer = e.target; //nextelement (the container)

        editForm = !editForm;
        if (editForm) {
          editFormContainer.style.display = "block";
        } else {
          editFormContainer.style.display = "none";
        }
      }
      // } else if (e.target.matches(".nav-bar-spend")) {
      // } else if (e.target.matches(".nav-bar-settings")) {
      // } else if (e.target.matches(".nav-bar-notifications")) {
    });
  };
  submitHandler();
  clickHandler();
  getUsers();
});
