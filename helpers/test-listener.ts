import { Reporter, TestCase, TestResult, FullConfig, Suite, FullResult } from '@playwright/test/reporter';

/**
 * Custom Playwright reporter that mimics TestNG TestListener behavior.
 * Note: Playwright has built-in reporters (html, json, junit, etc.) that should be preferred.
 * This is provided for compatibility with the original TestListener functionality.
 * 
 * To use this reporter, add to playwright.config.ts:
 * reporter: [['html'], ['./helpers/test-listener.ts']]
 */
export default class TestListener implements Reporter {
  
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`I am in onStart method : ${suite.allTests().length} tests`);
  }

  onEnd(result: FullResult) {
    console.log(`I am in onFinish method : ${result.status}`);
  }

  onTestBegin(test: TestCase) {
    console.log(`I am in onTestStart method : ${test.title}: start`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const testName = test.title;
    
    switch (result.status) {
      case 'passed':
        console.log(`I am in onTestSuccess method : ${testName}: succeed`);
        // TODO: migrate - setCellData('PASSED') removed - Playwright tests should not modify test data files
        // Use built-in reporters (html, json, junit) for test results instead
        break;
      
      case 'failed':
        console.log(`I am in onTestFailure method : ${testName} failed`);
        // TODO: migrate - setCellData('FAILED') removed - use built-in reporters instead
        // Playwright automatically captures screenshots/traces on failure when configured in playwright.config.ts
        break;
      
      case 'skipped':
        console.log(`I am in onTestSkipped method : ${testName}: skipped`);
        // TODO: migrate - setCellData('SKIPPED') removed - use built-in reporters instead
        break;
      
      case 'timedOut':
        console.log(`Test failed but it is in defined success ratio ${testName}`);
        break;
    }
  }
}
