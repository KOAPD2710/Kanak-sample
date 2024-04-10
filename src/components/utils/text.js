import * as prismicH from "@prismicio/client";

const convertHighlight = (field) => {
    let htmlString = prismicH.asHTML(field).replace(/^<[^>]+>|<[^>]+>$/g, '')
    const replacer = (match, p1) => {
        return p1.split(' ').map(word => `<span class="txt-green">${word}</span>`).join(' ');
    };
    // Thực hiện thay thế
    return htmlString.replace(/<span class="Highlight">(.*?)<\/span>/g, replacer);
}

function convertDate(data) {
    let dateObject = new Date(data)
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[dateObject.getMonth()];
    let day = dateObject.getDate();
    let year = dateObject.getFullYear();
    return month + " " + day + ", " + year;
}

function cleanText(text) {
    if (typeof (text) === "string") {
        return cleanText(document.querySelectorAll(text));
    } else if (text[0] && text[0].innerHTML) {
        for (var i = 0; i < text.length; i++) {
            cleanText(text[i]);
        }
        return;
    }
    text.innerHTML = text.innerHTML.replace(/\-/g, "&#8209;").replace(/V/g, "&zwnj;V&zwnj;").replace(/\./g, "&zwnj;.&zwnj;").replace(/,/g, "&zwnj;,&zwnj;").replace(/A/g, "&zwnj;A&zwnj;").replace(/fi/g, "f&zwnj;i");
}
function parseUrl(url) {
    const [baseUrl, query] = url.split('?');
    const queryParams = query ? query.split('&') : [];

    let cate = '';
    let tag = '';

    queryParams.forEach(param => {
        const [key, value] = param.split('=');
        if (key === 'cate') {
            cate = value;
        } else if (key === 'tag') {
            tag = value;
        }
    });

    return { baseUrl, cate, tag };
}

function isEmpty(data) {
    if
        (data === null
        || (typeof data === 'undefined')
        || (typeof data === 'string' && data.trim().length === 0)
        || (typeof data === 'object' && Object.keys(data).length === 0)
        || (typeof data === 'number' && isNaN(data))
        || (typeof data === 'number' && !isFinite(data))
        || (Array.isArray(data) && data.length === 0))
        return true;

    return false;

}
function formatData(data) {
    return data && data.toLowerCase().replace(/ /g, "-").replace("&", "")
}
export { convertHighlight, convertDate, cleanText, parseUrl, isEmpty, formatData }


