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
export function transformToHTML(markdownString) {
    return marked(markdownString);
}
export async function exportPDF(context, fileName) {
    if (context) {
        context = context.trim();
    }
    const html = marked(context);
    const css = `  
    <style>
    body {
      margin: 3px;
      padding: 0px;
    }
    h1 {  
      font-size: 32px;  
    } 
    h2 {  
      font-size: 30px;  
    } 
    h3 {  
      font-size: 28px;  
    }
    h4 {  
      font-size: 26px;  
    }  
    h5 {  
      font-size: 25px;  
    }
    h6 {  
      font-size: 24px;  
    }
    table {  
      width: 100%;  
      border-collapse: collapse;  
    }  
      
    th {  
      background-color: #f2f2f2;  
      text-align: left;  
      padding: 8px;  
      font-weight: bold;  
      border: 1px solid #ddd;  
    }  
      
    tr:nth-child(even) {  
      background-color: #f9f9f9;  
    }  
      
    td {  
      padding: 8px;  
      text-align: left;  
      border: 1px solid #ddd;  
    }  
    pre {
      background: #f6f8fa;
      padding: 10px;
      margin: 10px;
      border-radius: 15px;
    }

    </style>  
    `;
    const tempElement = document.createElement("div");
    tempElement.innerHTML = css + html;
    // console.log(tempElement);
    if (!fileName) {
        const titleTag = tempElement.getElementsByTagName("h1") ||
            tempElement.getElementsByTagName("h2") ||
            tempElement.getElementsByTagName("h3") ||
            tempElement.getElementsByTagName("h4") ||
            tempElement.getElementsByTagName("h5") ||
            tempElement.getElementsByTagName("h6") ||
            tempElement.getElementsByTagName("div") ||
            tempElement.getElementsByTagName("p");
        titleTag[0]?.innerText
            ? (fileName = `${titleTag[0]?.innerText}.pdf`)
            : (fileName = "demo.pdf");
    }
    const imageTags = tempElement.getElementsByTagName("img");
    const imagesObj = {};
    [...imageTags].map((item) => {
        const src = item.getAttribute("src");
        if (src && !src.startsWith("data:image")) {
            imagesObj[src] = src;
        }
    });
    for (let i in imagesObj) {
        const base64 = await convertImageToBase64(i);
        imagesObj[i] = base64;
    }
    tempElement.innerHTML = tempElement.innerHTML.replace(/<img[^>]*>/gi, function (match, capture) {
        const src = match.match(/src="([^"]*)"/)[1];
        return `<img src="${imagesObj[src]}"/>`;
    });
    html2pdf().from(tempElement).save(fileName);
}
