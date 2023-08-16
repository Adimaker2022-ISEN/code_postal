function reset(){
    document.getElementById("zipInput").value = "";
    document.getElementById("communeSelect").style.display = "none";
    document.getElementById("result").innerHTML = "";
}

function searchCommune() {

// Référence au champ de saisie du code postal
let zipInput = document.getElementById("zipInput");
    
// Référence à la liste ul
let communeList = document.getElementById("communeList");

// Référence à l'élément pour afficher le résultat
let result = document.getElementById("result");

// Ajout de l'événement oninput sur le champ de saisie
zipInput.addEventListener("input", function() {
  // Récupération du code postal saisi
  let zip = zipInput.value;
  
  // Création de la requête HTTP
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.zippopotam.us/fr/" + zip, true);
  
  // Gestion de la réponse de l'API
  xhr.onreadystatechange = function() {
    // Si la réponse est prête et que le statut est OK
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Conversion des données de réponse en objet JavaScript
      let data = JSON.parse(xhr.responseText);
      let places = data.places;
      
      // Effacement des options précédentes
      while (communeList.firstChild) {
        communeList.removeChild(communeList.firstChild);
      }
      
      // Ajout d'une option pour chaque commune
      for (let i = 0; i < places.length; i++) {
        let li = document.createElement("li");
        li.textContent = places[i]["place name"];
        li.addEventListener("click", function() {
          result.textContent = "Vous avez sélectionné " + li.textContent;
        });
        communeList.appendChild(li);
      }
    }
  };
  
  // Envoi de la requête
  xhr.send();
});
}

