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
import Home from './components/pages/home/home';
import ListarNotificacoes from './components/pages/Notificações/listar-notificações';
function App() {
  return (
    <>
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/usuario/criar">CRIAR USUÁRIO</Link></li>
            <li><Link to="/usuario/listar">USUÁRIOS</Link></li>
            <li><Link to="/projeto/criar">CRIAR PROJETO</Link></li>
            <li><Link to="/projeto/listar">PROJETOS</Link></li>
            <li><Link to="/tarefa/criar">CRIAR TAREFA</Link></li>
            <li><Link to="/tarefa/listar">TAREFAS</Link></li>
            <li><Link to="/usuario/notificacao">NOTIFICACOES</Link></li>
          </ul>
        </nav>  
      </header>
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
          <Route path="/usuario/notificacao" element={<ListarNotificacoes />} />
        </Routes>
      <footer>
        <h2>Desenvolvido por Nicolas e Laura &copy;</h2>
      </footer>
    </BrowserRouter>
  </>
  );
}

export default App;