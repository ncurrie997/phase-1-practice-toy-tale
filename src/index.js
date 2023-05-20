let addToy = false;
const toyCollectionSelector =  document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", () => {

  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => {
      // create DOM element with array
      let toysHTML = toys.map(function(toy) {
        return `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button data-id="${toy.id}" class="like-btn">Like ❤️</button>
          </div>
          `
          
      })
      toyCollectionSelector.innerHTML = toysHTML.join('')
    })

    //POST 
    toyFormContainer.addEventListener("submit", function(e) {
      e.preventDefault()
      console.log(e.target.name)

      const toyName = e.target.name.value
      const toyImage = e.target.image.value
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyName,
          image: toyImage,
          likes: 0,
        })
      })
      .then( res => res.json())
      .then( newToy => {
        //UPDATE the DOM
        let newToyHTML = `
        <div class="card">
          <h2>${newToy.name}</h2>
          <img src=${newToy.image} class="toy-avatar" />
          <p>${newToy.likes} Likes </p>
          <button data-id="${newToy.id}" class="like-btn">Like ❤️</button>
          </div>
          `

          toyCollectionSelector.innerHTML += newToyHTML
          //Resets the From after submit
          e.target.reset()

      })
    })

    // Likes Button Update
    toyCollectionSelector.addEventListener("click", (e) => {
      if (e.target.className === "like-btn") {
         
        let currentLikes = parseInt(e.target.previousElementSibling.innerText)
        let newLikes = currentLikes + 1
        e.target.previousElementSibling.innerText = newLikes + " Likes"

        fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            likes: newLikes
          })
        })
        
      }

    })
})

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