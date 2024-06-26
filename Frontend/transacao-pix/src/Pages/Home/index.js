import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBrazilianRealSign } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlassDollar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import style from '../../Style/Home/Home.module.css';

function Home() {
  return (
    <div>
      <div className={style.body}>
        <div className={style.container}>
            <div className={style.box}>
                  <button className={style.btn}>
                      <FontAwesomeIcon icon={faBrazilianRealSign}/>
                      <Link to="/Transferencia" className={style.linktransfer}>Realizar Transação</Link>
                  </button>
              
                <button className={style.consultbtn}>
                    <FontAwesomeIcon icon={faMagnifyingGlassDollar}/>
                    <Link to="/Relatorio" className={style.linkconsult}>Consultar Transações</Link>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
