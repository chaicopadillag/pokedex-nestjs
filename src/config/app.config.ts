/* eslint-disable prettier/prettier */
export const appConfig = () => ({
  node_env: process.env.NODE_ENV || 'development',
  port: +process.env.PORT || 5000,
  mongo_url: process.env.MONGO_URL,
  api_url: process.env.API_URL,
});
