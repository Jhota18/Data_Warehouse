

function sortByNameA() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    while (switching) {
        
      switching = false;
      rows = document.querySelectorAll('.contact');
      
      for (i = 0; i < (rows.length - 1); i++) {
        
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
    table = document.getElementById("myTable");
    switching = true;
    while (switching) {
        
      switching = false;
      rows = document.querySelectorAll('.contact');
      
      for (i = 0; i < (rows.length - 1); i++) {
        
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