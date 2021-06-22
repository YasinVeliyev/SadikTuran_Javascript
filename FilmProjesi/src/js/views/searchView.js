import { elements } from "../base";

export const clearInput = () => {
    elements.searchInput.value = ''
}

export const clearResults = () => {
    elements.searchResult.innerHTML = ''
}

export const displayResults = (keyword, movies) => {
    movies.results.forEach(movie => {
        let html = `
            <li class="media mb-3">
                <img src="https://www.themoviedb.org/t/p/w92/${movie.poster_path}" class="mr-3" alt="${movie.title}" onerror = "this.src ='https://via.placeholder.com/92x138' ">
                <div class="media-body">
                    <h5 class="mt-0 mb-1">
                        <span class='badge badge-primary'>${movie.vote_average}</span>
                        <a href="#${movie.id}">${movie.title}</a>
                    </h5>
                    <p>${movie.overview}</p>
                </div>
            </li>`
        elements.searchResult.innerHTML += html
        elements.movieListContainer.classList.add('d-block')
        elements.movieListHeader.innerHTML = `${keyword} aramasında ${movies.total_results} sonuc bulundu`
        })
}