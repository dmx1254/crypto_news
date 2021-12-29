import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "./LineChart";
import HTMLReactParser from "html-react-parser";
import { Col, Row, Typography, Select } from "antd";

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useGetCryptosDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
  const  {  data : coinHistory  }  =  useGetCryptoHistoryQuery ( { coinId , timeperiod } ) ;
  const cryptoDetails = data?.data?.coin;
  console.log(coinHistory);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Prix en dollar",
      value: `$ ${cryptoDetails?.price && Number(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rang", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "Volume 24h",
      value: `$ ${cryptoDetails?.volume && Number(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Capitalisation boursiére",
      value: `$ ${
        cryptoDetails?.marketCap && Number(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "record(moyenne quotidienne)",
      value: `$ ${Number(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Nombre de marchets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Nombre d 'échanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprrovisonnement aprouvé",
      value: cryptoDetails?.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Offre totale",
      value: `$ ${Number(cryptoDetails?.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Alimentation en circulation",
      value: `$ ${Number(cryptoDetails?.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if(isFetching) return <Loader />;

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.slug}) price
        </Title>
        <p>
          {cryptoDetails?.name} Prix en direct en dollar américain. Afficher les
          statistiques de valeur, la capitalisation boursière et l'offre.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Selectionner la periode"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={Number(cryptoDetails?.price)} coinName={cryptoDetails?.name}/>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-detailes-heading">
              {cryptoDetails?.name} valeurs statistics
            </Title>
            <p>Un aperçu montrant les statistiques de {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Col className="stats">{value}</Col>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-detailes-heading">
               autre statistics
            </Title>
            <p>Un aperçu montrant les statistiques de tous les crypto-monnaies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Col className="stats">{value}</Col>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
                C'est quoi {cryptoDetails?.name} ?
                {HTMLReactParser(cryptoDetails?.description || '')}

            </Title>
          </Row>
          <Col className="coin-links">
              <Title level={3} className="coin-details-heading">
                    {cryptoDetails?.name} Lien
              </Title>
              {
                  cryptoDetails?.links?.map((link) => (
                      <Row className="coin-link" key={link?.name}>
                          <Title level={5} className="link-name">
                                {link?.type}
                          </Title>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                              {link.name}
                          </a>
                      </Row>
                  ))
              }
          </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
