import RepoItemComponent from '../utils/repo-item-component.js'
import { fetchGitHubProfile } from '../utils/graphql-service.js'
import '../css/styles.css'

export default class ProfilePage {

    constructor() {
        this.init()
    }

    setUserAvatar = () => {
        const avatars = document.querySelectorAll(".avatar");
        avatars.forEach((element) => {
            element.setAttribute("src", `${this.data.data.user.avatarUrl}`);
        });

    }

    setUserNameAndBio = () => {
        const profile = document.querySelector('.profile')
        const name = profile.querySelector('h2');
        const userName = profile.querySelector('.username');
        const bio = profile.querySelector('p:nth-of-type(2)');
        userName.textContent = this.data.data.user.login
        bio.textContent = this.data.data.user.bio
        name.textContent = this.data.data.user.name
    }

    setRepoCount = () => {
        const repoCount = document.querySelectorAll(".repo-count");
        repoCount.forEach((element) => {
            element.textContent = this.data.data.user.repositories.nodes.length;
        });

    }

    createRepoList = () => {
        const repositories = this.data.data.user.repositories.nodes;
        const repoContainer = document.querySelector(".repo-container");
        repositories.forEach((repository) => {
            repoContainer.appendChild(new RepoItemComponent(repository).createRepoItem());
        });

    }

    getUserRepoData = async () => {
        let path = window.location.search
        const user = new URLSearchParams(path).get('login')
        if (!user) {
            return window.location = "./"
        }
        try {
            this.data = await fetchGitHubProfile(user);
        } catch (err) {
            console.error('There was an error while loading the repo', err)
        }
    }

    init = async () => {
        await this.getUserRepoData();
        this.setRepoCount();
        this.setUserAvatar();
        this.setUserNameAndBio();
        this.createRepoList()
        this.initBehaviours()
    }

    initBehaviours() {
        const input = document.querySelector(".search input")
        input.addEventListener("click", () => {
            input.classList.add('focused')
        })
        input.addEventListener("blur", () => {
            input.classList.remove('focused')
        })
    }
}

new ProfilePage()