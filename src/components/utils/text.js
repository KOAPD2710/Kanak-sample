import * as prismicH from "@prismicio/client";

const convertHighlight = (field) => {
    let htmlString = prismicH.asHTML(field).replace(/^<[^>]+>|<[^>]+>$/g, '')
    const replacer = (match, p1) => {
        return p1.split(' ').map(word => `<span class="txt-green">${word}</span>`).join(' ');
    };
    // Thực hiện thay thế
    return htmlString.replace(/<span class="Highlight">(.*?)<\/span>/g, replacer);
}
export { convertHighlight }


