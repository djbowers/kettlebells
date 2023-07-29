const Airtable = require('airtable');
const dotenv = require('dotenv');

dotenv.config();

Airtable.configure({ apiKey: process.env.PERSONAL_ACCESS_TOKEN });

const base = Airtable.base(process.env.BASE_ID);

module.exports = { base };
