const searchBtn = document.getElementById('search-btn')
const watchlistBtn = document.getElementById('watchlist-btn')
const movieTitle = document.getElementById('search-input')
const moviesContainer = document.getElementById("movies-container")

let moviesArray = []
let moviesHtml = ""
let watchlistArray = []

if(localStorage.getItem("watchlist")) {
  watchlistArray = JSON.parse(localStorage.getItem("watchlist"))
}

searchBtn.addEventListener("click", handleClick)

// watchlistBtn.addEventListener("click", () => {
//   console.log(JSON.parse(localStorage.getItem("watchlist")))
// })


document.addEventListener("click", (e) => {

  if(e.target.dataset.imdbid){
    // console.log("ID: " + e.target.dataset.imdbid);
    for(let movie of moviesArray) {
      if(movie.imdbID == e.target.dataset.imdbid) {
        const alreadyInWatchList = watchlistArray.find((m) => {
          return m.imdbID == movie.imdbID
        })

        if(!alreadyInWatchList) {
          watchlistArray.push(movie)
          localStorage.setItem("watchlist", JSON.stringify(watchlistArray))
        }
        else {
          console.log("Already Added Movie To Watchlist")
        }

      }
    }
  }


})



function handleClick(e) {
  e.preventDefault()
  moviesArray = []
  moviesHtml = ""

  fetch(`http://www.omdbapi.com/?apikey=618d1d9d&s=${movieTitle.value}&plot=full`)
    .then(res => res.json())
    .then(data => {

      const movies = data.Search.filter(movie =>{
        return movie.Type === 'movie'
      })
      // console.log(movies)

      for ( let movie of movies) {
        fetch(`http://www.omdbapi.com/?apikey=618d1d9d&i=${movie.imdbID}&plot=full`)
          .then(res=>res.json())
          .then(movieData=> {
            moviesArray.push(movieData)

            moviesHtml += `
              <div class="movie">
                <img class="movie-poster" src="${movieData.Poster}">
                <div class="movie-info">
                  <h3 class="movie-title">${movieData.Title}<span class="movie-rating">${movieData.imdbRating}</span></h3>
                  <div class="movie-inner-info">
                    <p>${movieData.Runtime}</p>
                    <p>${movieData.Genre}</p>
                    <button class="watchlist-btn" data-imdbid="${movie.imdbID}">+ Watchlist</button>
                  </div>
                  <p class="movie-description">${movieData.Plot}</p>
                </div>
              </div>
              <hr>
            `
          })
      }

      setTimeout(()=>{
        console.log(moviesArray)
        moviesContainer.innerHTML = moviesHtml
      }, 1000)


      // const moviesArray = movies.map(movie => {
      //   let movieHtml
      //
      //   let rating
      //   let runtime
      //   let genre
      //   let description
      //
      //   fetch(`http://www.omdbapi.com/?apikey=618d1d9d&i=${movie.imdbID}&plot=full`)
      //     .then(res=>res.json())
      //     .then(movieData=> {
      //       rating = movieData.imdbRating
      //       runtime = movieData.Runtime
      //       genre = movieData.Genre
      //       description = movieData.Plot
      //
      //       const newMovie = new Movie(movieData)
      //       console.log(newMovie)
      //
            // moviesHtml += `
            //   <div class="movie">
            //     <img class="movie-poster" src="${movie.Poster}">
            //     <div class="movie-info">
            //       <h3 class="movie-title">${movie.Title}<span class="movie-rating">${rating}</span></h3>
            //       <div class="movie-inner-info">
            //         <p>${runtime}</p>
            //         <p>${genre}</p>
            //         <button class="watchlist-btn" data-imdbid="${movie.imdbID}">Watchlist</button>
            //       </div>
            //       <p class="movie-description">${description}</p>
            //     </div>
            //   </div>
            //   <hr>
            // `
      //        console.log(moviesHtml)
      //
      //        moviesContainer.innerHTML = moviesHtml
      //       return movieHtml
      //
      //     }) //movies.map => 2nd.then
      // }) //movies.map
    }) //2nd.then
}
