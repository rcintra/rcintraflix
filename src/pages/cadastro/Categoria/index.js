import React, { useState, useEffect }from 'react';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
    const [categorias, setCategorias] = useState([]);
    const { handleChange, values, clearForm } = useForm({
        titulo: '',
        descricao: '', 
        cor: '',        
    });

    useEffect(() => {        
        categoriasRepository.getAllWithVideos()
            .then((categoriasComVideos) => {
                setCategorias(categoriasComVideos);
            });
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome} </h1>

            <form onSubmit={function handleSubmit(event){
                event.preventDefault();                

                categoriasRepository.create({
                    titulo: values.titulo,
                    descricao: values.descricao,
                    cor: values.cor,
                })
                .then(() => {
                    console.log('Cadastro de categoria efetuada com sucesso!');                    
                });
                setCategorias([...categorias, values]);
                clearForm();
            }}>
                
                <FormField 
                    label="Nome da Categoria"                    
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}                    
                />

                <FormField 
                    label="Descricao"
                    type="textarea"
                    name="descricao"
                    value={values.descricao}
                    onChange={handleChange}                    
                />

                <FormField 
                    label="Cor"
                    type="color"
                    name="cor"
                    value={values.cor}
                    onChange={handleChange}                    
                />
                
                <Button type="submit">
                    Cadastrar
                </Button>                
                
            </form>

            {categorias.length === 0 && (
                <div>
                    Loading...
                </div>                        
            )} 
            
            <ul>
                {categorias.map((categoria, index) => {
                    return (
                        <li key={`${categoria}${index}`}>
                            {categoria.titulo}
                        </li>
                    );
                })}
            </ul>


            <Link to="/">
                Ir para home
            </Link>

        </PageDefault>            
    );
}

export default CadastroCategoria;