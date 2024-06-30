import React, { useEffect, useState } from 'react';
import { Tarefa } from '../../../models/Tarefa';

function ListarNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Tarefa[]>([]);
  const [usuarioId, setUsuarioId] = useState<string>('');

  useEffect(() => {
    if (usuarioId) {
      handleBuscar(usuarioId);
    }
  }, [usuarioId]);

  async function carregarNotificacoes(usuarioId: string): Promise<any[]> {
    try {
      const response = await fetch(`http://localhost:5028/api/notificacao/listar/${usuarioId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar notificações');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
      return [];
    }
  }

  async function carregarDetalhesTarefa(tarefaId: number): Promise<Tarefa | null> {
    try {
      const response = await fetch(`http://localhost:5028/api/tarefa/buscar/${tarefaId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes da tarefa');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da tarefa:', error);
      return null;
    }
  }

  async function handleBuscar(usuarioId: string): Promise<void> {
    const notificacoes = await carregarNotificacoes(usuarioId);
    const tarefasDetalhadas = await Promise.all(
      notificacoes.map(async (notificacao) => {
        const tarefaId = notificacao.id as number; // Garantir que o ID da tarefa é um número
        if (typeof tarefaId === 'number') {
          const detalhesTarefa = await carregarDetalhesTarefa(tarefaId);
          return detalhesTarefa;
        }
        return null;
      })
    );
    setNotificacoes(tarefasDetalhadas.filter((tarefa): tarefa is Tarefa => tarefa !== null));
  }

  return (
    <div>
      <h1>Listar Notificações</h1>
      <div>
        <label>Buscar Notificações por ID do Usuário:</label>
        <input
          type="text"
          placeholder="ID do Usuário"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {notificacoes.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.prazo}</td>
              <td>{tarefa.prioridade}</td>
              <td>{tarefa.projetoId}</td>
              <td>Em andamento</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarNotificacoes;
