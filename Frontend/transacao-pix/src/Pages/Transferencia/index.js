import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import style from '../../Style/Transferencia/Transferencia.module.css';

const Transferencia = () => {
    const [form1, setForm1] = useState({ documento: '', agencia: '', conta: '', valor: '' });
    const [form2, setForm2] = useState({ documento: '', agencia: '', conta: '', valor: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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
              //Busca a conta
              const response = await fetch(`http://localhost:8080/transacao/conta/${form1.conta}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  },
              });

              if (!response.ok) {
                  throw new Error('Erro ao consultar a API');
              }

              const conta = await response.json();
              const saldo = conta.limite_pix;

              // Verifica se a conta destinataria existe 
              const destinataria = await fetch(`http://localhost:8080/transacao/conta/${form2.conta}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  },
              });
              if (!destinataria.ok) {
                  throw new Error('Erro ao consultar a API');
              }

              const conta2 = await destinataria.json();
              if (parseFloat(saldo) >= parseFloat(form2.valor)) {
                  // Desconta do limite da conta que esta transferindo
                  const desconto = await fetch(`http://localhost:8080/transacao/conta/${form1.conta}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          documento: conta.documento,
                          numero_agencia: conta.numero_agencia,
                          numero_conta: conta.numero_conta,
                          limite_pix: (parseFloat(conta.limite_pix) - parseFloat(form2.valor))
                      })
                  });

                  if (!desconto.ok) {
                      throw new Error('Erro ao realizar a transferência');
                  }
                  

                  const transferencia = await fetch(`http://localhost:8080/transacao/conta/${form2.conta}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          documento: conta2.documento,
                          numero_agencia: conta2.numero_agencia,
                          numero_conta: conta2.numero_conta,
                          limite_pix: (parseFloat(conta2.limite_pix) + parseFloat(form2.valor))
                      })
                  });
                  if (!transferencia.ok) {
                      throw new Error('Erro ao realizar a transferência');
                  }
                  //Redireciona para pagina de sucesso
                  navigate('/Resultado')
              } else {
                  setErrorMessage('Saldo insuficiente para realizar a transferência.');
              }
        } catch (error) {
            setErrorMessage('Ocorreu um erro ao tentar realizar a transferência.');
        }
    };
    return (
      <div className={style.container}>
        <div className={style.box}>
          <h2>Realizar Transfêrencia</h2>
          <div className={style.formcontainer}>
            <p>De:</p>
            <form className={style.transferform}>
              <label htmlFor="conta1">Número da Conta:</label>
              <input
                type="text"
                id="conta1"
                name="conta"
                value={form1.conta}
                onChange={(e) => handleInputChange(e, setForm1)}
              />
            </form>
            <p>Para:</p>
            <form className={style.transferform} onSubmit={handleSubmit}>
  
              <label htmlFor="conta2">Número da Conta:</label>
              <input
                type="text"
                id="conta2"
                name="conta"
                value={form2.conta}
                onChange={(e) => handleInputChange(e, setForm2)}
              />
  
              <label htmlFor="valor2">Valor da Transferência:</label>
              <input
                type="text"
                id="valor2"
                name="valor"
                value={form2.valor}
                onChange={(e) => handleInputChange(e, setForm2)}
              />
              <button type="submit" className={style.btn}>Enviar</button>
            </form>
          </div>
          {errorMessage && <p className={style.error}>{errorMessage}</p>}
        </div>
      </div>
    );
  };

export default Transferencia;
