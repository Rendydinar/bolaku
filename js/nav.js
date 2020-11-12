document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  let sidenav = document.querySelectorAll('.sidenav');  
  M.Sidenav.init(sidenav);
  // handle materialboxed
  let materialbox = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(materialbox);
  // handle parallax
  let parallax = document.querySelectorAll('.parallax');
  M.Parallax.init(parallax);

  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              // Tutup sidenav
              let sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  let page = window.location.pathname;
  if(page === "" ) {
    page = "home";
    loadPage(page);
  } 

  function loadPage(page) {
    // fetch('pages/' + page + '.html')
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        let content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);  
    xhttp.send();
  }
});
