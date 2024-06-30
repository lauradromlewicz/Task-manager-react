import React, { useEffect, useState } from 'react';
import { Notificacao } from '../../../models/Notificacao';

function ListarNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [usuarioId, setUsuarioId] = useState<string>('');

  async function carregarNotificacoes(usuarioId?: string) {
    try {
      let url = 'http://localhost:5251/api/notificacao/listar';
      if (usuarioId) {
        url += `/${usuarioId}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      setNotificacoes(data);
      setErro(null); // Limpar mensagem de erro se a busca for bem-sucedida
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro('Erro desconhecido');
      }
      setNotificacoes([]); // Limpar notificações ao exibir mensagem de erro
      console.error('Erro ao carregar notificações:', error);
    }
  }

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  function handleBuscar() {
    carregarNotificacoes(usuarioId);
  }

  return (
    <div>
      <h1>Notificações</h1>
      <div>
        <label>Buscar por ID do Usuário:</label>
        <input
          type="text"
          placeholder="ID do Usuário"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>
      {erro && <p>{erro}</p>}
      <ul>
        {notificacoes.map((notificacao) => (
          <li key={notificacao.id}>{notificacao.mensagem}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListarNotificacoes;
