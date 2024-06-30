import React, { useEffect, useState } from 'react';
import { Tarefa } from '../../../models/Tarefa';
import { Usuario } from '../../../models/Usuario';
import { Link } from 'react-router-dom';

function ListarTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [prioridade, setPrioridade] = useState<string>('');
  const [idBusca, setIdBusca] = useState<string>('');
  const [usuarioId, setUsuarioId] = useState<{ [key: string]: string }>({});
  const [tarefaUsuario, setTarefaUsuario] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    carregarTarefas();
    carregarUsuarios();
  }, []);

  useEffect(() => {
    handleBuscar();
  }, [idBusca, prioridade]);

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

  async function carregarUsuarios() {
    try {
      const response = await fetch('http://localhost:5251/api/usuario/listar');
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
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

  async function atribuirUsuario(tarefaId: string) {
    if (!usuarioId[tarefaId]) {
      console.error('Nenhum usuário selecionado para a tarefa:', tarefaId);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5251/api/tarefa/${tarefaId}/atribuir/${usuarioId[tarefaId]}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erro ao atribuir usuário');
      }

      console.log(`Usuário ${usuarioId[tarefaId]} atribuído à tarefa ${tarefaId} com sucesso`);
      setTarefaUsuario({ ...tarefaUsuario, [tarefaId]: usuarioId[tarefaId] });
      carregarTarefas(); // Atualizar a lista de tarefas
    } catch (error) {
      console.error('Erro ao atribuir usuário à tarefa:', error);
    }
  }

  async function removerUsuario(tarefaId: string, usuarioId: string) {
    try {
      const response = await fetch(`http://localhost:5251/api/tarefa/${tarefaId}/remover/${usuarioId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao remover usuário');
      }

      console.log(`Usuário ${usuarioId} removido da tarefa ${tarefaId} com sucesso`);
      const updatedTarefaUsuario = { ...tarefaUsuario };
      delete updatedTarefaUsuario[tarefaId];
      setTarefaUsuario(updatedTarefaUsuario);
      carregarTarefas(); // Atualizar a lista de tarefas
    } catch (error) {
      console.error('Erro ao remover usuário da tarefa:', error);
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
            <th>Atribuir Usuário</th>
            <th>Remover Usuário</th>
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
                {tarefaUsuario[tarefa.id!] ? (
                  <span>{tarefaUsuario[tarefa.id!]}</span>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="ID do Usuário"
                      onChange={(e) => setUsuarioId({ ...usuarioId, [tarefa.id!]: e.target.value })}
                    />
                    <button onClick={() => atribuirUsuario(tarefa.id!)}>Atribuir</button>
                  </>
                )}
              </td>
              <td>
                {tarefaUsuario[tarefa.id!] && (
                  <button onClick={() => removerUsuario(tarefa.id!, tarefaUsuario[tarefa.id!])}>Remover</button>
                )}
              </td>
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
