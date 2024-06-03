export declare function transformToHTML(markdownString: string): string | Promise<string>;
type PDFFileName = `${string}.pdf` | "";
export declare function exportPDF(context: string, fileName?: PDFFileName): Promise<void>;
export {};
