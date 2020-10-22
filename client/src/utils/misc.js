import axios from 'axios';
import Ajv from 'ajv';
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
  let isValid;
  try {
    isValid = true;
    new Coordinates(position);
    return isValid;
  } catch (error) {
    isValid = false;
    return isValid;
  }
}

