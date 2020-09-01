import '../styles/main.scss'

if (process.env.NODE_ENV !== 'production') {
  require('../index.pug')
}

const getNotes = () => {
  return fetch('http://localhost:4000/notes')
    .then(res => res.json())
    .then(data => {
      data.forEach(element => {
        let p = document.createElement('p')
        p.textContent = element.text
        document.body.appendChild(p)
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
