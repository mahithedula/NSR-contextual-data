
const URL = "https://docs.google.com/spreadsheets/d/1ZSX-3UuxJnq0ti0HF-J5Mvyh5BtJ3OyeSt2dDP-EI3o/edit?resourcekey#gid=142789237";


function myFunction() {
  /**
   * Converts the given form URL into a JSON object.
   */
  var jsonOutput = converter(URL);
  Logger.log("All responses are converted to JSON: \n" + jsonOutput);

  moveData(URL);
  Logger.log("Tagged data are moved to sheet 2");
}
