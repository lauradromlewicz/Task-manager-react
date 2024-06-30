import React, { useEffect, useState } from 'react';
import { Projeto } from '../../../models/Projeto';
import { Link } from 'react-router-dom';

function ListarProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [idBusca, setIdBusca] = useState('');
  const [projetoEncontrado, setProjetoEncontrado] = useState<Projeto | null>(null);

  useEffect(() => {
    carregarProjetos();
  }, []);

  async function carregarProjetos() {
    try {
      const response = await fetch('http://localhost:5251/api/projeto/listar');
      if (!response.ok) {
        throw new Error('Erro ao buscar projetos');
      }
      const data = await response.json();
      setProjetos(data);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  }

  async function buscarProjetoPorId() {
    if (idBusca === '') {
      setProjetoEncontrado(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5251/api/projeto/buscar/${idBusca}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar projeto');
      }
      const data = await response.json();
      setProjetoEncontrado(data);
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
      setProjetoEncontrado(null);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`http://localhost:5251/api/projeto/deletar/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar projeto');
      }
      carregarProjetos();
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
    }
  }

  return (
    <div>
      <h1>Listar Projetos</h1>
      
      <div>
        <input
          type="text"
          placeholder="Buscar por ID"
          value={idBusca}
          onChange={(e) => setIdBusca(e.target.value)}
        />
        <button onClick={buscarProjetoPorId}>Buscar</button>
      </div>

      {projetoEncontrado ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Listar Tarefas</th>
              <th>Alterar</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{projetoEncontrado.id}</td>
              <td>{projetoEncontrado.nome}</td>
              <td>
                <Link to={`/projeto/${projetoEncontrado.id}/tarefas`}>Listar</Link>
              </td>
              <td>
                <Link to={`/projeto/alterar/${projetoEncontrado.id}`}>Alterar</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(projetoEncontrado.id!)}>Deletar</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Listar Tarefas</th>
              <th>Alterar</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((projeto) => (
              <tr key={projeto.id}>
                <td>{projeto.id}</td>
                <td>{projeto.nome}</td>
                <td>
                  <Link to={`/projeto/${projeto.id}/tarefas`}>Listar</Link>
                </td>
                <td>
                  <Link to={`/projeto/alterar/${projeto.id}`}>Alterar</Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(projeto.id!)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListarProjetos;
