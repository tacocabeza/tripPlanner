import {LATITUDE_REGEX, LONGITUDE_REGEX} from "./constants";
let Coordinates = require('coordinate-parser');

export function downloadFile(fileText, fileName, fileType) {
  fileText = JSON.stringify(fileText)
  let file = new Blob([fileText], {type: fileType});
  let a = document.createElement('a'),
  url = URL.createObjectURL(file);
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

export function isValidPosition(position) {
  let error;
  try {
    let coords = new Coordinates(position);

    return (isValidLatitude(coords.getLatitude())) &&
      (isValidLongitude(coords.getLongitude()));
  } catch (error) {
    return false;
  }
}

export function isValidLatitude(latitude) {
  let error;
  try {
    let coords = new Coordinates(latitude + ", 0.0");
    let lat = String(coords.getLatitude());

    let isValid = lat.match(LATITUDE_REGEX);

    return isValid;
  } catch (error) {
    return false;
  }
}

export function isValidLongitude(longitude) {
  let error;
  try {
    let coords = new Coordinates("0.0, " + longitude);
    let lng = String(coords.getLongitude());

    let isValid = lng.match(LONGITUDE_REGEX);

    return isValid;
  } catch (error) {
    return false;
  }
}

