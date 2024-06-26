import React, { useEffect, useState } from 'react';
import style from '../../Style/Relatorio/Relatorio.module.css';
import { useNavigate, Link } from 'react-router-dom';

const Relatorio = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/transacao/conta');
            const data = await response.json();
            setRecords(data); 
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

  
    const handleDelete = async (numero_conta) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir este registro?');
        if (confirmDelete) {
            try {
            // Substitua pela lógica para deletar registro na sua API
            await fetch(`http://localhost:8080/transacao/conta/${numero_conta}`, {
                method: 'DELETE',
            });

            // Atualiza a lista após a exclusão
            setRecords(records.filter(record => record.numero_conta !== numero_conta));
            } catch (error) {
            console.error('Erro ao deletar registro:', error);
            }
        }
    };
  
    const handleEdit = (id) => {
      navigate('/Edicao', { state: { numeroConta: id } });
    };
  
    return (
        <div className={style.container}>
            <div className={style.box}>
            <h2>Registros de Transações</h2>
            <button className={style.btn}>
                <Link to="/Cadastro" className={style.link}>Adicionar uma Nova Conta</Link>
            </button>
            <div className={style.tablecontainer}>
                <table className={style.recordstable}>
                <thead>
                    <tr>
                    <th>Documento</th>
                    <th>Número da Agência</th>
                    <th>Número da Conta</th>
                    <th>Valor da Transferência</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                    <tr key={record.numero_conta}>
                        <td>{record.documento}</td>
                        <td>{record.numero_agencia}</td>
                        <td>{record.numero_conta}</td>
                        <td>{record.limite_pix}</td>
                        <td>
                        <button onClick={() => handleEdit(record.numero_conta)} className={style.actionbtn}>Editar</button>
                        <button onClick={() => handleDelete(record.numero_conta)} className={style.actionbtn}>Deletar</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <br />
            <button className={style.btn}>
                <Link to="/" className={style.link}>Voltar para Home</Link>
            </button>
            </div>
        </div>
    );
  };

export default Relatorio;