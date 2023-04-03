function gastTestRunner() {
  /**
  *
  * GasT - Google Apps Script Testing-framework
  * 
  * GasT is a TAP-compliant testing framework for Google Apps Script. 
  * It provides a simple way to verify that the GAS programs you write 
  * behave as expected.
  *
  * Github - https://github.com/zixia/gast
  *
  */
  if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/huan/gast/master/src/gas-tap-lib.js').getContentText())
  } 

  var test = new GasTap();

  test('ZipCode', function(t) {
    t.ok(isZipCode('12345'), "Yay");
    t.notOk(isZipCode('1342'));
  })

  test.finish()
}