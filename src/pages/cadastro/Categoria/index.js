import React, { useState, useEffect }from 'react';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

function CadastroCategoria() {
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    }

    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState(valoresIniciais);

    function setValue(key, value) {
        setValues({
            ...values,
            [key]: value,
        })
    }
    
    function handleChange(parms) {
        setValue(
          parms.target.getAttribute('name'),
          parms.target.value
        );
      };

    useEffect(() => {        
        if (window.location.href.includes('localhost')) {
            const URL = 'http://localhost:8080/categorias';
            fetch(URL)
                .then(async (response) => {
                  if (response.ok) {
                    const resp = await response.json();
                    setCategorias([
                        ...resp,
                    ]);
                    return;
                }
                throw new Error('Não foi possível pegar os dados');
            });
        }
    }, [] );
 
    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome} </h1>

            <form onSubmit={function handleSubmit(event){
                event.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ])

                setValues({valoresIniciais})
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