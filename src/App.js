import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  NavBar,
  Exchanges,
  HomePage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";
import "./App.css";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ colr: "white", textAlign: "center" }}
          >
            msycrypto <br />
            tous droits réservés
          </Typography.Title>
          <Space>
            <Link to="/">Accueil</Link>
            <Link to="/exchanges">Echanges</Link>
            <Link to="news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
