import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

const { Title } = Typography;

const HomePage = () => {
  console.log(process.env.REACT_APP_API_COINS_KEY);
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Statistiques  mondiale de crypto-monnaies
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total de Crypto-monnaies"
            value={globalStats.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total des Echanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Capitalisation Boursière totale"
            value={millify(globalStats?.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Volume total des 24h"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Marchés totaux"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 des crypto-monnaies dans le monde
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Voir plus</Link>
        </Title>
      </div>
      <Cryptocurrencies  simplified = {true}/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          dernières nouvelles sur les crypto-monnaies
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Voir plus</Link>
        </Title>
      </div>

      <News simplified = {true} />
    </>
  );
};

export default HomePage;
