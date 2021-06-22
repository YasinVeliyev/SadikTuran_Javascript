export  const elements = {
    searchForm : document.getElementById('form-search'),
    searchInput : document.querySelector('#keyword'),
    searchResult : document.querySelector('#results'),
    movieDetails : document.querySelector("#movie-details"),
    movieDetailsContainer : document.querySelector("#movie-details-container"),
    movieListContainer : document.querySelector("#movie-list-container"),
    movieDetailClose : document.getElementById("movie-details-close"),
    movieListHeader : document.getElementById("movie-list-header")
}

export const renderLoader = parent => {
  let loader = `<div class="nb-spinner"></div>`
  parent.insertAdjacentHTML('afterbegin',loader)
}

export let clearLoader = parent => {
  let loader = parent.firstChild
  if(loader){
    parent.removeChild(loader)
  }
}

export const imageSize = {
    backdrop_sizes: [
        "w300",
        "w780",
        "w1280",
        "original"
      ],
      logo_sizes: [
        "w45",
        "w92",
        "w154",
        "w185",
        "w300",
        "w500",
        "original"
      ],
      poster_sizes: [
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original"
      ],
      profile_sizes: [
        "w45",
        "w185",
        "h632",
        "original"
      ],
      still_sizes: [
        "w92",
        "w185",
        "w300",
        "original"
      ]
}