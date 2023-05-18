import style from './Card.module.css'
import noImage from '../../img/noimage.png'
import { typesImage, backColor } from '../../utils/types'
import { NavLink } from 'react-router-dom';

//DUMB COMPONENT. SOLO RENDERIZA LAS TARJETAS DE LOS POKEMONES

const Card = ({ pokeId, name, image, type }) => {
    return (
        <div key={pokeId} className={style.cardContainer}>
            <p className={style.id}>{pokeId}</p>
            <NavLink to={`/detail/${pokeId}`} className={style.link}>
                <img src={image ? image : noImage} alt="" className={style.hoverImg} />
            </NavLink>
            <div style={{ backgroundColor: backColor[type.type1.name] }} className={style.card}>
                <div className={style.nameContainer}>
                    <h5 className={style.name}>{name}</h5>
                </div>
                <img src={image ? image : noImage} alt="" className={style.cardImg} />
                <div className={style.typeContainer}>
                    <div className={style.type1Container}>
                        <p className={style.cardText}>{type.type1 && type.type1.name}</p>
                        <img className={style.typeImg1} src={type.type1 && typesImage[type.type1.name]} alt=''></img>
                    </div>
                    <div className={style.type2Container}>
                        <p className={style.cardText}>{type.type2 && type.type2.name}</p>
                        <img className={style.typeImg2} src={type.type2 && typesImage[type.type2.name]} alt=''></img>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card