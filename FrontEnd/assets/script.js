IsConnected();
ModalSuppressPhoto();
async function JSONrecup(isConnected) {
   try {
      const response = await fetch('http://localhost:5678/api/works');
      const data = await response.json();
      if (isConnected){
         PopulateWorks(data);
         userLevel();
      }
      else{
         Filters(data);
         PopulateWorks(data);
      }

   }
   catch (error) {
      console.error('Erreur :', error);
   }

}

function Filters(data) {

   const filterParent = document.querySelector('#portfolio'); //parent
   const gallery = document.querySelector('.gallery'); //conteneur

   const filterContainer = document.createElement('div'); //div des elements
   filterContainer.classList.add('filter-container'); //pour le style

   const filterTous = document.createElement('button'); //bouton TOUS
   filterTous.classList.add("filter");
   filterTous.innerText = "Tous";

   const filterObjects = document.createElement('button'); //bouton OBJETS
   filterObjects.classList.add("filter");
   filterObjects.innerText = "Objets";

   const filterAppartements = document.createElement('button'); //Bouton APPARTEMENTS
   filterAppartements.classList.add("filter");
   filterAppartements.innerText = "Appartements";

   const filterHR = document.createElement('button'); //bouton Hôtels et restaurants
   filterHR.classList.add("filter");
   filterHR.innerText = "Hôtels & Restaurants";

   filterTous.addEventListener("click", function (){
      PopulateWorks(data);
      UpdateButtonColor(filterTous);
   });
   filterObjects.addEventListener("click", function (){
      PopulateWorks(data, 1);
      UpdateButtonColor(filterObjects);
   });
   filterAppartements.addEventListener("click", function (){
      PopulateWorks(data, 2);
      UpdateButtonColor(filterAppartements);
   });
   filterHR.addEventListener("click", function (){
      PopulateWorks(data, 3);
      UpdateButtonColor(filterHR);
   });

   filterParent.appendChild(filterContainer); //affectations et répartition des filtres
   filterParent.appendChild(gallery);

   filterContainer.appendChild(filterTous);
   filterContainer.appendChild(filterObjects);
   filterContainer.appendChild(filterAppartements);
   filterContainer.appendChild(filterHR);

}

function PopulateWorks(data, filter) {
   const container = document.querySelector('.gallery');
   container.innerHTML = "";

   let datafiltered = data;

   if(filter != undefined){
      datafiltered = data.filter(data => data.categoryId === filter);
   }
   
   datafiltered.forEach((item) => {

      const figure = document.createElement('figure');

      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.title;

      const figcaption = document.createElement('figcaption');
      figcaption.textContent = item.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);

      figure.dataset.workid = item.id;

      container.appendChild(figure);
   });
}

function UpdateButtonColor(clickedButton){
   const filterButton = document.querySelectorAll('.filter');
   filterButton.forEach((button) => {
      button.classList.remove('active');
   });
   clickedButton.classList.add('active');
}

function Modify(){
   //TODO créer une pop up contenant : de quoi la quitter, titre Galerie photo, l'extraction de toutes les images des works sans les noms
   //TODO ,un séparateur et un bouton Ajouter une photo
   //TODO sur chaque photo une icone qui renvoie sur delete le work associé
}

function AddPicture(){
   //TODO créer une pop up pour l'upload de l'image, Nom et Catégorie
}

function CreateWork(){

}
function DeleteWork(){

}
function IsConnected(){
   try{
      const token = localStorage.getItem("Soblutoken");

      if(token){
         JSONrecup(true);
      }
      else{
         JSONrecup(false);
      }
   }
   catch(error){
      console.log(error);
   }
   

}
function userLevel(){
   const login = document.getElementById("login"); //change login en logout et son comportement
   login.innerText = "logout";
   login.addEventListener("click",()=>{
      localStorage.removeItem("Soblutoken");
      login.setAttribute("href", "#");
      window.location.reload();
   });

   const modDiv = document.createElement('div'); //conteneur de l'icone et du lien

   const modIcon = document.createElement("span"); //l'icone de modification
   modIcon.classList.add("material-symbols-rounded");
   modIcon.innerText = "edit_square";

   const modLink = document.createElement('a'); //lien cliquable pour la modale
   modLink.innerText = "modifier";
   modDiv.addEventListener('click', () => {
      ModalSuppressPhoto();
   });

   modDiv.appendChild(modIcon); //placement des éléments à côté de Mes projets
   modDiv.appendChild(modLink);
   const h2 = document.querySelector('#portfolio h2');
   h2.insertAdjacentElement('afterend', modDiv);
}

function ModalSuppressPhoto(){
   const modal = document.createElement('div');
   modal.classList.add('modale');
   modal.role = "dialog";
   modal.ariaModal = true;
   modal.ariaLabel = "Titre";

   const closeButton = document.createElement("button");
   closeButton.addEventListener("click", () => {
      modal.remove();
   });

   modal.appendChild(closeButton);

}
// TODO bosser la gestion du dataset
// html
// <figure data-workid="1"></figure> //dataset

// const response : [{id : 1,image:idfijsd }] //exemple

// response.forEach() //pour le travailler

// const ee = e.target.parentNode: //recup le parent de l'élément courant comme le bouton
// ee.remove(); //pour supprimer le parent par exemple

//TODO récup du token en session ou localstorage et le vérifier
//TODO afficher le bouton de modif des travaux, virer les filtres
//TODO bouton modif : ouverture de la modale 1 supression de la liste des items
//TODO si connecté : dataset des travaux pour leur affichage et suppression simultanés du backboard et de la modale
//TODO si non connecté : actuel donc if token true > nouvelle fonct et if token false : >JSONrecup par exemple
//TODO creer la modale 2 pour l'enregistrement de l'image et le stockage de son lien + nom + catégorie
//TODO gérer la partie CSS 
//droit d'ajouter du CSS mais vaut mieux le garder en bas pour montrer ce qui change
//attention session = disparait quand on ferme l'onglet, local présent en dur sur le disque