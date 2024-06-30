import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CriarUsuario from './components/pages/usuario/criar-usuario';
import ListarUsuarios from './components/pages/usuario/listar-usuarios';
import AlterarUsuario from './components/pages/usuario/alterar-usuario';
import CriarProjeto from './components/pages/projeto/criar-projeto';
import ListarProjetos from './components/pages/projeto/listar-projetos';
import AlterarProjeto from './components/pages/projeto/alterar-projeto';
import CriarTarefa from './components/pages/tarefa/criar-tarefa';
import ListarTarefas from './components/pages/tarefa/listar-tarefas';
import AlterarTarefa from './components/pages/tarefa/alterar-tarefa';
import ListarTarefasPorPrioridade from './components/pages/tarefa/listar-tarefas-prioridade';
import ListarTarefasPorProjeto from './components/pages/tarefa/listar-tarefas-projeto';
import ListarNotificacoes from './components/pages/notificacao/listar-notificacoes';
import Home from './components/pages/home/home';

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/usuario/criar">CRIAR USUÁRIO</Link></li>
            <li><Link to="/usuario/listar">LISTAR USUÁRIOS</Link></li>
            <li><Link to="/projeto/criar">CRIAR PROJETO</Link></li>
            <li><Link to="/projeto/listar">LISTAR PROJETOS</Link></li>
            <li><Link to="/tarefa/criar">CRIAR TAREFA</Link></li>
            <li><Link to="/tarefa/listar">LISTAR TAREFAS</Link></li>
            <li><Link to="/notificacoes">NOTIFICAÇÕES</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuario/criar" element={<CriarUsuario />} />
          <Route path="/usuario/listar" element={<ListarUsuarios />} />
          <Route path="/usuario/alterar/:id" element={<AlterarUsuario />} />
          <Route path="/projeto/criar" element={<CriarProjeto />} />
          <Route path="/projeto/listar" element={<ListarProjetos />} />
          <Route path="/projeto/alterar/:id" element={<AlterarProjeto />} />
          <Route path="/tarefa/criar" element={<CriarTarefa />} />
          <Route path="/tarefa/listar" element={<ListarTarefas />} />
          <Route path="/tarefa/alterar/:id" element={<AlterarTarefa />} />
          <Route path="/tarefa/prioridade/:prioridade" element={<ListarTarefasPorPrioridade />} />
          <Route path="/projeto/:projetoId/tarefas" element={<ListarTarefasPorProjeto />} />
          <Route path="/notificacoes" element={<ListarNotificacoes />} />
        </Routes>
        <footer>
          <h2>Desenvolvido por Nicolas e Laura &copy;</h2>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
