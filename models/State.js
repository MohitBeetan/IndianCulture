const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        capital: {
            type: String,
            required: true,
            trim: true,
        },
        region: {
            type: String,
            required: true,
            enum: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
        },
        languages: {
            type: [String],
            default: [],
        },
        famousFor: {
            type: [String],
            default: [],
        },
        overview: {
            type: String,
            default: '',
        },
        geography: {
            type: String,
            default: '',
        },
        history: {
            type: String,
            default: '',
        },
        bestTimeToVisit: {
            type: String,
            default: '',
        },
        idealTripDuration: {
            type: String,
            default: '',
        },
        cultureHighlights: {
            type: [String],
            default: [],
        },
        cuisineHighlights: {
            type: [String],
            default: [],
        },
        economyHighlights: {
            type: [String],
            default: [],
        },
        travelTips: {
            type: [String],
            default: [],
        },
        mustVisit: {
            type: [
                {
                    name: { type: String, required: true },
                    description: { type: String, default: '' },
                },
            ],
            default: [],
        },
        majorFestivals: {
            type: [
                {
                    name: { type: String, required: true },
                    month: { type: String, default: '' },
                    note: { type: String, default: '' },
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('State', stateSchema);
