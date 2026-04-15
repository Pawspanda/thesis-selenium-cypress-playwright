// convert-to-excel.js
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Path to mochawesome JSON
const filePath = path.join(__dirname, 'report', 'json', 'mochawesome.json');

if (!fs.existsSync(filePath)) {
  console.error('❌ JSON file not found.');
  process.exit(1);
}

// Read JSON
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let rows = [];

// Traverse mochawesome structure
data.results.forEach(result => {
  result.suites.forEach(suite => {

    suite.tests.forEach(test => {
      rows.push({
        Title: test.fullTitle || `${suite.title} > ${test.title}`,
        Status: test.state,
        Error: test.err?.message || '',
        Duration: test.duration != null ? test.duration : ''
      });
    });

  });
});

if (!rows.length) {
  console.error('❌ No tests found.');
  process.exit(1);
}

// Create worksheet
const worksheet = xlsx.utils.json_to_sheet(rows);

// Auto column width (nice upgrade)
const colWidths = Object.keys(rows[0]).map(key => ({
  wch: Math.max(
    key.length,
    ...rows.map(row => (row[key] ? row[key].toString().length : 0))
  )
}));
worksheet['!cols'] = colWidths;

// Color Status column
const range = xlsx.utils.decode_range(worksheet['!ref']);
for (let R = 1; R <= range.e.r; ++R) {
  const statusCell = worksheet[xlsx.utils.encode_cell({ r: R, c: 1 })];

  if (!statusCell) continue;

  if (statusCell.v === 'passed') {
    statusCell.s = { fill: { fgColor: { rgb: "C6EFCE" } } };
  } else if (statusCell.v === 'failed') {
    statusCell.s = { fill: { fgColor: { rgb: "FFC7CE" } } };
  }
}

// Create workbook
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'Test Results');

// Save file
xlsx.writeFile(workbook, 'TestResults.xlsx');

console.log('✅ Excel created with durations 🚀');