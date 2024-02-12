import React from "react";
import Header from "../components/Header";

function Layout({children}) {
  return (
    <div className="App">
      <Header/>
      <div className="main">
        <div className="container">
          {children}
        </div>
      </div>
      <div className="footer">&copy;2024 Innovatica Software Limited</div>
    </div>
  );
}

export default Layout;
