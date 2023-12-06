const searchForm = document.querySelector('.forms');
let searchList = document.getElementById('list');


const getInputValue = async (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    await fetchAllMovies(searchText);
}


searchForm.addEventListener('submit', getInputValue);

const apiKey = '32c07956aa06ecee35ca79f10d439001';

const fetchAllMovies = async (searchText) => {
    let url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}&language=pt-BR&`;
    
    try {
        const response = await fetch(url);
       let allData = await response.json();

        if (allData.results && allData.results.length > 0) {
            showSearchList(allData.results);
        } else {
            showErrorMessage('Nenhum resultado encontrado.Busca não computavél');
            console.log('Nenhum resultado encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

const showSearchList = (data) => {
    searchList.innerHTML = "";

    data.forEach(dataItem => {
        
        if (dataItem.poster_path) {
            const divElem = document.createElement('div');
            divElem.classList.add('search-list-item');
            const posterPath = `https://image.tmdb.org/t/p/w500${dataItem.poster_path}`;
            
            divElem.innerHTML = `
                <img src="${posterPath}">
                <p data-id="${dataItem.id}">${dataItem.title}</p>
            `;
            
            searchList.appendChild(divElem);
        }
    });
}

const showErrorMessage = (message) => {
    searchList.innerHTML = `<div class="search-list-item error">${message}</div>`;
};


searchForm.search.addEventListener('keyup', () => {
    if(searchForm.search.value.length > 1){
        fetchAllMovies(searchForm.search.value);
    } else {
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    let singleData = allData.results.find(singleData => searchId === String(singleData.id));

    if (singleData) {
        showMovieDetails(singleData);
        searchList.innerHTML = "";
    }
});

const showMovieDetails = (data) => {
    if (!data) {
        console.error('Nenhum dado do filme disponível.');
        return;
    }

    const thumbnailElement = document.getElementById('thumbnail');
    if (thumbnailElement) {
        thumbnailElement.innerHTML = `
            <img src="${data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'image/thumbnail.jpg'}" alt="${data.title}">
        `;
    }

    const nameElement = document.getElementById('name');
    if (nameElement) {
        nameElement.textContent = data.title;
    }

    const infoBodyElement = document.getElementById('infoBody');
    if (infoBodyElement) {
        // Obtém os nomes dos gêneros usando a função searchgenres
        const genreNames = data.genre_ids ? data.genre_ids.map(genreId => searchgenres(genreId)) : [];

        infoBodyElement.innerHTML = `
            <ul>
                <li>
                    <div>
                        <i class="fa-solid fa-shield-halved"></i>
                        <span>Nome do filme</span>
                    </div>
                    <span>${data.title}</span>
                </li>
                <li>
                    <div>
                        <i class="fa-solid fa-shield-halved"></i>
                        <span>Gênero</span>
                    </div>
                    <span>${genreNames.length > 0 ? genreNames.join(', ') : 'N/A'}</span>
                </li>
                <li>
                    <div>
                        <i class="fa-solid fa-shield-halved"></i>
                        <span>Descrição</span>
                    </div>
                    <span>${data.overview || 'N/A'}</span>
                </li>
            </ul>
        `;
    }
};


function searchgenres(genreId) {
    switch (genreId) {
        case 28:
            return 'Ação';
        case 27:
            return 'Terror';
        case 12:
            return 'Aventura';
        case 80:
            return 'Crime';
        case 16:
            return 'Animação';
        case 35:
            return 'Comédia';
        case 99:
            return 'Documentário';
        case 18:
            return 'Drama';
        case 10751:
            return 'Família';
        case 14:
            return 'Fantasia';
        case 36:
            return 'História';
        case 10402:
            return 'Musical';
        case 9648:
            return 'Mistério';
        case 10749:
            return 'Romance';
        case 10752:
            return 'Guerra';
        // default:
        //     return 'N/A';
    }
}
