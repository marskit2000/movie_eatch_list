const moviesContainer = document.getElementById("movies-container")

let watchlistArray = JSON.parse(localStorage.getItem("watchlist"))

document.addEventListener("click", (e) => {

  if(e.target.dataset.imdbid){
    // console.log("ID: " + e.target.dataset.imdbid);
    const newWatchlistArray = watchlistArray.filter(movie => movie.imdbID != e.target.dataset.imdbid)
    watchlistArray = newWatchlistArray
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray))
    RenderMovies(watchlistArray)
  }

})


const RenderMovies = (movieArr) => {
  let watchlistHtml = ""

  if(movieArr.length > 0) {
    watchlistHtml = movieArr.map((movie) => {
      return `
        <div class="movie">
          <img class="movie-poster" src="${movie.Poster}">
          <div class="movie-info">
            <h3 class="movie-title">${movie.Title}<span class="movie-rating">${movie.imdbRating}</span></h3>
            <div class="movie-inner-info">
              <p>${movie.Runtime}</p>
              <p>${movie.Genre}</p>
              <button class="watchlist-btn" data-imdbid="${movie.imdbID}">- Remove</button>
            </div>
            <p class="movie-description">${movie.Plot}</p>
          </div>
        </div>
        <hr>
      `
    }).join("")
  }
  else{
    watchlistHtml = `
    <div class="watchlist-no-movie">
      <h2>Your watchlist is looking a little empty...</h2>
      <a href="./index.html" class="add-movie-link">+ Let's add some movies!</a>
    </div>
    `
  }


  moviesContainer.innerHTML = watchlistHtml

}

RenderMovies(watchlistArray)
