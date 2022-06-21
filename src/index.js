let addToy = false;
const url = "http://localhost:3000/toys/"
const parentContainer = document.querySelector("#toy-collection")
const form = document.querySelector("form")


document.addEventListener("DOMContentLoaded", () => {
  renderToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
form.addEventListener("submit", addToy)
function addToy(event) {
  console.log(event.target)
}
function renderToys() {
  //When the page loads, make a 'GET' request to fetch all the toy objects.
  fetch(url)
    .then((response) => response.json())
    .then(responseJson => {
      responseJson.forEach(toy => {
        const div = document.createElement("div")
        div.classList.add("card");
        parentContainer.appendChild(div)

        const h2 = document.createElement("h2")
        div.appendChild(h2)
        h2.innerText = toy.name

        const img = document.createElement("img")
        img.src = toy.image
        img.classList.add("toy-avatar")
        div.appendChild(img)

        const p = document.createElement("p")
        p.innerText = `Liked ${toy.likes} times`
        div.appendChild(p)

        const btn = document.createElement("button")
        btn.classList.add("like-btn")
        btn.setAttribute("id", toy.id)
        div.appendChild(btn)
        btn.innerText = "Like ❤️"
        btn.addEventListener("click", clickLike)
        console.log(toy)
      })
    });
  function clickLike(event) {
    console.log(event.target)
  }
  // With the response data, make a <div class="card"> for each toy 
  // add it to the toy-collection div.

}