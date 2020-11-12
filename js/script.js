document.addEventListener('DOMContentLoaded', function(){
  // Load page content
  let page = window.location.hash.substr(1);

  if (page === "") page = "home";
  loadPage(page);
	
  function loadPage(page, liga='') {
  	let xhttp = new XMLHttpRequest();
 	xhttp.onreadystatechange = function() {
  	  if (this.readyState == 4){
		let content = document.querySelector("#body-content");
  		if(this.status == 200) {
		  content.innerHTML = xhttp.responseText;
		} else if(this.status == 404) {
		  content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
  		} else {
		  content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
		}
	   }
	};
	xhttp.open("GET", `pages/${page}.html`, true);
	xhttp.send();
  }
});
