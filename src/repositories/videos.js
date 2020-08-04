import config from '../config';

const URL_VIDEOS = `${config.URL_BACKEND}/videos`;

function create(objectoDoVideo) {    
    return fetch(`${URL_VIDEOS}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(objectoDoVideo),
    })
      .then(async (response) => {              
        if (response.ok) {
            const resposta = await response.json();            
            return resposta;
        }
        throw new Error('Não foi possivel pegar os dados');
    });    
}

export default {
    create,
};