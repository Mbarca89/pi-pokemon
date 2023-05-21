import style from './NotFound.module.css'
import notFound from '../../img/404.png'

const NotFound = () => {
    return (
        <div className={style.container}>
            <img className={style.notFound} src={notFound} alt="404" />
            <p className={style.p}>ESA PAGINA NO EXISTE</p>
        </div>
        )
}

export default NotFound