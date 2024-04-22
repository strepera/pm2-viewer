const gistId = '92787e502ca6a3babe43c3a20ff9a4ec';

function openNav() {
  document.getElementById("myLeftnav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("myLeftnav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
} 

async function getGist() {
  const response = await fetch(`https://api.github.com/gists/${gistId}`);
  const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
   
  if (rateLimitRemaining === '0') {
     return 'You are being rate limited. (Limit: 60 requests/h)';
  }
   
  const gistData = await response.json();
  const users = JSON.parse(gistData.files['users.json'].content);
  return users;
 }

window.onload = async () => {
  const data = await getGist();
  if (data == 'You are being rate limited. (Limit: 60 requests/h)') {
    document.getElementById("playerData").innerHTML = data;
    return;
  }
  data.sort((a, b) => a.username.localeCompare(b.username));

  let lines = [];
  for (const entry in data) {
    let line = [];
    line.push('<strong>' + data[entry].username + '</strong> | ' + '<div class="dcuser">Discord Username: ' + data[entry].dcuser + ' </div>| <div class="uuid">UUID: ' + data[entry].uuid + '</div>');
    if (data[entry].prefixes) {
      line.push('<button class="button buttons" onclick="togglePrefixes(this);">+</button>');
      line.push('<div class="prefixes">');
      if (data[entry].prefixes) {
        line.push('<div class="selectedPrefix">Selected Prefix: ' + data[entry].prefix + '</div>');
        line.push('<div class=ownedPrefix>Owned Prefixes:')
        data[entry].prefixes.forEach(prefix => {
          line.push(prefix);
        });
        line.push('</div>');
      }
      if (data[entry].colors) {
        line.push('<div class="selectedPrefix">Selected Color: ' + data[entry].color + '</div>');
        line.push('<div class=ownedPrefix>Owned Colors:');
        data[entry].colors.forEach(color => {
          line.push(color);
        });
      }
      line.push('</div></div>');
    }
    lines.push(line.join(' '));
  }
  document.getElementById("playerData").innerHTML = lines.join('<br><br>');
  var elements = document.getElementsByClassName('prefixes');
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
  }
}

function togglePrefixes(element) {
  const prefixesList = element.nextElementSibling;
  if (element.innerText == '=') {
    element.innerText = '+';
    prefixesList.style.animation = 'fadeOut 1s';
    setTimeout(() => {
      prefixesList.style.display = 'none';
    }, 700);
    return;
  }
  else {
    element.innerText = '=';
    prefixesList.style.animation = 'fadeIn 1s';
    prefixesList.style.display = 'block';
    return;
  }
}