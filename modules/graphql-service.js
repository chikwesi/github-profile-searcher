const config = {
    TOKEN: "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",
};

const baseUrl = "https://api.github.com/graphql";

const graphqlHttpClient = async (requestBody) => {
    return await fetch(baseUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    })
}

const userProfileQuery = (username) => ({
    query: `
          query{
              user(login: "${username}"){
                  avatarUrl,
                  bio,
                  name,
                  login
                  repositories(first: 20 orderBy: {field: CREATED_AT, direction: DESC}){
                      nodes{
                          name,
                          description,
                          updatedAt,
                          url,
                          stargazerCount,
                          forkCount
                          primaryLanguage{
                              name,
                              color
                          }
                      }
                  }
              }
          }
    `,
});


const findUsersByUsernameQuery = (userName) => ({
    query: `
        query {
        search(query:"${userName}",type:USER, first:5) {
            userCount
          nodes{
            ...on User{
              name
              login
              email
              createdAt
              avatarUrl
            }
        }
          issueCount
          pageInfo{
            hasNextPage
          }
        }
      }
    `,
});

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config["TOKEN"]}`,
};

const fetchGitHubProfile = async (username="chikwesi") => {
    let data = await graphqlHttpClient(userProfileQuery(username))
    return data.json()
}

const fetchUsersByUsername = async (username) => {
    const data = await graphqlHttpClient(findUsersByUsernameQuery(username))
    return data.json()
}

export { fetchGitHubProfile, fetchUsersByUsername };