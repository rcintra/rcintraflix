import React, { useState }from 'react';

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

                <ul>
                    {categorias.map((categoria, index) => {
                        return (
                            <li key={`${categoria}${index}`}>
                                {categoria.nome}
                            </li>
                        );
                    })}
                </ul>
                
            </form>


            <Link to="/">
                Ir para home
            </Link>

        </PageDefault>            
    );
}

export default CadastroCategoria;