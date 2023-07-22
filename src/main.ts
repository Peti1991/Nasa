import "./style.css";
import http from "axios";
import { z } from "zod";

let image = document.getElementById("image") as HTMLImageElement;
let button = document.getElementById("button") as HTMLButtonElement;
let dateInput = document.getElementById("date") as HTMLInputElement;
let title = document.getElementById("title") as HTMLHeadingElement;
let explanation = document.getElementById(
  "explanation"
) as HTMLParagraphElement;

const NasaResponseSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string(),
  media_type: z.string(),
  service_version: z.string(),
  title: z.string(),
  url: z.string(),
});

type NasaData = z.infer<typeof NasaResponseSchema>;

function render(data: NasaData) {
  image.src = data.url;
  title.innerHTML = data.title;
  explanation.innerHTML = data.explanation;
}

async function load() {
  let response = await http.get("https://api.nasa.gov/planetary/apod", {
    params: {
      api_key: "418yCFUIF0MX0Q90XzpHhT84h2iWxhksYsCUvvGW",
      date: dateInput.value,
    },
  });
  let data = response.data;

  let result = NasaResponseSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error);
    return null;
  }
  render(data);
}

button.addEventListener("click", load);
