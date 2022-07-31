/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Joi from 'joi';

export const appConfigValidation = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  MONGO_URL: Joi.string().required(),
  API_URL: Joi.string().required(),
});
