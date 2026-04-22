const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('../lib/db');
const State = require('../models/State');
const states = require('../data/states');

dotenv.config();

async function seedStates() {
    try {
        await connectDB();

        const operations = states.map((state) => ({
            updateOne: {
                filter: { name: state.name },
                update: { $set: state },
                upsert: true,
            },
        }));

        const result = await State.bulkWrite(operations, { ordered: false });
        const total = await State.countDocuments();

        console.log(`States seed completed. Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}, Total in collection: ${total}`);
    } catch (error) {
        console.error('Error while seeding states:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
}

seedStates();
