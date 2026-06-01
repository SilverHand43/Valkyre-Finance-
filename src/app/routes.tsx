import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Onboarding from "./pages/Onboarding";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import FluxoCaixa from "./pages/FluxoCaixa";
import Inventario from "./pages/Inventario";
import Funcionarios from "./pages/Funcionarios";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/cadastro",
    Component: Cadastro,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "receitas", Component: Receitas },
      { path: "despesas", Component: Despesas },
      { path: "fluxo-caixa", Component: FluxoCaixa },
      { path: "inventario", Component: Inventario },
      { path: "funcionarios", Component: Funcionarios },
      { path: "relatorios", Component: Relatorios },
      { path: "configuracoes", Component: Configuracoes },
    ],
  },
]);
