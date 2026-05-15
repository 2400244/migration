import * as fs from 'fs';
import * as path from 'path';

/**
 * Test data structure for credentials and other test inputs
 * Converted from Excel-based data management to TypeScript objects
 * 
 * Original: ExcelUtils.java reading from testdata.xlsx
 * Migration approach: Static TypeScript data structures (recommended)
 * Alternative: Could use 'xlsx' npm package to read Excel at runtime if needed
 */

export interface UserCredentials {
  username: string;
  password: string;
  expectedResult?: string;
  testCase?: string;
}

export interface TestDataSheet {
  sheetName: string;
  data: UserCredentials[];
}

/**
 * Login test data - typically stored in 'Login' or 'Credentials' sheet
 * Replace this with actual data from your testdata.xlsx file
 */
export const loginTestData: UserCredentials[] = [
  {
    username: 'validuser@example.com',
    password: 'ValidPass123',
    expectedResult: 'success',
    testCase: 'valid_credentials'
  },
  {
    username: 'invaliduser@example.com',
    password: 'WrongPass',
    expectedResult: 'error',
    testCase: 'invalid_credentials'
  },
  {
    username: '',
    password: '',
    expectedResult: 'validation_error',
    testCase: 'empty_credentials'
  },
  {
    username: 'user@example.com',
    password: '',
    expectedResult: 'validation_error',
    testCase: 'empty_password'
  }
];

/**
 * Sample test data - typically stored in 'TestData' or 'Sample' sheet
 */
export const sampleTestData: any[] = [
  {
    testId: 'TC001',
    description: 'Sample test case 1',
    input: 'test input',
    expected: 'expected output'
  },
  {
    testId: 'TC002',
    description: 'Sample test case 2',
    input: 'another input',
    expected: 'another output'
  }
];

/**
 * All test data organized by sheet name
 */
export const testDataSheets: Record<string, any[]> = {
  Login: loginTestData,
  Credentials: loginTestData,
  TestData: sampleTestData,
  Sample: sampleTestData
};

/**
 * Helper class to mimic original ExcelUtils API
 * Provides backward-compatible interface for existing test code
 */
export class TestDataHelper {
  private currentSheet: string = '';
  private currentData: any[] = [];

  /**
   * Set the active sheet to read data from
   * Original: setExcelFileSheet(sheetName)
   */
  setSheet(sheetName: string): void {
    this.currentSheet = sheetName;
    this.currentData = testDataSheets[sheetName] || [];
    if (this.currentData.length === 0) {
      console.warn(`No test data found for sheet: ${sheetName}`);
    }
  }

  /**
   * Get cell data by row and column index
   * Original: getCellData(rowNum, colNum)
   * 
   * Note: Assumes data is array of objects where columns map to object keys
   * Row 0 = header row, data starts at row 1
   */
  getCellData(rowNum: number, colNum: number): string {
    if (rowNum === 0) {
      // Header row - return column names
      const keys = Object.keys(this.currentData[0] || {});
      return keys[colNum] || '';
    }
    
    const dataRow = this.currentData[rowNum - 1]; // Adjust for 0-based array
    if (!dataRow) return '';
    
    const keys = Object.keys(dataRow);
    const key = keys[colNum];
    return String(dataRow[key] || '');
  }

  /**
   * Get total row count including header
   * Original: getRowCount()
   */
  getRowCount(): number {
    return this.currentData.length + 1; // +1 for header row
  }

  /**
   * Get entire row data as object
   * Original: getRowData(rowNum)
   */
  getRowData(rowNum: number): any {
    if (rowNum === 0) {
      // Return header row as object keys
      return Object.keys(this.currentData[0] || {});
    }
    return this.currentData[rowNum - 1]; // Adjust for 0-based array
  }

  /**
   * Get all data from current sheet
   */
  getAllData(): any[] {
    return this.currentData;
  }

  /**
   * Find row by field value
   */
  findRow(fieldName: string, value: string): any | undefined {
    return this.currentData.find(row => row[fieldName] === value);
  }
}

/**
 * Create singleton instance for backward compatibility
 */
export const testDataHelper = new TestDataHelper();

/**
 * Utility to get credentials by test case name
 */
export function getCredentialsByTestCase(testCase: string): UserCredentials | undefined {
  return loginTestData.find(cred => cred.testCase === testCase);
}

/**
 * Utility to get all valid credentials
 */
export function getValidCredentials(): UserCredentials[] {
  return loginTestData.filter(cred => cred.expectedResult === 'success');
}

/**
 * Utility to get all invalid credentials
 */
export function getInvalidCredentials(): UserCredentials[] {
  return loginTestData.filter(cred => cred.expectedResult !== 'success');
}

// TODO: migrate — If runtime Excel reading is required, install 'xlsx' package:
// npm install xlsx @types/xlsx
// Then implement Excel reading logic similar to:
/*
import * as XLSX from 'xlsx';

export function readExcelFile(filePath: string, sheetName: string): any[] {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet);
}

export function loadTestDataFromExcel(): void {
  const excelPath = path.join(process.cwd(), 'src', 'test', 'resources', '../test-data/testdata.xlsx');
  testDataSheets.Login = readExcelFile(excelPath, 'Login');
  testDataSheets.TestData = readExcelFile(excelPath, 'TestData');
}
*/