import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "b026c96035msh3a2baeae79989f9p17ccfejsn56c652a6dd97",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

// var options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/stats',
//     headers: {
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//       'x-rapidapi-key': 'b026c96035msh3a2baeae79989f9p17ccfejsn56c652a6dd97'
//     }
//   };

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (buider) => ({
    getCryptos: buider.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: buider.query({
      query: () => createRequest(`/exchanges`),
    }),
    getCryptosDetails: buider.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: buider.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history/${timeperiod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetExchangesQuery, useGetCryptosDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
