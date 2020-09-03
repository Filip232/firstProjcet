import './styles/main.scss'

if (process.env.NODE_ENV !== 'production') {
  require('./index.pug')
}

let multiNotes = []

const getNotes = () => {
  return fetch('http://localhost:4000/notes')
    .then(res => res.json())
    .then(data => {
      data.forEach(element => {
        let div = document.createElement('div')
        div.id = element.id + 'div'
        document.body.appendChild(div)
        let box = document.getElementById(element.id + 'div')
        let p = document.createElement('p')
        p.textContent = element.text
        let trash = document.createElement('button')
        trash.textContent = 'Delete'
        trash.setAttribute('data-Id', element.id)
        box.appendChild(p)
        box.appendChild(trash)
        let anchor = document.createElement('a')
        anchor.textContent = 'Details'
        anchor.setAttribute('href', '/details?id=' + element.id)
        box.appendChild(anchor)
        let checkboxbutton = document.createElement('button')
        checkboxbutton.setAttribute('class', 'checkbox')
        box.appendChild(checkboxbutton)
        trash.addEventListener('click', () => {
          removeNote(trash.getAttribute('data-Id'))
          location.reload()
        })
        checkboxbutton.addEventListener('click', () => {
          if (multiNotes.indexOf(element.id) === -1) {
            multiNotes.push(element.id)
          } else {
            multiNotes.splice(multiNotes.indexOf(element.id), 1)
          }
          console.log(multiNotes)
        })
      })
    })
    .catch(() => console.log('ERROR'))
}

getNotes()

const addNotes = post => {
  const options = {
    method: 'POST',
    body: JSON.stringify(post),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }

  return fetch('http://localhost:4000/notes/new', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(() => console.log('ERROR'))
}

const submitButton = document.getElementById('addnew')
submitButton.addEventListener('click', () => {
  const inputPost = document.getElementById('text').value
  const post = {
    text: inputPost
  }
  addNotes(post)
  location.reload()
})

const removeNote = id => {
  const options = {
    method: 'DELETE'
  }
  return fetch('http://localhost:4000/notes/' + id, options)
    .catch(() => console.log('ERROR'))
}

const deleteAll = document.getElementById('deleteAll')
deleteAll.addEventListener('click', () => {
  for (let i = 0; i < multiNotes.length; i++) {
    removeNote(multiNotes[i])
  }
  location.reload()
})
