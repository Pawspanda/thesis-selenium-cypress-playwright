const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

async function convert() {
  const reportDir = path.resolve(__dirname, '../report');
  console.log('Reading JSON files from:', reportDir);

  // Get all mochawesome JSON files
  const files = fs.readdirSync(reportDir)
    .filter(file => file.endsWith('.json'));

  if (files.length === 0) {
    console.log('❌ No JSON files found!');
    return;
  }

  let allTests = [];

  function collectTestsFromSuites(suites) {
    if (!suites) return [];

    let tests = [];

    if (!Array.isArray(suites)) {
      suites = [suites];
    }

    for (const suite of suites) {
      if (Array.isArray(suite.tests)) {
        tests = tests.concat(suite.tests);
      }

      if (suite.suites) {
        tests = tests.concat(collectTestsFromSuites(suite.suites));
      }
    }

    return tests;
  }

  // Loop through all JSON files
  for (const file of files) {
    const filePath = path.join(reportDir, file);
    console.log('Processing:', filePath);

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (Array.isArray(data.results)) {
      for (const result of data.results) {
        if (result.suites) {
          allTests = allTests.concat(
            collectTestsFromSuites(result.suites)
          );
        }
      }
    }
  }

  if (allTests.length === 0) {
    console.log('⚠️ No tests found in any JSON file!');
    return;
  }

  // Create Excel
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Test Results');

  sheet.columns = [
    { header: 'Run', key: 'run', width: 10 },
    { header: 'Test Name', key: 'name', width: 50 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Duration (ms)', key: 'duration', width: 18 },
  ];

  let runNumber = 1;

  for (const test of allTests) {
    const row = sheet.addRow({
      run: runNumber++,
      name: test.fullTitle || test.title,
      status: test.state,
      duration: test.duration,
    });

    if (test.state === 'passed') {
      row.getCell('status').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFB6D7A8' },
      };
    } else if (test.state === 'failed') {
      row.getCell('status').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF4C7C3' },
      };
    }
  }

  await workbook.xlsx.writeFile('test-results.xlsx');
  console.log('✅ Excel file created: test-results.xlsx');
}

convert();