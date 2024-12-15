import { Container, IconButton } from "@mui/material";
import React from "react";
import Styles from './Body4Card.module.css'
import './Body4Card.css'
import { Link } from "react-router-dom";


const Body4Card = ({ title, Icon,shortTitle ,link}) => {
  return (
    <Link to={`${link}`} className={Styles.body4__card} style={{width: "400px",height: "150px", fontSize:'40px'}}>
        <div className="" style={{width: "1000px",height: "100px", fontSize:'40px'}} >
        <span className={Styles.shortTitle}  >{shortTitle}</span>
      <h6>{title}</h6>
        </div>
        
      <IconButton className={Styles.icon__style} >
        <Icon fontSize="large" className='icon__style__b4card'  />
      </IconButton>
    </Link>
  );
};

export default Body4Card;
