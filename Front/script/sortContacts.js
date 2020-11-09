function sortByNameA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("contactsContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".contact");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[0];
      y = rows[i + 1].getElementsByTagName("h3")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByNameZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("contactsContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".contact");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[0];
      y = rows[i + 1].getElementsByTagName("h3")[0];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByCountryA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("contactsContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".contact");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[1];
      y = rows[i + 1].getElementsByTagName("h3")[1];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByCountryZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("contactsContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".contact");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[1];
      y = rows[i + 1].getElementsByTagName("h3")[1];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByCompanyA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("contactsContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".contact");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[2];
      y = rows[i + 1].getElementsByTagName("h3")[2];
      console.log(x);
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByCompanyZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("contactsContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".contact");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[2];
      y = rows[i + 1].getElementsByTagName("h3")[2];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByRoleA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("contactsContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".contact");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[3];
      y = rows[i + 1].getElementsByTagName("h3")[3];
      console.log(x);
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByRoleZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("contactsContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".contact");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[3];
      y = rows[i + 1].getElementsByTagName("h3")[3];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
