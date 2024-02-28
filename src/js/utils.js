const dom = (el, toEl = true) => {
    let allEl = document.querySelectorAll(el)
    if (allEl.length === 1) {
        return toEl ? allEl[0] : allEl
    } else {
        return allEl
    }
}

const addEvent = (el, event, callback) => {
    el.addEventListener(event, callback)
}
const addEventAll = (arr, event, callback) => {
    arr.forEach(el => {
        el.addEventListener(event, callback)
    })
}
const getIndex = (el) => {
    if (typeof el !== 'string') {
        return [...el.parentNode.children].indexOf(el)
    } else {
        return [...dom(el).parentNode.children].indexOf(dom(el))
    }
}
const offset = (el) => {
    let box = el.getBoundingClientRect();
    let docElem = document.documentElement;
    return {
      top: box.top + window.scrollY - docElem.clientTop,
      left: box.left + window.scrollX - docElem.clientLeft
    };
}
const parseRem = (input) => {
    return input / 10 * parseFloat(window.getComputedStyle(dom('html')).getPropertyValue("font-size"));
}
export { dom, addEvent, addEventAll, getIndex, offset, parseRem }