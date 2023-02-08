function reset(){
    document.getElementById("zipInput").value = "";
    document.getElementById("communeSelect").style.display = "none";
    document.getElementById("result").innerHTML = "";
}

function searchCommune() {

// Récupération du code postal
  let zip = document.getElementById("zipInput").value;
  // Création de la requète http
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.zippopotam.us/fr/" + zip, true);
  
  // Gestion de la réponse de L'api
  xhr.onreadystatechange = function() {
    // si la réponse est prête et que le code de retour est 200 (OK)
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // conversion de la réponse en objet js
      let data = JSON.parse(xhr.responseText);
      let places = data.places;
      
      // si il n'y a qu'une commune
      if (places.length === 1) {
        // affichage de la commune
        let result = "Commune trouvée : " + places[0]["place name"];
        document.getElementById("result").innerHTML = result;
        // si il y a plusieurs communes
      } else {
        // affichage de la liste déroulante
        let select = document.getElementById("communeSelect");
        select.style.display = "block";
        select.innerHTML = "";

        // ajout des communes dans la liste déroulante
        for (let i = 0; i < places.length; i++) {
          let option = document.createElement("option");
          option.value = places[i]["place name"];
          option.text = places[i]["place name"];
          select.appendChild(option);
        }
      }
    }
    else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
        // affichage de l'erreur
        let result = "Aucune commune trouvée pour le code postal " + zip;
        document.getElementById("result").innerHTML = result;
    }
  };

  // envoi de la requète
  xhr.send();

  // gestion du changement de commune dans la liste déroulante
    document.getElementById("communeSelect").addEventListener("change", function() {
    let result = "Commune choisie : " + this.value;
    document.getElementById("result").innerHTML = result;
  });
}

