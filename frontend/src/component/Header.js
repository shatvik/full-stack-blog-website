// import { response } from "express";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const Header = () => {
  const {setUserInfo,userInfo} = useContext(UserContext) //using context
  // const {setUserInfo,userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:8080/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      });
    });
  });
  const logout = () => {
    fetch("http://localhost:8080/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };
  const username = userInfo?.username //bcoz it can be null sometimes
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to={"/create"}>Create new Post</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
