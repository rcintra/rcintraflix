import React, { useState, useEffect }from 'react';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    }

    const { handleChange, values , clearForm } = useForm(valoresIniciais);

    const [categorias, setCategorias] = useState([]);
    

    useEffect(() => {        
        categoriasRepository.getAllWithVideos()
            .then((categoriasComVideos) => {
                console.log(categoriasComVideos);
            });
    });

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome} </h1>

            <form onSubmit={function handleSubmit(event){
                event.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ])

                clearForm();
            }}>
                
                <FormField 
                    label="Nome da Categoria"                    
                    name="nome"
                    value={values.nome}
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
                
                <Button>
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
                            {categoria.nome}
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