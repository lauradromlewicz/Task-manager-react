import React, { useEffect, useState } from 'react';
import { Usuario } from '../../../models/Usuario';
import { Link } from 'react-router-dom';

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [idBusca, setIdBusca] = useState<string>('');
  const [usuarioEncontrado, setUsuarioEncontrado] = useState<Usuario | null>(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  useEffect(() => {
    buscarUsuarioPorId();
  }, [idBusca]);

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

  async function buscarUsuarioPorId() {
    if (idBusca === '') {
      setUsuarioEncontrado(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5251/api/usuario/buscar/${idBusca}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }
      const data = await response.json();
      setUsuarioEncontrado(data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      setUsuarioEncontrado(null);
    }
  }

  async function Delete(id: string) {
    try {
      const response = await fetch(`http://localhost:5251/api/usuario/deletar/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
      }
      carregarUsuarios();
      setIdBusca('');  // Limpa o campo de busca ao deletar um usuário
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

  return (
    <div>
      <h1>Listar Usuários</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar por ID"
          value={idBusca}
          onChange={(e) => setIdBusca(e.target.value)}
        />
      </div>

      {usuarioEncontrado ? (
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Alterar</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody className='table'>
            <tr>
              <td>{usuarioEncontrado.id}</td>
              <td>{usuarioEncontrado.nome}</td>
              <td>{usuarioEncontrado.email}</td>
              <td>
                <Link to={`/usuario/alterar/${usuarioEncontrado.id}`}>Alterar</Link>
              </td>
              <td>
                <button onClick={() => Delete(usuarioEncontrado.id!)}>Deletar</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Alterar</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody className='table'>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>
                  <Link to={`/usuario/alterar/${usuario.id}`}>Alterar</Link>
                </td>
                <td>
                  <button onClick={() => Delete(usuario.id!)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListarUsuarios;
