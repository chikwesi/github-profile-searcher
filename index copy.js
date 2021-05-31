
// import ProfilePage from './modules/profile-page.js'
import { fetchUsersByUsername } from './modules/graphql-service.js'

let data;

const inputField = document.querySelector("input#username");
const submitButton = document.querySelector("button#submit")
const list = document.querySelector("ul#search-result")
const count = document.querySelector(".search-result__count")
const section = document.querySelector(".search-result-section")

const fetchUsers = async () => {
  try {
    submitButton.disabled = true
    data = await fetchUsersByUsername(inputField.value)
    buildResult(data)
  } catch (err) {
    console.error(err)
  } finally {
    submitButton.disabled = false
  }
}

submitButton.addEventListener("click", fetchUsers)

inputField.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    await fetchUsers();
  }
});

inputField.addEventListener('blur', async (e) => {
  section.style.visibility = "hidden"
});


console.log(inputField, submitButton)

const buildResult = (data) => {
  if (data) {
    section.style.visibility = "visible"
  }
  list.innerHTML = ''
  let userCount = data.data.search.userCount
  count.textContent = userCount ? `${userCount} users match the search` : 'no match found'
  let results = data.data.search.nodes
  results.forEach((result) => {
    let listItem = document.createElement("li")
    let img = document.createElement("img")
    img.src = result.avatarUrl
    listItem.appendChild(img)
    let text = document.createTextNode(result.name ? result.name : result.login)
    listItem.appendChild(text)
    let link = document.createElement("a")
    link.textContent = 'view'
    link.href = `/profile.html?login=${result.login}`
    listItem.appendChild(link)
    list.appendChild(listItem)
  })
}
