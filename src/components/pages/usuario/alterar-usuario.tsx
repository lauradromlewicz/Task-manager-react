import React, { useEffect, useState } from 'react';
import { Usuario } from '../../../models/Usuario';
import { useParams, useNavigate } from 'react-router-dom';

function AlterarUsuario() {
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      carregarUsuario(id);
    }
  }, [id]);

  async function carregarUsuario(id: string) {
    try {
      const response = await fetch(`http://localhost:5028/api/usuario/buscar/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }
      const data = await response.json();
      setNome(data.nome);
      setEmail(data.email);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  }

  async function alterar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const usuario: Usuario = { nome, email };

    try {
      const response = await fetch(`http://localhost:5028/api/usuario/alterar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        throw new Error('Erro ao alterar usuário');
      }

      const data = await response.json();
      console.log('Usuário alterado:', data);

      // Redirecionar para a tela de listar usuários
      navigate('/usuario/listar');
    } catch (error) {
      console.error('Erro ao alterar usuário:', error);
    }
  }

  return (
    <div>
      <h1>Alterar Usuário</h1>
      <form onSubmit={alterar}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <button type="submit">Alterar</button>
      </form>
    </div>
  );
}

export default AlterarUsuario;
