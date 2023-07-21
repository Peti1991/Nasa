let image = document.getElementById("image") as HTMLImageElement
let button = document.getElementById("button") as HTMLButtonElement
let dateInput = document.getElementById("date") as HTMLInputElement
let title = document.getElementById("title") as HTMLHeadingElement
let explanation = document.getElementById("explanation") as HTMLParagraphElement



type NasaData = {
    "date": string,
    "explanation": string,
    "hdurl": string,
    "media_type": string,
    "service_version": string,
    "title": string
    "url": string
}

function render(data:NasaData) {
    image.src = data.url
    title.innerHTML = data.title
    explanation.innerHTML = data.explanation
}

async function getNasaData() {
    let api_key = "418yCFUIF0MX0Q90XzpHhT84h2iWxhksYsCUvvGW"
    let date = dateInput.value
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`)
    let data = await response.json()
    return data
}

async function loadData() {
    let data = await getNasaData()
    render(data)
}

button.addEventListener("click", loadData)

