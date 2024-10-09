// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<DB_PASSWORD>',
    process.env.DATABASE_PASSWORD
);

async function dbConnect() {
    await mongoose.connect(DB);
}
dbConnect().then(() => {
    console.log('DB connection successfully');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
