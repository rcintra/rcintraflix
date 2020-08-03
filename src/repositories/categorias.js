import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND}/categorias`;

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
    getAllWithVideos,
};