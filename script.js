$('.search-button').on('click',function(){
  
  $.ajax({
    url: 'http://www.omdbapi.com/?apikey=58b399f2&s='+ $('.input-keyword').val(),
    success: results => {
      const movies = results.Search;
      let cards = '';
      movies.forEach(e => {
        cards += showCards(e);
      });
      $('#rows').html(cards);
  
      // ketika tombol detail di klik
      $('.modal-detail-button').on('click', function(){
        $.ajax({
          url: 'http://www.omdbapi.com/?apikey=58b399f2&i=' + $(this).data('imdbid'),
          success: m => {
            const movieDetail = showMovieDetail(m)
            $('.modal-body').html(movieDetail)
          },
          error: e => {
            console.log(e.responseText);
          }
        })
      });
    },
    error: (e) => {
      console.log(e.responseText);
    }
  
  })
})






function showCards(e){
  return `
    <div class="col-md-4 my-3">
      <div class="card">
        <img src="${e.Poster}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${e.Title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">${e.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${e.imdbID}">Show Details</a>
        </div>
      </div>
    </div>
  `;
}

function showMovieDetail(m){
  return `
<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${m.Poster}" class="img-fluid" />
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
        <li class="list-group-item"><strong>Rated: </strong> ${m.Rated}</li>
        <li class="list-group-item"><strong>Duration: </strong> ${m.Runtime}</li>
        <li class="list-group-item"><strong>Genre: </strong> ${m.Genre}</li>
        <li class="list-group-item"><strong>Director: </strong> ${m.Director}</li>
        <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
        <li class="list-group-item"><strong>IMDB Rating: </strong>${m.imdbRating}</li>
      </ul>
    </div>
  </div>
</div>
  `;
}