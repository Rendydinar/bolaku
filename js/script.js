document.addEventListener('DOMContentLoaded', function(){
  	// Materialize Config
	const materialbox = document.querySelectorAll('.materialboxed');
	M.Materialbox.init(materialbox);
	// handle parallax
	const parallax = document.querySelectorAll('.parallax');
	M.Parallax.init(parallax);

});

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
registerServiceWorker();
} else {
console.log("ServiceWorker belum didukung browser ini.");
}

// Periksa fitur Notification API
if('Notification' in window) {
requestPermission();
} else {
console.error('browser tidak mendukung notifikasi');
}

// Register service worker
function registerServiceWorker() {
window.addEventListener("load", function() {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function() {
      console.log("Pendaftaran ServiceWorker berhasil");
    })
    .catch(function() {
      console.log("Pendaftaran ServiceWorker gagal");
    });
});
}

function requestPermission() {
Notification.requestPermission().then(function (result) {
  if (result === "denied") {
    console.log("Fitur notifikasi tidak diijinkan.");
    return;
  } else if (result === "default") {
    console.error("Pengguna menutup kotak dialog permintaan ijin.");
    return;
  }

  if ('PushManager' in window) {
    navigator.serviceWorker.getRegistration().then(function(registration) {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BLBAB_Xl4_YJOFgDrqV63LFPiBRs30Ek-DShh2DSGh5DBvIK6M1WL4b8hlRvh32am5KCZEcca2hpOkqi5l4YLa8")
      }).then(function(subscribe) {
        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
      }).catch(function(e) {
        console.error('Tidak dapat melakukan subscribe ', e.message);
      });
    });
  }
});

}

function urlBase64ToUint8Array(base64String) {
const padding = '='.repeat((4 - base64String.length % 4) % 4);
const base64 = (base64String + padding)
  .replace(/-/g, '+')
  .replace(/_/g, '/');
const rawData = window.atob(base64);
const outputArray = new Uint8Array(rawData.length);
for (let i = 0; i < rawData.length; ++i) {
  outputArray[i] = rawData.charCodeAt(i);
}
return outputArray;
}

// Notifikasi Ketika Berhasil Menyimpan Team Favorit
function showNotifikasiGambar(item) {
  const title = 'Menambahkan Team Favorit';
  const options = {
    'body': `Berhasil Menambahkan TEAM ${item.name} Kedalam Daftar Team Favorit`,
    'image': `${item.crestUrl}`
  };
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error('Fitur notifikasi tidak diijinkan.');
  }
}
