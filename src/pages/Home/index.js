import React, { useEffect, useState } from 'react';
//import Menu from '../../../src/components/Menu'
//import dadosIniciais from '../../dados/dados_iniciais.json';
import BannerMain from '../../../src/components/BannerMain'
import Carousel from '../../../src/components/Carousel';
//import Footer from '../../../src/components/Footer';
import categoriasRespository from '../../repositories/categorias';
import PageDefault from '../../components/PageDefault';

function Home() {

  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    categoriasRespository.getAllWithVideos()
      .then((categoriasComVideos) => {
        console.log(categoriasComVideos);
        setDadosIniciais(categoriasComVideos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [] );

  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && (
        <div>Loading...</div>
      )}

      {dadosIniciais.map((categoria, index) => {
        if (index === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={dadosIniciais[0].videos[0].titulo}
                url={dadosIniciais[0].videos[0].url}
                videoDescription={dadosIniciais[0].videos[0].descricao}
              />
              <Carousel
                ignoreFirstVideo
                category={dadosIniciais[0]}
              />
            </div>
          );
        }

        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />  
        );

        })}

    </PageDefault>
  );
}

export default Home;