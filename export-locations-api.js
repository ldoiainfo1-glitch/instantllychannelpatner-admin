/**
 * Export Locations from API to CSV
 * 
 * This script fetches all locations from the backend API
 * and exports them to a CSV file.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://instantllychannelpatner.onrender.com/api/locations/export-all';

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

// Fetch locations from API
async function fetchLocations() {
    return new Promise((resolve, reject) => {
        https.get(API_URL, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (error) {
                    reject(new Error('Failed to parse JSON response'));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// Main export function
async function exportLocations() {
    try {
        console.log('🚀 Starting location export...\n');
        console.log('📥 Fetching all locations from API...');
        console.log(`   URL: ${API_URL}\n`);
        
        const response = await fetchLocations();
        
        if (!response.success || !response.locations) {
            throw new Error('API response indicates failure or no locations found');
        }
        
        const locations = response.locations;
        console.log(`✅ Found ${locations.length} locations`);
        
        if (locations.length === 0) {
            console.log('⚠️  No locations found in database');
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
        const zones = [...new Set(locations.map(l => l.zone))].filter(Boolean).length;
        const states = [...new Set(locations.map(l => l.state))].filter(Boolean).length;
        const districts = [...new Set(locations.map(l => l.district))].filter(Boolean).length;
        const pincodes = [...new Set(locations.map(l => l.pincode))].filter(Boolean).length;
        
        console.log(`\n📊 Statistics:`);
        console.log(`   - Unique Zones: ${zones}`);
        console.log(`   - Unique States: ${states}`);
        console.log(`   - Unique Districts: ${districts}`);
        console.log(`   - Unique Pincodes: ${pincodes}`);
        
    } catch (error) {
        console.error('\n❌ Error exporting locations:', error.message);
        console.error('\nNote: Make sure the backend API is running and accessible.');
        console.error('You may need to add an export endpoint to the backend.');
        process.exit(1);
    }
}

// Run the export
exportLocations();
