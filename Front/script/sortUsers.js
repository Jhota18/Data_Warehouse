function sortByNameA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

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
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

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

function sortByLastNameA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

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

function sortByLastNameZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

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

function sortByEmailA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[2];
      y = rows[i + 1].getElementsByTagName("h3")[2];
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

function sortByEmailZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

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

function sortByProfileA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[3];
      y = rows[i + 1].getElementsByTagName("h3")[3];
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

function sortByProfileZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

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
