document.addEventListener("DOMContentLoaded", () =>{
const baseUrl = "https://localhost:3000/"

    const exampleFetchAdapter = new FetchAdapter("https://localhost:3000/")

    const thingWeWantToDo = users => users.forEach(console.log)

    exampleFetchAdapter.get("users", users. thingWeWantToDo)

})

    