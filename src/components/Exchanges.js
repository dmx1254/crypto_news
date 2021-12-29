import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  console.log(data);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Echanges</Col>
        <Col span={6}>Echanges sur 24h</Col>
        <Col span={6}>Marchés</Col>
        <Col span={6}>Monnaie</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange?.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col className="rowspan" span={6}>${millify(exchange.volume)}</Col>
                    <Col className="rows" span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col className="rows" span={6}>{millify(exchange.marketShare)}%</Col>
                  </>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
