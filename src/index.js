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
form.addEventListener("submit", addNewToy);

function addNewToy(event) {
  //A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
  event.preventDefault();
  console.log(event.target.name.value)
  console.log(event.target.image.value)
  fetch(url, {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": event.target.name.value,
      "image": event.target.image.value,
      "likes": 0
    })
  })
    .then(response => response.json())
    .then((response) => console.log(response))
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
    //capture that toy's id,
    const id = event.target.getAttribute("id")
    //calculate the new number of likes,
    fetch(`${url}/${id}`, {
      method: "PATCH",
      body:JSON.stringify({likes:+1})
      ,
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(res => console.log(res))
    //submit the patch request, and
    //update the toy's card in the DOM based on the Response returned by the fetch request.

  }
  // With the response data, make a <div class="card"> for each toy 
  // add it to the toy-collection div.

}