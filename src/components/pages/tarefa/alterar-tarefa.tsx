import React, { useEffect, useState } from 'react';
import { Tarefa } from '../../../models/Tarefa';
import { useParams, useNavigate } from 'react-router-dom';

function AlterarTarefa() {
  const { id } = useParams<{ id: string }>();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [projetoId, setProjetoId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      carregarTarefa(id);
    }
  }, [id]);

  async function carregarTarefa(id: string) {
    try {
      const response = await fetch(`http://localhost:5251/api/tarefa/buscar/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefa');
      }
      const data = await response.json();
      setTitulo(data.titulo);
      setDescricao(data.descricao);
      setPrazo(data.prazo);
      setPrioridade(data.prioridade);
      setProjetoId(data.projetoId);
    } catch (error) {
      console.error('Erro ao carregar tarefa:', error);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const tarefa: Tarefa = { titulo, descricao, prazo, prioridade, projetoId };

    try {
      const response = await fetch(`http://localhost:5251/api/tarefa/alterar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa),
      });

      if (!response.ok) {
        throw new Error('Erro ao alterar tarefa');
      }

      const data = await response.json();
      console.log('Tarefa alterada:', data);

      // Redirecionar para a tela de listar tarefas
      navigate('/tarefa/listar');
    } catch (error) {
      console.error('Erro ao alterar tarefa:', error);
    }
  }

  return (
    <div>
      <h1>Alterar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        <br />
        <label>Descrição:</label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <br />
        <label>Prazo:</label>
        <input type="datetime-local" value={prazo} onChange={(e) => setPrazo(e.target.value)} required />
        <br />
        <label>Prioridade:</label>
        <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} required>
          <option value="Baixa">Baixa</option>
          <option value="Media">Média</option>
          <option value="Alta">Alta</option>
        </select>
        <br />
        <label>ID do Projeto:</label>
        <input type="text" value={projetoId} onChange={(e) => setProjetoId(e.target.value)} required />
        <br />
        <button type="submit">Alterar</button>
      </form>
    </div>
  );
}

export default AlterarTarefa;
