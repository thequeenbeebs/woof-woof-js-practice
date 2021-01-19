let button = document.getElementById('good-dog-filter')

document.addEventListener('DOMContentLoaded', () => {
    fetchPups()
    document.getElementById("good-dog-filter").addEventListener('click', () => filterDogs())
})

function fetchPups() {
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(pups => {
            let button = document.getElementById('good-dog-filter')
            document.getElementById("dog-bar").innerText = ""
            if (button.innerText === "Filter good dogs: OFF"){
                pups.forEach(pup => renderPup(pup))
            } else {
                let filtered = pups.filter(pup => pup.isGoodDog === true)
                filtered.forEach(pup => renderPup(pup))
            }
            
        })
}

function renderPup(pup) {
    let pupContainer = document.getElementById("dog-bar")

    let pupSpan = document.createElement('span')
        pupSpan.innerText = pup.name
        pupSpan.addEventListener('click', () => pupInfo(pup))

    pupContainer.append(pupSpan)
}

function pupInfo(pup) {
    let infoContainer = document.getElementById("dog-info")
        infoContainer.innerText = ""

    let img = document.createElement('img')
        img.src = pup.image

    let name = document.createElement('h2')
        name.innerText = pup.name

    let btn = document.createElement('button')
        if (pup.isGoodDog === true) {
            btn.innerText = "Good Dog!"
        } else {
            btn.innerText = "Bad Dog!"
        }
        btn.addEventListener('click', () => changeStatus(pup))
    
    infoContainer.append(img, name, btn)
}

function changeStatus(pup){
    let newResponse
    if (pup.isGoodDog === true) {
        newResponse = false
    } else {
        newResponse = true
    }

    let newStatus = {
        isGoodDog: newResponse
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(newStatus)
    }

    fetch(`http://localhost:3000/pups/${pup.id}`, reqPack)
        .then(resp => resp.json())
        .then(data => {
            pupInfo(data)
        })
}

function filterDogs() {
    let button = document.getElementById('good-dog-filter')
    if (button.innerText === "Filter good dogs: OFF") {
        button.innerText = "Filter good dogs: ON"
    } else {
        button.innerText = "Filter good dogs: OFF"
    }
    fetchPups()
}