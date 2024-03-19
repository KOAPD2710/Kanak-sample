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
export { convertHighlight, convertDate }


