import { marked } from "marked";

import html2pdf from "html2pdf.js";

function convertImageToBase64(url) {
  return new Promise((resolve, reject) => {
    // 1. 创建一个Image对象
    const image = new Image();
    image.crossOrigin = "Anonymous"; // 如果图片是跨域的，请设置此属性

    // 2. 当图片加载完成时，使用canvas将其转换为Base64
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);

      const base64 = canvas.toDataURL();
      resolve(base64);
    };

    // 3. 处理加载错误
    image.onerror = (error) => {
      //   reject(error);
      resolve("");
    };

    // 4. 设置图片的URL以开始加载
    image.src = url;
  });
}

export async function exportPDF(context, fileName) {
  const html = marked(context);
  // 添加外联样式
  const css = `  
    <style>  
    h1 {  
    color: red;  
    font-size: 32px;  
    }  
    pre {
    background: #f6f8fa;
    padding: 10px;
    margin: 10px;
    border-radius: 15px;
    }
    p {
    color: #333;
    }
    </style>  
    `;
  // console.log(html)
  const tempElement = document.createElement("div");
  tempElement.innerHTML = css + html;
  console.log(tempElement);
  const tagsA = tempElement.getElementsByTagName("img");
  console.log(tagsA);
  const images = {};
  tagsA.forEach((item) => {
    const src = item.getAttribute("src");
    console.log("src", src);
    images[src] = "";
  });

  const promises = [];
  for (let i in images) {
    // const img = new Image();
    // img.src = images[i];
    // images.onload = function () {
    //   console.log("图片加载完成");
    // };
    const base64 = await convertImageToBase64(i);
    images[i] = base64;
  }
  tempElement.innerHTML = tempElement.innerHTML.replace(
    /<img[^>]*>/gi,
    function (match, capture) {
      const src = match.match(/src="([^"]*)"/)[1];
      return `<img src="${images[src]}"/>`;
    }
  );

  html2pdf().from(tempElement).save(fileName);
}
