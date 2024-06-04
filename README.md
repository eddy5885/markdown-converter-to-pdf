# markdown文本 转换为 pdf 导出工具


## 体验地址 
[https://eddy5885.github.io/markdown-to-pdf/](https://eddy5885.github.io/markdown-to-pdf/)

## 使用方法Usage

参考demo目录下面案例
```html
    <div>
        <button id="pdf">export to PDF</button>
    </div>
    <div style="text-align: center;">
        <textarea name="" id=""></textarea>
    </div>
```

```typescript
import { exportPDF } from "markdown-to-pdf";

const textarea = document.getElementsByTagName(
  "textarea"
)[0] as HTMLTextAreaElement;

const btn = document.getElementById("pdf") as HTMLButtonElement;

btn.addEventListener("click", async () => {
  const context = textarea.value;
  console.log('开始导出文件');
  await exportPDF(context);
  console.log('已完成导出文件');

});

```
## API
1. 将markdown文本转换为html

```typescript
function transformToHTML(markdownString: string): string | Promise<string>;

import { transformToHTML } from "markdown-to-pdf";

const html = transformToHTML(markdownStr)


```
2. 将markdown文本转换为pdf，并导出

```typescript
type PDFFileName = `${string}.pdf` | "";

function exportPDF(context: string, fileName?: PDFFileName): Promise<void>;

import { exportPDF } from "markdown-to-pdf";

// 如果fileName为空，则默认从markdown文本中从前往后查找一级到六级标题到内容，最先找到的作为标题
await exportPDF(markdownStr, 'React课件.pdf')


```

## Development

> npm install
> 
> npm run demo

