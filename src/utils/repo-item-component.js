
class RepoItemComponent {

    constructor(repository) {
        this.repository = repository
    }

    createIcon = (octicon) => {
        const icon = document.createElement('span')
        icon.className = "iconify"
        icon.setAttribute('data-icon', octicon);
        icon.setAttribute('data-inline', 'true');
        return icon
    }

    createIconTextGroup = (octicon, text) => {
        const spanGroup = document.createElement('span');
        spanGroup.classList = "span-icon-group"
        spanGroup.appendChild(this.createIcon(octicon))
        spanGroup.insertAdjacentText('beforeend', text)
        return spanGroup
    }

    createLanguageAndMetaSection = () => {
        const date = new Date(this.repository.updatedAt.slice(0, 10));
        const metaDataSection = document.createElement('div');
        const primaryLanguageGroup = document.createElement('span');
        const languageColor = document.createElement('span')
        const languageText = document.createElement('span')
        const updatedText = document.createElement('span')
        const updatedTimeText = document.createElement('span')
        metaDataSection.classList = 'f6 mt-10 repo-meta-section'
        primaryLanguageGroup.classList = "repo-language ml-0 mr-16"
        languageColor.classList = "repo-language-colour"
        if (this.repository.primaryLanguage) {
            languageColor.style.backgroundColor = this.repository.primaryLanguage.color;
            primaryLanguageGroup.appendChild(languageColor);
            languageText.textContent = this.repository.primaryLanguage.name;
            primaryLanguageGroup.appendChild(languageText);
            metaDataSection.appendChild(primaryLanguageGroup)
        }
        metaDataSection.appendChild(this.createIconTextGroup('octicon:star-16', this.repository.stargazerCount))
        metaDataSection.appendChild(this.createIconTextGroup('octicon:repo-forked-16', this.repository.forkCount))
        updatedText.innerText = "Updated on"
        updatedText.classList = "mr-5"
        updatedTimeText.innerText=  `${date.toLocaleString("default", {
            month: "short",
            day: "numeric",
        })}`
        metaDataSection.appendChild(updatedText)
        metaDataSection.appendChild(updatedTimeText)
        return metaDataSection
    }

    createRepoItem = () => {
        const repoItemContainer = document.createElement("div");
        const repoInformationWrapper = document.createElement("div")
        const repoStarWrapper = document.createElement("div")
        const starButton = document.createElement('button')
        const repoHeading = document.createElement('h3');
        const repoArchorLink = document.createElement('a');
        starButton.appendChild(this.createIcon('octicon:star-24'))
        starButton.insertAdjacentText('beforeend', 'Star')
        starButton.classList = 'btn btn-icon'
        repoItemContainer.className = "repo-item";
        repoHeading.classList = "repo-header mt-0 mb-0";
        repoArchorLink.setAttribute('href', this.repository.url);
        repoArchorLink.textContent = this.repository.name;
        repoHeading.appendChild(repoArchorLink)
        repoInformationWrapper.appendChild(repoHeading)
        repoInformationWrapper.appendChild(this.createLanguageAndMetaSection())
        repoStarWrapper.classList.add('text-right')
        repoStarWrapper.appendChild(starButton)
        repoItemContainer.appendChild(repoInformationWrapper)
        repoItemContainer.appendChild(repoStarWrapper)
        if (this.repository.description !== null) {
            const descriptionElement = document.createElement("p");
            descriptionElement.className = "repo-description mt-0";
            descriptionElement.textContent = this.repository.description;
            repoInformationWrapper.insertBefore(
                descriptionElement,
                repoInformationWrapper.querySelector("div")
            );
        }
        return repoItemContainer
    };
}

export default RepoItemComponent
