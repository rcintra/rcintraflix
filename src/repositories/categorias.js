import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND}/categorias`;


function create(objectoCategoria) {    
    return fetch(`${URL_CATEGORIES}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(objectoCategoria),
    })
      .then(async (response) => {              
        if (response.ok) {
            const resposta = await response.json();            
            return resposta;
        }
        throw new Error('Não foi possivel salvar categoria');
    });    
}

function getAll() {    
    return fetch(`${URL_CATEGORIES}`)
        .then(async (response) => {              

            if (response.ok) {
                const resposta = await response.json();            
                return resposta;
            }

            throw new Error('Não foi possivel pegar os dados');

    });    
}

function getAllWithVideos() {    
    return fetch(`${URL_CATEGORIES}?_embed=videos`)
        .then(async (response) => {              

            if (response.ok) {
                const resposta = await response.json();            
                return resposta;
            }

            throw new Error('Não foi possivel pegar os dados');

    });    
}

export default {
    getAll, getAllWithVideos, create,
};