import { elements } from "../base"

export let displayMovie = movie => {
    let genres = ""
    movie.genres.forEach(genre => {genres += `<span class='badge badge-primary ml-1'>${genre.name}</span>`})
    let html = `
        <div class="row">
            <div class="col-md-4">
                <img src="https://www.themoviedb.org/t/p/w500/${movie.poster_path}" class="mr-3 img-fluid" alt="${movie.title}" onerror = "this.src ='https://via.placeholder.com/500x638' ">
            </div>
            <div class="col-md-8">
                <div>
                    <h4>${movie.original_title}</h4>
                    <p>${movie.overview}</p>
                    <p><small class='badge badge-primary'>${movie.vote_average}</small></p>
                    <hr>
                    ${genres}
                </div>
            </div>
        </div>
    `
    elements.movieDetails.innerHTML = html
    elements.movieDetailsContainer.classList.add("d-block")
}

export const backToTop = () =>{
    window.scrollTo({top:0, behavior:"smooth"})
}

export let closeDetails = () => {
    elements.movieDetailsContainer.classList.remove('d-block')
}