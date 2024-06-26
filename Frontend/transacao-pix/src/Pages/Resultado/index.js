import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import style from '../../Style/Resultado/Resultado.module.css';

function Resultado() {
  return (
    <div>
      <div className={style.container}>
        <div className={style.box}>
          <div>
            <h1 className={style.ok}><FontAwesomeIcon icon={faCircleCheck} /></h1>
            <h1>Transferência Realizada com Sucesso</h1>
            <div className={style['button-container']}>
              <button className={style.btn}>
                <Link to="/Transferencia" className={style.link}>Realizar Outra Transferência</Link>
              </button>
              <button className={style.btn}>
                <Link to="/" className={style.link}>Voltar para Home</Link>
              </button>
            </div>
          </div>         
        </div>
      </div>
    </div>
  );
}

export default Resultado;