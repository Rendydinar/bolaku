const base_url = 'https://api.football-data.org/';
const API_KEY = '32be0388057040128d81bba39ce7551d';
const optionsAPIRequest = {
  method: 'GET',
  headers: {
    "X-Auth-Token": API_KEY,
  }
}  

const colorMix = ['red', 'pink', 'purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'amber', 'orange', 'grey', 'brown']

const getKlasemenLiga = (idKlasemen) => {
  if('caches' in window) {
    caches.match(base_url + `v2/competitions/${idKlasemen}/standings`, optionsAPIRequest).then(function(response) {
      if(response) {
        response.json().then(function (data) {
          document.getElementById('loading').style.visibility = "hidden"; 
          showDataKlasemen(data);
        });
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('loading').style.visibility = "hidden"; 
      document.querySelector('#body-content').innerHTML = "<h1>Error</h1>";
    });
  }

  fetch(`${base_url}v2/competitions/${idKlasemen}/standings`, optionsAPIRequest)
    .then(response => response.json())
    .then(data => {
      document.getElementById('loading').style.visibility = "hidden"; 
      showDataKlasemen(data);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('loading').style.visibility = "hidden"; 
    });
}

const getKlasemenLigaChampion = () => {
  document.querySelector('#body-content').innerHTML = `<h1><div class="loading" id="loading">Loading&#8230;</div></h1>`;
  if('caches' in window) {
    caches.match(base_url + `v2/competitions/2001/standings`, optionsAPIRequest).then(function(response) {
      if(response) {
        response.json().then(function (data) {
          document.getElementById('loading').style.visibility = "hidden"; 
          showDataKlasemenLigaChampion(data);
        });
      }
    })
  }

  fetch(`${base_url}v2/competitions/2001/standings`, optionsAPIRequest)
    .then(response => response.json())
    .then(data => {
      document.getElementById('loading').style.visibility = "hidden"; 
      showDataKlasemenLigaChampion(data);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('loading').style.visibility = "hidden"; 
  });
}

const getJadwalPertandingan = (teamId) => {
  if('caches' in window) {
    caches.match(base_url + `v2/teams/${teamId}/matches?status=SCHEDULED`, optionsAPIRequest).then(function(response) {
      if(response) {
        response.json().then(function (data) {
          document.getElementById('loading').style.visibility = "hidden"; 
          showJadwalPertandingan(data);
        });
      }
    })
  }

  fetch(`${base_url}v2/teams/${teamId}/matches?status=SCHEDULED`, optionsAPIRequest)
    .then(response => response.json())
    .then(data => {
      document.getElementById('loading').style.visibility = "hidden"; 
      showJadwalPertandingan(data);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('loading').style.visibility = "hidden"; 
  });
}

const getDetailTeam = (idTeam) => {
  return new Promise(function(resolve, reject) {
    if('caches' in window) {
      caches.match(base_url + `v2/teams/${idTeam}`, optionsAPIRequest).then(function(response) {
        if(response) {
          response.json().then(function (data) {
            document.getElementById('loading').style.visibility = "hidden"; 
            showDataDetailTeam(data);
            resolve(data);
          });
        }
      })
    }

    fetch(`${base_url}v2/teams/${idTeam}`, optionsAPIRequest)
      .then(response => response.json())
      .then(data => {
        document.getElementById('loading').style.visibility = "hidden"; 
        showDataDetailTeam(data);
        resolve(data);
      })
      .catch(err => {
        console.error(err);
        document.getElementById('loading').style.visibility = "hidden"; 
    });
  });
}

const showDataKlasemen = (data) => {
  console.log(data)
  document.querySelector('#title-liga').textContent = data.competition.name;
  document.querySelector('#season').textContent = `Season: ${data.season.startDate} - ${data.season.endDate}`;
  let thNo = '';
  data.standings[0].table.forEach(tim => {
    document.querySelector('#data-liga').innerHTML +=  
      `<tr>
          <td> ${tim.position} </td>
          <td class="name-ico"><img src="${tim.team.crestUrl}" width="60" height="60"\> <a href=#detailteam?id=${tim.team.id}>${tim.team.name}</a></td>
          <td> ${tim.playedGames} </td>
          <td> ${tim.won} </td>
          <td> ${tim.draw} </td>
          <td> ${tim.lost} </td>
          <td> ${tim.goalsFor} </td>
          <td> ${tim.goalsAgainst} </td>
          <td> ${tim.goalDifference} </td>
          <td> ${tim.points} </td>
          <td> <a href=#jadwalpertandingan?id=${tim.team.id}>Lihat Jadwal Pertandingan</a></td>

        </tr>
      `;
  });
}

const showJadwalPertandingan = (data) => {
    data.matches.forEach(tim => {
    document.querySelector('#data-jadwal-pertandingan').innerHTML += `
        <div class="col s12 m6 l4">
        <div class="card ${colorMix[Math.round(Math.random() * 14)]}">
          <div class="card-content white-text">
            <span class="card-title">${tim.competition.name === "Primera Division" ? "La Liga" : tim.competition.name }</span>
            <h4>${tim.homeTeam.name}</h4><h5>VS</h5><h4>${tim.awayTeam.name}</h4>
          </div>
          <div class="card-action">
            <span>${Date(tim.utcDate)}</span>
          </div>
        </div>
      </div>
    `;
  });
}

const setTableKlasemenLigaChampion = (data) => {
  let groupTD = '';

  data.table.forEach((dataGroup) => {
    groupTD += `
      <tr>
        <td>${dataGroup.position}<td>
        <td class="name-ico"><img src="${dataGroup.team.crestUrl}" width="60" height="60"\> <a href=#detailteam?id=${dataGroup.team.id}>${dataGroup.team.name}</a></td>
        <td>${dataGroup.playedGames}<td>
        <td>${dataGroup.won}<td>
        <td>${dataGroup.draw}<td>
        <td>${dataGroup.lost}<td>
        <td>${dataGroup.goalsFor}<td>
        <td>${dataGroup.goalsAgainst}<td>
        <td>${dataGroup.goalDifference}<td>
        <td>${dataGroup.points}<td>
        <td><a href=#jadwalpertandingan?id=${dataGroup.team.id}>Lihat Jadwal Pertandingan</a></td>
      </tr>
    `;
  })

  let groupATable = `
    <center><h3>${data.group}</h3></center>
    <table class="responsive-table bordered tabel-liga-champions">
      <thead>
        <tr>
          <th>Position</th>  
          <th>Name</th>
          <th>Match Play</th>
          <th>Menang</th>
          <th>Imbang</th>
          <th>Kalah</th>
          <th>Goal For</th>
          <th>Goal Againts</th>
          <th>Goal Difference</th>
          <th>Poin</th>
          <th>Jadwal Pertandingan</th>
        </tr>
      </thead>

      <tbody class="data-liga-group">
        ${groupTD}
      </tbody>
    </table>
  `;
  document.querySelector('#data-info').innerHTML += groupATable;
}

const showDataKlasemenLigaChampion = (data) => {
    document.querySelector('#data-info').innerHTML = '<p></p>';
    document.querySelector('#title-liga').textContent = data.competition.name;
    document.querySelector('#season').textContent = `Season: ${data.season.startDate} / ${data.season.endDate}`;
    let h4 = document.createElement('h4').textContent = data.competition.lastUpdated;

    let groupA = data.standings.filter(team => team.group === 'GROUP_A');
    let groupB = data.standings.filter(team => team.group === 'GROUP_B');
    let groupC = data.standings.filter(team => team.group === 'GROUP_C');
    let groupD = data.standings.filter(team => team.group === 'GROUP_D');
    let groupE = data.standings.filter(team => team.group === 'GROUP_E');
    let groupF = data.standings.filter(team => team.group === 'GROUP_F');
    let groupG = data.standings.filter(team => team.group === 'GROUP_G');
    let groupH = data.standings.filter(team => team.group === 'GROUP_H');

    setTableKlasemenLigaChampion(groupA[0]);
    setTableKlasemenLigaChampion(groupB[0]);
    setTableKlasemenLigaChampion(groupC[0]);
    setTableKlasemenLigaChampion(groupD[0]);
    setTableKlasemenLigaChampion(groupE[0]);
    setTableKlasemenLigaChampion(groupF[0]);
    setTableKlasemenLigaChampion(groupG[0]);
    setTableKlasemenLigaChampion(groupH[0]);
}

const showDataDetailTeam = (data) => {
  document.querySelector("#icon").innerHTML = `<img src="${data.crestUrl}" height="320" width="230"></img>`
  document.querySelector("#nameTeam").innerHTML = `<h4><i class="material-icons">sports_soccer</i> ${data.name}</h4>`;
  document.querySelector("#shortname").innerHTML = `<h6><i class="material-icons">group_work</i> ${data.shortName}</h6>`;
  document.querySelector("#addressteam").innerHTML = `<h6><i class="material-icons">home</i> ${data.address}</h6>`;
  document.querySelector("#country").innerHTML = `<h6><i class="material-icons">flag</i> ${data.area.name}</h6>`;
  document.querySelector("#phonenumber").innerHTML = `<h6><i class="material-icons">perm_phone_msg</i> ${data.phone}</h6>`;
  document.querySelector("#website").innerHTML = `<h6><i class="material-icons">language</i> ${data.website}</h6>`;
  document.querySelector("#emailaddress").innerHTML = `<h6><i class="material-icons">email</i> ${data.email}</h6>`;
  document.querySelector("#stadium").innerHTML = `<h6><i class="material-icons">domain</i> ${data.venue}</h6>`;
  document.querySelector("#lastupdate").innerHTML = `<h6><i class="material-icons">update</i> ${data.lastUpdated}</h6>`;

  // clear squad list
  document.getElementById('squad-left').innerHTML = '';
  document.getElementById('squad-right').innerHTML = '';
  let sumSquad = data.squad.length;

  // Dibagi Dalam 2 List Yang Sejajar Secara Horizontal (Flex)
  for(i = 0; i<Math.floor(sumSquad/2); i++) {
    document.getElementById('squad-left').innerHTML += `<li>${data.squad[i].name} (${data.squad[i].position})</li>`;
  }
  for(i=(Math.floor(sumSquad/2)+1); i<sumSquad; i++) {
    document.getElementById('squad-right').innerHTML += `<li>${data.squad[i].name} (${data.squad[i].position})</li>`;
  }
}
 
function getSavedFavoritTeams() {
  getAll().then(function(favoriteTeams) {
    if(favoriteTeams.length > 0) {
      // Sudah Ada Favorit Team
      // Menyusun komponen card artikel secara dinamis
      let detailTeamHTML = "";
      favoriteTeams.forEach(function(team) {
        detailTeamHTML += `
            <div class="col s12 m6 l4">
              <div class="card">
                <div class="card-image">
                  <img src="${team.crestUrl}" alt="">
                  <a href="#detailteam?id=${team.id}&saved=true" class="halfway-fab btn-floating pink pulse">
                    <i class="material-icons">visibility</i>
                  </a>
                </div>
                <div class="card-content">
                  <span class="card-title">${team.name}</span>
                  <p>Lihat Selengkapnya Tim Favorit ${team.name}</p>
                  <p>${team.address}</p>
                </div>
                <div class="card-action">
                  <button class="btn-floating waves-effect waves-light red"><i class="material-icons" onClick=deleteFavoriteTeam(event) data-id=${team.id} data-name="${team.name}" data-ico="${team.crestUrl}" >delete</i></button>
                </div>
              </div>  
            </div>
          `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("data").innerHTML = detailTeamHTML;
    } else {
      // Belum Ada Favorit Team
      document.getElementById("data").innerHTML = '<center><h3>Kamu Belum Memiliki Team Favorit</h3></center>';
    }
  });
}

function getSavedFavoritTeamId() {
  let idParam = window.location.hash.slice(15,window.location.hash.indexOf('&'));
  getById(idParam).then(function(data) {
    document.getElementById('loading').style.visibility = "hidden"; 
    document.querySelector("#icon").innerHTML = `<img src="${data.crestUrl}" height="320" width="230"></img>`
    document.querySelector("#nameTeam").innerHTML = `<h4><i class="material-icons">sports_soccer</i> ${data.name}</h4>`;
    document.querySelector("#shortname").innerHTML = `<h6><i class="material-icons">group_work</i> ${data.shortName}</h6>`;
    document.querySelector("#addressteam").innerHTML = `<h6><i class="material-icons">home</i> ${data.address}</h6>`;
    document.querySelector("#country").innerHTML = `<h6><i class="material-icons">flag</i> ${data.area.name}</h6>`;
    document.querySelector("#phonenumber").innerHTML = `<h6><i class="material-icons">perm_phone_msg</i> ${data.phone}</h6>`;
    document.querySelector("#website").innerHTML = `<h6><i class="material-icons">language</i> ${data.website}</h6>`;
    document.querySelector("#emailaddress").innerHTML = `<h6><i class="material-icons">email</i> ${data.email}</h6>`;
    document.querySelector("#stadium").innerHTML = `<h6><i class="material-icons">domain</i> ${data.venue}</h6>`;
    document.querySelector("#lastupdate").innerHTML = `<h6><i class="material-icons">update</i> ${data.lastUpdated}</h6>`;

    // clear squad list
    document.getElementById('squad-left').innerHTML = '';
    document.getElementById('squad-right').innerHTML = '';
    let sumSquad = data.squad.length;

    // Dibagi Dalam 2 List Yang Sejajar Secara Horizontal (Flex)
    for(i = 0; i<Math.floor(sumSquad/2); i++) {
      document.getElementById('squad-left').innerHTML += `<li>${data.squad[i].name} (${data.squad[i].position})</li>`;
    }
    for(i=(Math.floor(sumSquad/2)+1); i<sumSquad; i++) {
      document.getElementById('squad-right').innerHTML += `<li>${data.squad[i].name} (${data.squad[i].position})</li>`;
    }
  });
}

// Hapus Favorit Team Dalam IndexDB
function deleteFavoriteTeam(event) {
  event.preventDefault();
  let idTeam = event.target.getAttribute('data-id');
  let nameTeam = event.target.getAttribute('data-name');
  let iconTeam = event.target.getAttribute('data-ico');
  
  deleteById(idTeam).then(function(data) {
    console.log(data)
    const title = 'Menghapus Team Favorit';
    const options = {
      'body': `Berhasil Menghapus TEAM ${nameTeam} Kedalam Daftar Team Favorit`,
      'image': `${iconTeam}`
    };
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, options);
      });
    } else {
      console.error('Fitur notifikasi tidak diijinkan.');
    }
    window.location = "/";
  })
  .catch(err => {
    console.log('Gagal Delete', err);
  }); 
}

const showHome = () => {
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

  xhttp.open("GET", "pages/home.html", true);  
  xhttp.send();

}