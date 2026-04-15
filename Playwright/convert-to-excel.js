const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

async function convert() {
  const filePath = path.join(__dirname, 'results.json');

  if (!fs.existsSync(filePath)) {
    console.log('❌ results.json not found');
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Test Results');

  sheet.columns = [
    { header: 'Test Name', key: 'name', width: 60 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Duration (ms)', key: 'duration', width: 18 },
  ];

  function extractSuites(suites) {
    for (const suite of suites || []) {

      // Extract tests inside this suite
      for (const spec of suite.specs || []) {
        for (const test of spec.tests || []) {
          for (const result of test.results || []) {
            sheet.addRow({
              name: spec.title,
              status: result.status,
              duration: result.duration,
            });
          }
        }
      }

      // Recurse into nested suites
      if (suite.suites && suite.suites.length > 0) {
        extractSuites(suite.suites);
      }
    }
  }

  extractSuites(data.suites);

  await workbook.xlsx.writeFile('test-results.xlsx');

  console.log('✅ Excel file created: test-results.xlsx');
}

convert();