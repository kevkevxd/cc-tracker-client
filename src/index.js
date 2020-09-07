document.addEventListener("DOMContentLoaded", () =>{

    const Fetcheroo = new FetchAdapter("https://localhost:3000/");

    const getUsersCallback = users => users.forEach(console.log*("users"))
    const getCreditCardsCallback = creditCards => creditCards.forEach(console.log*("ccs"))

    Fetcheroo.get("users", getUsersCallback)
    Fetcheroo.get("creditcards", getCreditCardsCallback)

})

// submit listener for user information
// post to my information list

document.addEventListener("submit", e => {
    e.preventDefault()
    const pointsForm = document.querySelector("#create-points-form")
    if(e.target === pointsForm){
        const pointInput = document.querySelector("#accrued-points").value
        const pointLi = document.createElement("li")
        pointLi.textContent = pointInput

        const informationUl = document.querySelector("#information")
        informationUl.append(pointLi)
        form.reset()
    }

})