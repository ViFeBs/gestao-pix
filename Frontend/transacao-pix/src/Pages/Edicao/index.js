import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import style from '../../Style/Transferencia/Transferencia.module.css';

const Edicao = () => {
    const [form, setForm] = useState({ documento: '', agencia: '', conta: '', valor: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const {numeroConta}  = location.state || { numeroConta: '' };
    
    useEffect(() => {
        fetchData();
    });
    
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/transacao/conta/${numeroConta}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setForm({
                documento: data.documento,
                agencia: data.numero_agencia,
                conta: data.numero_conta,
                valor: data.limite_pix
            });
            

        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const handleInputChange = (e, formSetter) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');

        formSetter(prevState => ({
            ...prevState,
            [name]: formattedValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resolve = await fetch(`http://localhost:8080/transacao/conta/${form.conta}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    documento: form.documento,
                    numero_agencia: form.agencia,
                    numero_conta: form.conta,
                    limite_pix: form.valor
                })
            });

            if (!resolve.ok) {
                throw new Error('Erro ao realizar a transferência');
            }

            navigate("/Relatorio")
        } catch (error) {
            setErrorMessage('Ocorreu um erro ao tentar realizar a transferência.');
        }
    };

    
    return (
      <div className={style.container}>
        <div className={style.box}>
          <h2>Editar</h2>
          <div className={style.formcontainer}>
            <form className={style.transferform} onSubmit={handleSubmit}>
                <label htmlFor="conta">CPF</label>
                <input
                    type="text"
                    id="conta"
                    name="documento"
                    value={form.documento}
                    disabled
                />
                <label htmlFor="conta">Número da Conta:</label>
                <input
                    type="text"
                    id="conta"
                    name="conta"
                    value={form.conta}
                    disabled
                />
                <label htmlFor="conta">Número da Agencia:</label>
                <input
                    type="text"
                    id="conta"
                    name="agencia"
                    value={form.agencia}
                    disabled
                />
                <label htmlFor="conta">limite Pix</label>
                <input
                    type="text"
                    id="conta"
                    name="valor"
                    value={form.valor}
                    onChange={(e) => handleInputChange(e, setForm)}
                />
                <button type="submit" className={style.btn}>Salvar</button>
            </form>
          </div>
          {errorMessage && <p className={style.error}>{errorMessage}</p>}
        </div>
      </div>
    );
  };

export default Edicao;