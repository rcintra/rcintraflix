import React, { useEffect, useState } from 'react';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import { Link, useHistory } from 'react-router-dom';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({ titulo }) => titulo);

    const { handleChange, values } = useForm({
        titulo: '',
        categoria: '', 
        url: '',        
    });

    useEffect(() => {
        categoriasRepository
            .getAll()
            .then((categoriasFromServer) => {                                
                setCategorias(categoriasFromServer);
            });  
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Video</h1>

            <form onSubmit={(event) => {
                event.preventDefault();

                const categoriaEscolhida = categorias.find((categoria) => {
                    return categoria.titulo === values.categoria;
                })                                

                videosRepository.create({
                    titulo: values.titulo,
                    categoriaId: categoriaEscolhida.id,
                    url: values.url,                    
                })
                .then(() => {
                    console.log('Cadastrou com sucesso');
                    history.push('/');
                });
            }}
            >
                <FormField 
                    label="Título do Vídeo"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}                    
                />

                <FormField 
                    label="URL"
                    name="url"
                    value={values.url}
                    onChange={handleChange}                    
                />

                <FormField 
                    label="Categoria"
                    name="categoria"                    
                    value={values.categoria}
                    onChange={handleChange}
                    suggestions={categoryTitles}
                />

                <Button type="submit">
                    Cadastrar
                </Button>   

            </form>

            <Link to="/cadastro/categoria">
                Cadastro de Categoria
            </Link>

        </PageDefault>            
    );
}

export default CadastroVideo;