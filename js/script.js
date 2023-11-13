    function searchMovies() {
      const genre = document.getElementById('movieInput').value;
     console.log(genre);
    if (genre === '') {
        console.log('Por favor, insira um gênero.');
        return;
      }
      var genreId= searchgenres(genre);
      console.log(genreId);
      const apiKey = '32c07956aa06ecee35ca79f10d439001';
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          displayMovies(data.results);
        })
        .catch(error => {
          console.error('Erro ao buscar filmes:', error);
        });
    }

    function displayMovies(movies) {
      const movieList = document.getElementById('movieList');
      movieList.innerHTML = '';

      movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = movie.title;
        movieList.appendChild(listItem);
      });
    }

    function searchgenres(genre){
        var genreId;
        switch(genre){
            case 'ação':
                genreId=28;break;
                
            case 'terror':
                genreId=27;break;
            
            case 'aventura':
                genreId=12;break;
            
            case 'crime':
                genreId=80;break;
            
            case 'animação':
                genreId=16;break;
            
            case 'comedia':
                genreId=35;break;
            
            case 'documentario':
                genreId=99;break;
            
            case 'drama':
                genreId=18;break;
            
            case 'familia':
                genreId=10751;break;
        }
        return genreId;
    }