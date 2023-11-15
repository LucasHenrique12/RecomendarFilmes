    function searchMovies() {
      let genre = document.getElementById('movieInput').value;
    genre=genre.toLowerCase();
     console.log(genre);
    if (genre === '') {
        console.log('Por favor, insira um gênero.');
        return;
      }
      var genreId= searchgenres(genre);
      
      const apiKey = '32c07956aa06ecee35ca79f10d439001';
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=pt-BR`;
         


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
            case 'ação': case 'açao':
                genreId=28;break;
                
            case 'terror':
                genreId=27;break;
            
            case 'aventura':
                genreId=12;break;
            
            case 'crime':
                genreId=80;break;
            
            case 'animação': case 'animaçao':
                genreId=16;break;
            
            case 'comedia': case 'comédia':
                genreId=35;break;
            
            case 'documentario':  case 'documentário':
                genreId=99;break;
            
            case 'drama':
                genreId=18;break;
            
            case 'familia': case 'família':
                genreId=10751;break;
            
            case 'fantasia':
                genreId=14;break;
            
            case 'historia': case 'história':
                genreId=10751;break;
            
            case 'musical':
                genreId=10402;break;
            
            case 'mistério': case 'misterio':
                genreId=10402;break;

            case 'romance':
                genreId=10749;break;
            
            case 'guerra':
                genreId=10752;break;
                
            case 'romance':
                genreId=10749;break;
        }
        return genreId;
    }