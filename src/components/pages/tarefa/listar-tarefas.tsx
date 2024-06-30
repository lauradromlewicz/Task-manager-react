import React, { useEffect, useState } from 'react';
import { Tarefa } from '../../../models/Tarefa';
import { Link } from 'react-router-dom';

function ListarTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [prioridade, setPrioridade] = useState<string>('');
  const [idBusca, setIdBusca] = useState<string>('');

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const response = await fetch('http://localhost:5251/api/tarefa/listar');
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
      }
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }

  async function carregarTarefasPorPrioridade(prioridade: string) {
    try {
      const response = await fetch(`http://localhost:5251/api/tarefa/listarporprioridade/${prioridade}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas por prioridade');
      }
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas por prioridade:', error);
      setTarefas([]); // Limpa a lista de tarefas em caso de erro
    }
  }

  async function carregarTarefaPorId(id: string) {
    try {
      const response = await fetch(`http://localhost:5251/api/tarefa/buscar/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefa');
      }
      const data = await response.json();
      setTarefas([data]);
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      setTarefas([]); // Limpa a lista de tarefas em caso de erro
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`http://localhost:5251/api/tarefa/deletar/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar tarefa');
      }
      carregarTarefas();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  }

  async function handleBuscar() {
    if (idBusca !== '') {
      await carregarTarefaPorId(idBusca);
    } else if (prioridade !== '') {
      await carregarTarefasPorPrioridade(prioridade);
    } else {
      await carregarTarefas();
    }
  }

  return (
    <div>
      <h1>Listar Tarefas</h1>
      <div>
        <label>Filtrar por Prioridade:</label>
        <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
          <option value="">Todas</option>
          <option value="Baixa">Baixa</option>
          <option value="Media">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      <div>
        <label>Buscar por ID:</label>
        <input
          type="text"
          placeholder="ID da Tarefa"
          value={idBusca}
          onChange={(e) => setIdBusca(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Prazo</th>
            <th>Prioridade</th>
            <th>ID do Projeto</th>
            <th>Alterar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.prazo}</td>
              <td>{tarefa.prioridade}</td>
              <td>{tarefa.projetoId}</td>
              <td>
                <Link to={`/tarefa/alterar/${tarefa.id}`}>Alterar</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(tarefa.id!)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarTarefas;
