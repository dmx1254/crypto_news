import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "https://coinranking1.p.rapidapi.com";



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
