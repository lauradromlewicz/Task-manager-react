import React, { useState } from 'react';
import { Tarefa } from '../../../models/Tarefa';
import { useNavigate } from 'react-router-dom';

function CriarTarefa() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');
  const [prioridade, setPrioridade] = useState('Baixa'); // Valor padrão inicial
  const [projetoId, setProjetoId] = useState('');
  const navigate = useNavigate();

  async function criar(event: React.FormEvent) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const tarefa: Tarefa = { titulo, descricao, prazo, prioridade, projetoId };
    console.log('Dados da tarefa:', tarefa); // Log para verificar os dados

    try {
      const response = await fetch('http://localhost:5028/api/tarefa/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro ao criar tarefa:', errorText);
        throw new Error('Erro ao criar tarefa');
      }

      const data = await response.json();
      console.log('Tarefa criada:', data);

      // Redirecionar para a tela de listar tarefas
      navigate('/tarefa/listar');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  }

  return (
    <div>
      <h1>Criar Tarefa</h1>
      <form onSubmit={criar}>
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
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default CriarTarefa;
