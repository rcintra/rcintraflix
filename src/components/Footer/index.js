import React from 'react';
import { FooterBase } from './styles';
import Marca from '../../assets/img/Marca.png'

function Footer() {
  return (
    <FooterBase>        
        <img className="Logo" src={Marca} alt="RCintra" />
    </FooterBase>
  );
}

export default Footer;
