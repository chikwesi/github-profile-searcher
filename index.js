
// import ProfilePage from './modules/profile-page.js'
import { fetchUsersByUsername } from './modules/graphql-service.js'

export default class IndexPage {

  constructor() {
    this.data
    this.inputField = document.querySelector("input#username");
    this.submitButton = document.querySelector("button#submit")
    this.list = document.querySelector("ul#search-result")
    this.count = document.querySelector(".search-result__count")
    this.section = document.querySelector(".search-result-section")
    this.init()
  }

  initBehaviours() {
    this.submitButton.addEventListener("click", this.fetchUsers)

    this.inputField.addEventListener('keypress', async (e) =>
      e.key === 'Enter' && await this.fetchUsers());

    this.inputField.addEventListener('blur', async (e) => {
      this.section.classList.remove("search-result-section--visible")
    });
  }

  fetchUsers = async () => {
    try {
      this.submitButton.disabled = true
      this.data = await fetchUsersByUsername(this.inputField.value)
      if (this.data) {
        this.section.classList.add("search-result-section--visible")
        this.buildResultList(this.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      this.submitButton.disabled = false
    }
  }


  buildResultList = (data) => {
    this.list.innerHTML = ''
    const userCount = data.data.search.userCount
    this.count.textContent = userCount ? `${userCount} users match the search` : 'no match found'
    const results = data.data.search.nodes
    results.forEach((result) => {
      const listItem = document.createElement("li")
      const image = document.createElement("img")
      image.src = result.avatarUrl || '/assets/no-image.png'
      listItem.appendChild(image)
      const text = document.createTextNode(result.name ? result.name : result.login)
      listItem.appendChild(text)
      const link = document.createElement("a")
      link.className = 'btn'
      link.textContent = 'view'
      link.href = `/profile.html?login=${result.login}`
      listItem.appendChild(link)
      this.list.appendChild(listItem)
    })
  }

  async init() {
    this.initBehaviours()
  }

}

new IndexPage()
