import { exportPDF,transformToHTML } from "markdown-to-pdf";

const textarea = document.getElementsByTagName(
  "textarea"
)[0] as HTMLTextAreaElement;

const btn = document.getElementById("pdf") as HTMLButtonElement;

btn.addEventListener("click", async () => {
  const context = textarea.value;
  console.log(transformToHTML(context));
  console.log('开始导出文件');
  await exportPDF(context);
  console.log('已完成导出文件');

});
