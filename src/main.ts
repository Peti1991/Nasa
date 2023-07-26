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

async function load():Promise<null> {
  let response = await http.get("https://api.nasa.gov/planetary/apod", {
    params: {
      api_key: "418yCFUIF0MX0Q90XzpHhT84h2iWxhksYsCUvvGW",
      start_date: dateFromInput.value,
      end_date: dateUntilInput.value,
    },
  });
  let data = response.data;

  let result = NasaResponseSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error);
    return null;
  }
  addContent(data);
  return null
}

function addContent(data: NasaData) {
  let content = ""
  for(let i = 0; i < data.length; i++){
    content += "<img " + `id=img${i+1}` + " src='" + data[i].url + "'/>"
  }
  gallery.innerHTML = content

  for(let i = 0; i < data.length; i++){
    document.getElementById(`img${i+1}`)?.addEventListener("click", () => {changeContent(data, i)})
  }

  image.src = data[0].url
  title.innerHTML = data[0].title
  explanation.innerHTML = data[0].explanation;
}

function changeContent(data: NasaData, i:number) {
  image.src = data[i].url
  title.innerHTML = data[i].title
  explanation.innerHTML = data[i].explanation;
}

button.addEventListener("click", load);



