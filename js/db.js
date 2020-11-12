let dbPromised = idb.open("bolaku", 1, function(upgradeDb) {
  let articlesObjectStore = upgradeDb.createObjectStore("detailTeam", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(detailTeam) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("detailTeam", "readwrite");
      let store = tx.objectStore("detailTeam");
      store.add(detailTeam);
      return tx.complete;
    })
    .then(function() {
      console.log("Detail Team berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("detailTeam", "readonly");
        let store = tx.objectStore("detailTeam");
        return store.getAll();
      })
      .then(function(detailTeam) {
        resolve(detailTeam);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("detailTeam", "readonly");
        let store = tx.objectStore("detailTeam");
        return store.get(Number(id));
      })
      .then(function(detailTeam) {
        resolve(detailTeam);
      });
  });
}
 
function deleteById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("detailTeam", "readwrite");
        let store = tx.objectStore("detailTeam");
        store.delete(Number(id));
        return tx.complete;
      })
      .then(function(res) {
        console.log('Item deleted');
        resolve('Berhasil Deleted');
      });
  });
}