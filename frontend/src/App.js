import "./App.css";
import Layout from "./component/Layout";
import IndexPage from "./component/IndexPage";
import Create from "./component/CreateBlog";
import Login from "./auth/LoginPage";
import Register from "./auth/RegisterPage";
import UserContextProvider from "./context/UserContext"
import { Routes, Route } from "react-router-dom";
import PostPage from "./component/PostPage";
import EditPost from "./component/EditPost";
function App() {
  return (
    <UserContextProvider>
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={
          <IndexPage/>
        }/>
      <Route path={"/login"} element={
        <Login/>
      }/>
      <Route path={"/register"} element={<Register/>}/>
      <Route path={"/create"} element={<Create/>}/>
      <Route path="/post/:id" element={<PostPage/>}/>
      <Route path="/edit/:id" element={<EditPost/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
