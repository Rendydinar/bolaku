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
              // Muat konten halaman yang dipanggil
              let page = event.target.getAttribute("href").substr(1);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

window.addEventListener('hashchange', function(){
  loadPage();
})

  // Load page content
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(pageTemp) {
    let page;
    if(window.location.hash.substr(1) === "") {
      page === "home";
      requestPage(pageTemp);
    } else if(window.location.hash.substr(1) === "ligachampions" || window.location.hash.substr(1) === "liga2021" || window.location.hash.substr(1) === "liga2014" || window.location.hash.substr(1) === "liga2019") {
      page = "klasemen";
      requestPage(page);
    } else if(window.location.hash.substr(1) === "saved") {
      page = "saved";
      requestPage(page);
    } else if(window.location.hash.substr(1,10) === "detailteam") {
      page = "detail-team";
      requestPage(page);
    } else if (window.location.hash.substr(1,18) === "jadwalpertandingan") {
      page = "jadwal-pertandingan";
      requestPage(page);
    } else {
      page = "404";
      requestPage(page);
    }
  }
});

function requestPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        let content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          requestApi();
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

function requestApi() {
  let apiRequestTo = window.location.hash.substr(1);
  let idTeam = window.location.hash.substr(15,window.location.length);
  switch (apiRequestTo) {
    case 'home': 
    case ' ' : 
    case '' : 
      showHome();
      break; 
    case 'liga2021' : 
      getKlasemenLiga('2021');
      break; 
    case 'liga2014' : 
      getKlasemenLiga('2014');
      break; 
    case 'liga2019' :
      getKlasemenLiga('2019');
      break; 
    case 'ligachampions' : 
      getKlasemenLigaChampion();
      break;
    case 'saved' : 
      getSavedFavoritTeams();
      break;
    default:
      if(window.location.hash.substr(1,10) === "detailteam") {
        let teamId = window.location.hash.substr(15,window.location.length);
        let urlsParams = new URLSearchParams(window.location.search);
        let isFromSaved = urlsParams.get('saved');
        let btnSave = document.getElementById('save');
        let item = '';

        if(window.location.hash.substr(18,window.location.length) === "saved=true") {
          // Hide fab jika dimuat dari indexed db
          btnSave.style.display = 'none';
          // Ambil artikel lalu tampilkan
          getSavedFavoritTeamId();
        } else {
          item = getDetailTeam(Number(teamId));
        }
      
        btnSave.onclick = function() {
          console.log('Tombol FAB di Klik');
          item.then(function(article) {
<<<<<<< HEAD
=======
            console.log('detail page: ', item)
>>>>>>> f55d16d26ab1b116d932a50ec19dd7fe6c63f6fb
            saveForLater(article);
            showNotifikasiGambar(article);
          });
        }
      } else if (window.location.hash.substr(1,18) === "jadwalpertandingan" ) {
          getJadwalPertandingan(Number(window.location.hash.slice(23)));  
      } else {
        alert('klasemen Tidak Ditemukan');
      }
      break;
  }
}


