import fs from 'fs';
import path from 'path';
import { Agency, Contact } from './types';

// Helper to parse CSV string into array of objects
function parseCSV<T>(content: string): T[] {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());

    return lines.slice(1).map(line => {
        // Handle comma-separated values, respecting quotes if present
        // Simple regex for CSV parsing: matches quoted fields or non-comma sequences
        const values: string[] = [];
        let match;
        const regex = /(?:^|,)(?:"([^"]*)"|([^",]*))/g;

        // Reset regex index for safety
        let currentLine = line.trim();
        while ((match = regex.exec(currentLine)) !== null) {
            // match[1] is quoted value, match[2] is unquoted value
            // We filter out empty matches that occur at the end of strings sometimes
            if (match[0] === '' && values.length === headers.length) break;
            let val = match[1] || match[2] || '';
            values.push(val.trim());
        }

        // Map headers to values
        const entry: any = {};
        headers.forEach((header, index) => {
            // Clean header name if needed (e.g., remove BOM)
            const cleanHeader = header.replace(/^[\uFEFF\uFFFE]/, '');
            if (values[index] !== undefined) {
                entry[cleanHeader] = values[index];
            }
        });

        return entry as T;
    });
}

export async function getAgencies(): Promise<Agency[]> {
    try {
        const filePath = path.join(process.cwd(), 'data', 'agencies_agency_rows.csv');
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        return parseCSV<Agency>(fileContent);
    } catch (error) {
        console.error("Failed to load agencies CSV:", error);
        return [];
    }
}

export async function getContacts(): Promise<Contact[]> {
    try {
        const filePath = path.join(process.cwd(), 'data', 'contacts_contact_rows.csv');
        // Check if file exists to prevent crash
        if (!fs.existsSync(filePath)) return [];

        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        return parseCSV<Contact>(fileContent);
    } catch (error) {
        console.error("Failed to load contacts CSV:", error);
        return [];
    }
}
