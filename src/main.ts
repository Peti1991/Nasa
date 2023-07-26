import "./style.css";
import http from "axios";
import { z } from "zod";

let image = document.getElementById("image") as HTMLImageElement;
let button = document.getElementById("button") as HTMLButtonElement;
let dateFromInput = document.getElementById("dateFrom") as HTMLInputElement;
let dateUntilInput = document.getElementById("dateUntil") as HTMLInputElement;
let title = document.getElementById("title") as HTMLHeadingElement;
let explanation = document.getElementById(
  "explanation"
) as HTMLParagraphElement;
let gallery = document.getElementById("gallery") as HTMLDivElement

const NasaResponseSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string(),
  media_type: z.string(),
  service_version: z.string(),
  title: z.string(),
  url: z.string(),
}).array();

type NasaData = z.infer<typeof NasaResponseSchema>;

async function load(start_date:string, end_date:string):Promise<null | NasaData> {
  let response = await http.get("https://api.nasa.gov/planetary/apod", {
    params: {
      api_key: "418yCFUIF0MX0Q90XzpHhT84h2iWxhksYsCUvvGW",
      start_date: start_date,
      end_date: end_date,
    },
  });
  let data = response.data;

  let result = NasaResponseSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error);
    return null;
  }

  return data
}

function addContent(data: NasaData) {
  gallery.innerHTML = ""
  for(let i = 0; i < data.length; i++){
    gallery.insertAdjacentHTML("beforeend", "<img " + `id=img${i+1}` + " src='" + data[i].url + "'/>")
    document.getElementById(`img${i+1}`)!.addEventListener("click", () => {changeContent(data, i)})
    console.log(document.getElementById(`img${i+1}`))
  }

  changeContent(data, 0)
}

function changeContent(data: NasaData, i:number) {
  image.src = data[i].url
  title.innerHTML = data[i].title
  explanation.innerHTML = data[i].explanation;
}

button.addEventListener("click", async () => {
  let data = await load(dateFromInput.value, dateUntilInput.value)
  if (data) {
    addContent(data)
  }
});



