import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tarefa } from '../../../models/Tarefa';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

function ListarTarefasPorPrioridade() {
  const { prioridade } = useParams<{ prioridade: string }>();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    if (prioridade) {
      carregarTarefas(prioridade);
    }
  }, [prioridade]);

  async function carregarTarefas(prioridade: string) {
    try {
      const response = await fetch(`http://localhost:5028/api/tarefa/listarporprioridade/${prioridade}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas por prioridade');
      }
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas por prioridade:', error);
    }
  }

  return (
    <div>
    <h1>Listar Tarefas por Prioridade</h1>
    <table>
       <thead>
           <th>#</th>
           <th>Título</th>
           <th>Descrição</th>
           <th>Prazo</th>
           <th>Prioridade</th>
           <th>ID do Projeto</th>
           <th>Atribuições</th>
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
            </tr>)
            )
          }
      </tbody>
    </table>
  </div>
);
}
export default ListarTarefasPorPrioridade;
