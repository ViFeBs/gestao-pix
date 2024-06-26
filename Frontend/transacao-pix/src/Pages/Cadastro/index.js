import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import style from '../../Style/Transferencia/Transferencia.module.css';

const Cadastro = () => {
    const [form, setForm] = useState({ documento: '', agencia: '', conta: '', valor: '' });
    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();
    

    const handleInputChange = (e, formSetter) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');

        if (name.includes('documento')) {
            formattedValue = formatCPF(formattedValue);
        }


        formSetter(prevState => ({
            ...prevState,
            [name]: formattedValue,
        }));
    };

    const formatCPF = (value) => {
        value = value.substring(0, 11); // Limita ao tamanho do CPF

        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
        }

        return value;
    };



    const validarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarCPF(form.documento)) {
            setErrorMessage('CPF inválido. Por favor, insira um CPF válido.');
            return;
        }
        if (!form.conta || !form.agencia || !form.valor) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const resolve = await fetch(`http://localhost:8080/transacao/conta`, {
                method: 'POST',
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
          <h2>Cadastrar</h2>
          <div className={style.formcontainer}>
            <form className={style.transferform} onSubmit={handleSubmit}>
                <label htmlFor="conta">CPF</label>
                <input
                    type="text"
                    id="conta"
                    name="documento"
                    value={form.documento}
                    onChange={(e) => handleInputChange(e, setForm)}
                />
                <label htmlFor="conta">Número da Conta:</label>
                <input
                    type="text"
                    id="conta"
                    name="conta"
                    value={form.conta}
                    onChange={(e) => handleInputChange(e, setForm)}
                />
                <label htmlFor="conta">Número da Agencia:</label>
                <input
                    type="text"
                    id="conta"
                    name="agencia"
                    value={form.agencia}
                    onChange={(e) => handleInputChange(e, setForm)}
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

export default Cadastro;