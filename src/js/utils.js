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
export { dom, addEvent, addEventAll, getIndex }