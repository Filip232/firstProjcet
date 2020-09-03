import '../styles/main.scss'

if (process.env.NODE_ENV !== 'production') {
  require('./details.pug')
}

const getNote = id => {
  return fetch('http://localhost:4000/details/' + id)
    .then(res => res.json())
    .then(data => {
      let div = document.createElement('div')
      div.id = data.id + 'div'
      document.body.appendChild(div)
      let box = document.getElementById(data.id + 'div')
      let p = document.createElement('p')
      p.textContent = data.text
      box.appendChild(p)
    })
}

let dupa = window.location.href
let short = dupa.substring(dupa.indexOf('=') + 1, dupa.length)

getNote(short)
