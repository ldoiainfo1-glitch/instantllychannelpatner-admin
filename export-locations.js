/**
 * Export Locations from Database to CSV
 * 
 * This script fetches all locations from the MongoDB database
 * and exports them to a CSV file.
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB Connection String
const MONGODB_URI = 'mongodb+srv://channel_partner_database:Newpass123@channelpartner-prod.pmy5cc.mongodb.net/channelpartner?retryWrites=true&w=majority&appName=channelpartner-prod';

// Location Schema (matching your backend model)
const locationSchema = new mongoose.Schema({
    country: { type: String, required: true },
    zone: { type: String, required: true },
    state: { type: String, required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    tehsil: { type: String, required: true },
    pincode: { type: String, required: true },
    village: { type: String, required: true }
}, { collection: 'locations' });

const Location = mongoose.model('Location', locationSchema);

// Convert JSON to CSV
function jsonToCSV(data) {
    if (data.length === 0) return '';
    
    // Headers
    const headers = ['country', 'zone', 'state', 'division', 'district', 'tehsil', 'pincode', 'village'];
    const csvRows = [headers.join(',')];
    
    // Data rows
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header] || '';
            // Escape commas and quotes in values
            const escaped = value.toString().replace(/"/g, '""');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
}

// Main export function
async function exportLocations() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        
        console.log('📥 Fetching all locations from database...');
        const locations = await Location.find({})
            .sort({ state: 1, district: 1, tehsil: 1, village: 1 })
            .lean();
        
        console.log(`✅ Found ${locations.length} locations`);
        
        if (locations.length === 0) {
            console.log('⚠️  No locations found in database');
            await mongoose.disconnect();
            return;
        }
        
        console.log('📝 Converting to CSV format...');
        const csv = jsonToCSV(locations);
        
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const filename = `locations-export-${timestamp}.csv`;
        const filepath = path.join(__dirname, filename);
        
        console.log('💾 Writing to file...');
        fs.writeFileSync(filepath, csv, 'utf8');
        
        console.log(`\n✅ Export completed successfully!`);
        console.log(`📄 File saved: ${filename}`);
        console.log(`📊 Total locations exported: ${locations.length}`);
        
        // Show sample statistics
        const zones = [...new Set(locations.map(l => l.zone))].length;
        const states = [...new Set(locations.map(l => l.state))].length;
        const districts = [...new Set(locations.map(l => l.district))].length;
        
        console.log(`\n📊 Statistics:`);
        console.log(`   - Zones: ${zones}`);
        console.log(`   - States: ${states}`);
        console.log(`   - Districts: ${districts}`);
        
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
        
    } catch (error) {
        console.error('❌ Error exporting locations:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

// Run the export
console.log('🚀 Starting location export...\n');
exportLocations();
