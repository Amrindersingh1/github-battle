export function fetchPopularRepos (language) {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${languages[language]}&sort=stars&order=desc&type=Repositories`)
  
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) {
          throw new Error(data.message)
        }
  
        return data.items
      })
  } 