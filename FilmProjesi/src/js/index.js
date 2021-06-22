//api : 4c3551cd7676af815797571ff7948dd3
//url : https://api.themoviedb.org/3
// https://api.themoviedb.org/3/search/movie?api_key=4c3551cd7676af815797571ff7948dd3&language=en-US&query=abc&page=1&include_adult=false

import Search from './models/Search'
import Movie from './models/Movie'
import {elements, renderLoader, clearLoader} from './base';
import * as searchView from "./views/searchView"
import * as movieView from "./views/movieViews"

const state = {}
const searchController = async () => {
    const keyword = elements.searchInput

    if(keyword){
        state.search = new Search(keyword.value)
        await state.search.getResults()
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchResult)
        searchView.displayResults(state.search.keyword,state.search.data)
        clearLoader(elements.searchResult)
    }
    else{
        alert('Anahtar kelime girmelisiniz')
    }
}

// const search = new Search('abc')

// console.log(search.getResults())

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault()
    searchController()
})

// const movie = new Movie(252291)
// movie.getMovie()

const movieController = async () => {
    const id = Number(window.location.hash.replace("#",""))
    state.movie = new Movie(id)
    await state.movie.getMovie()
    movieView.backToTop();
    movieView.displayMovie(state.movie.data)
}

window.addEventListener('hashchange', movieController)
elements.movieDetailClose.addEventListener('click', movieView.closeDetails)