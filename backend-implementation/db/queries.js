import bluebird from 'bluebird';
import pgp from 'pg-promise';

const options = {
  promiseLib: bluebird
}
const connectionString = 'postgres://localhost:5432/picture-denoising';

const db = pgp(options)(connectionString);