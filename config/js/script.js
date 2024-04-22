const fs = require('fs');

function openNav() {
 document.getElementById("myLeftnav").style.width = "250px";
 document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
 document.getElementById("myLeftnav").style.width = "0";
 document.getElementById("main").style.marginLeft = "0";
}

function getConfig(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      document.getElementById("config").value = "Invalid config path";
    } else {
      document.getElementById("config").value = data;
      localStorage.setItem('configData', data);
      localStorage.setItem('path', path);
    }
  });
}

window.onload = () => {
  fs.readFile(localStorage.getItem('path'), 'utf8', (err, data) => {
    document.getElementById("config").value = data;
    localStorage.setItem('configData', data);
  });
  const configInputData = localStorage.getItem('configInputData');
  if (configInputData) {
     document.getElementById("configInput").value = configInputData;
  }
}; 

document.getElementById("config").addEventListener('input', (event) => {
  localStorage.setItem('configData', event.target.value);
  const filePath = localStorage.getItem('path');
  fs.writeFile(filePath, event.target.value, 'utf8', (err) => {
     if (err) {
       console.error('An error occurred while writing to the file:', err);
     } else {
       console.log('File has been successfully written');
     }
  });
});

document.getElementById("configInput").addEventListener('input', (event) => {
  localStorage.setItem('configInputData', event.target.value);
});