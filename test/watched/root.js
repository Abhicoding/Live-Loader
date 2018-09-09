function $(id) { return document.getElementById(id); }
function byClass (el, cl) { return el ? el.getElementsByClassName(cl) : [] }
function createTag (tag) {return document.createElement(tag)}
function setAttr (el, name, val) {return el.setAttribute(name, val)}
function appendChld (elp, elc) {return elp.appendChild(elc)}
function getTagEl (name) {return document.getElementsByTagName(name)}
function qSel (sel) {return document.querySelector(sel)}

var elementA = $('a')
var elementB = qSel('.b')
// var img = createTag('image')
setAttr(elementB, 'style', 'background-color: teal;')
setAttr(elementA, 'style', 'background-color: darkgrey;')
// console.log(img)
// setAttr(img, 'src', 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')
// appendChld(parent, img)
// console.log('x')

// Trying aksjdas asdkcabkjb aa adbsakjbkjsbakb
console.log('Abhc scakjb')