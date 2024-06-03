import { exportPDF,transformToHTML } from "../dist/esm/index.js";

const textarea = document.getElementsByTagName(
  "textarea"
)[0] as HTMLTextAreaElement;

const btn = document.getElementById("pdf") as HTMLButtonElement;

btn.addEventListener("click", () => {
  const context = textarea.value;
  console.log(transformToHTML(context));
  exportPDF(context);
});
