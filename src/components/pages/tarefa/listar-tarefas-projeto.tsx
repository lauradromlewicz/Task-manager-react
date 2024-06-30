import React, { useEffect, useState } from 'react';
import { Tarefa } from '../../../models/Tarefa';
import { useParams } from 'react-router-dom';

function ListarTarefasPorProjeto() {
  const { projetoId } = useParams<{ projetoId: string }>();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    if (projetoId) {
      carregarTarefas(projetoId);
    }
  }, [projetoId]);

  async function carregarTarefas(projetoId: string) {
    try {
      const response = await fetch(`http://localhost:5028/api/projeto/${projetoId}/tarefas`);
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas por projeto');
      }
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas por projeto:', error);
    }
  }

  return (
    <div>
      <h1>Tarefas do Projeto: {projetoId}</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Prazo</th>
            <th>Prioridade</th>
            <th>Atribuições</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarTarefasPorProjeto;
