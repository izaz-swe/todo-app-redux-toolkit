import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Form from "./components/Form";
import TodoStatus from "./components/TodoStatus";
import Todos from "./components/todos/Todos";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route
          path="/"
          element={
            <Layout>
              <TodoStatus />
              <Form />
              <Todos />
            </Layout>
          }
        />
      </Route>
      <Route path="/signup" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
