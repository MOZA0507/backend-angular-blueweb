import 'dotenv/config';
import {get} from 'env-var';

export const envs = {
  USER: get('USER').required().asString(),
  PASS: get('PASS').required().asString(),
  SERVER: get('SERVER').required().asString(),
  DB: get('DB').required().asString(),
}