 //fonctions dont on a besoin
// Fonction pour afficher les étudiants sur la page spécifiée
function afficherPageEtudiants(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const etudiantsPage = Object.values(etudiants).slice(startIndex, endIndex);

    // Efface le contenu de la table avant d'ajouter de nouveaux étudiants
    tbody.innerHTML = '';

    etudiantsPage.forEach(etudiant => {
        const tr = document.createElement('tr');
        tr.classList.add('line');

        // Ajoute les informations de l'étudiant à la ligne
        tr.innerHTML = `
            <td class="bloc">
                <div class="col-bas">
                    <img src="${etudiant.image}" width="30px" />
                </div>
            </td>
            <td class="bloc">
                <div class="col-bas" id="firstname" style="color: rgb(29, 109, 29)">
                    ${etudiant.nom}
                </div>
            </td>
            <td class="bloc">
                <div class="col-bas" id="lastname" style="color: rgb(29, 109, 29)">
                    ${etudiant.prenom}
                </div>
            </td>
            <td class="bloc">
                <div class="col-bas email">${etudiant.email}</div>
            </td>
            <td class="bloc">
                <div class="col-bas">${etudiant.sexe}</div>
            </td>
            <td class="bloc">
                <div class="col-bas">${etudiant.telephone}</div>
            </td>
            <td class="bloc">
                <div class="col-bas">${etudiant.referentiel}</div>
            </td>
            <td class="bloc">
                <div class="col-haut"></div>
                <input type="checkbox" id="my-checkbox-" />
                <label for="my-checkbox-"></label>
            </td>
        `;

        // Ajoute la ligne à la table
        tbody.appendChild(tr);
    });
}

// Fonction pour mettre à jour les liens de pagination
function mettreAJourPagination() {
    const totalEtudiants = Object.keys(etudiants).length;
    const totalPages = Math.ceil(totalEtudiants / itemsPerPage);

    const paginationDiv = document.querySelector('.pagination');
    paginationDiv.innerHTML = '';

    // Crée un lien pour chaque page
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.classList.add('page-link');
        pageLink.textContent = i;

        // Si la page est la page actuelle, ajoute la classe 'active' au lien
        if (i === currentPage) {
            pageLink.classList.add('active');
        }

        // Ajoute un gestionnaire d'événements pour charger la page correspondante lorsqu'un lien est cliqué
        pageLink.addEventListener('click', () => {
            currentPage = i;
            afficherPageEtudiants(currentPage);
            mettreAJourPagination();
        });

        paginationDiv.appendChild(pageLink);
    }
}
// Afficher les étudiants sur la première page et mettre à jour la pagination
        afficherPageEtudiants(currentPage);
        mettreAJourPagination();











        //pagination
          // Fonction de pagination
function paginerApprenants(apprenants, pageActuelle, apprenantsParPage) {
    const debutIndex = (pageActuelle - 1) * apprenantsParPage;
    const finIndex = debutIndex + apprenantsParPage;
    return apprenants.slice(debutIndex, finIndex);
 }
 
 // Fonction pour afficher les apprenants paginés
 function afficherApprenantsPagination(data, pageActuelle, apprenantsParPage) {
    const apprenantsFiltres = tabFilter.length > 0 ? tabFilter : data.etudiants;
    const apprenantsPage = paginerApprenants(apprenantsFiltres, pageActuelle, apprenantsParPage);
    afficherApprenants(apprenantsPage);
 }
 
 // Variables pour la pagination
 const apprenantsParPage = 3; // Nombre d'apprenants par page
 let pageActuelle = 1; // Page actuelle
 
 // Fonction pour changer de page
 function changerPage(direction) {
    if (direction === 'prev' && pageActuelle > 1) {
        pageActuelle--;
    } else if (direction === 'next' && pageActuelle < totalPages()) {
        pageActuelle++;
    }
    afficherApprenantsPagination(data, pageActuelle, apprenantsParPage);
 }
 
 // Calculer le nombre total de pages
 function totalPages() {
    const apprenantsFiltres = tabFilter.length > 0 ? tabFilter : data.etudiants;
    return Math.ceil(apprenantsFiltres.length / apprenantsParPage);
 }
 
 // Afficher les boutons de pagination
 function afficherBoutonsPagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages(); i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.classList.add('page-link');
        if (i === pageActuelle) {
            pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', function() {
            pageActuelle = i;
            afficherApprenantsPagination(data, pageActuelle, apprenantsParPage);
        });
        paginationContainer.appendChild(pageLink);
    }
 }
 
 // Appeler la fonction d'affichage initial
 afficherApprenantsPagination(data, pageActuelle, apprenantsParPage);
 afficherBoutonsPagination();










 // //fonctions dont on a besoin
// Fonction pour afficher les étudiants sur la page spécifiée
function afficherPageEtudiants(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const etudiantsPage = Object.values(data.etudiants).slice(startIndex, endIndex);
 
    // Efface le contenu de la table avant d'ajouter de nouveaux étudiants
    tbody.innerHTML = '';
 
    etudiantsPage.forEach(etudiant => {
        const tr = document.createElement('tr');
        tr.classList.add('line');
 
        // Ajoute les informations de l'étudiant à la ligne
        tr.innerHTML = `
            <td class="bloc">
                <div class="col-bas">
                    <img src="${etudiant.image}" width="30px" />
                </div>
            </td>
            <td class="bloc">
                <div class="col-bas" id="firstname" style="color: rgb(29, 109, 29)">
                    ${etudiant.nom}
                </div>
            </td>
            <td class="bloc">
                <div class="col-bas" id="lastname" style="color: rgb(29, 109, 29)">
                    ${etudiant.prenom}
                </div>
            </td>
            <td class="bloc">
                <div class="col-bas email">${etudiant.email}</div>
            </td>
            <td class="bloc">
                <div class="col-bas">${etudiant.sexe}</div>
            </td>
            <td class="bloc">
                <div class="col-bas">${etudiant.telephone}</div>
            </td>
            <td class="bloc">
                <div class="col-bas">${etudiant.referentiel}</div>
            </td>
            <td class="bloc">
                <div class="col-haut"></div>
                <input type="checkbox" style="display=block" id="my-checkbox-" />
                <label for="my-checkbox-"></label>
                <button>Qr Code</button>
            </td>
        `;
 
        // Ajoute la ligne à la table
        tbody.appendChild(tr);
    });
 }
 
 // Fonction pour mettre à jour les liens de pagination
 function mettreAJourPagination() {
    const totalEtudiants = Object.keys(data.etudiants).length;
    const totalPages = Math.ceil(totalEtudiants / itemsPerPage);
 
    const paginationDiv = document.querySelector('.pagination');
    paginationDiv.innerHTML = '';
 
    // Crée un lien pour chaque page
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.classList.add('page-link');
        pageLink.textContent = i;
 
        // Si la page est la page actuelle, ajoute la classe 'active' au lien
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
 
        // Ajoute un gestionnaire d'événements pour charger la page correspondante lorsqu'un lien est cliqué
        pageLink.addEventListener('click', () => {
            currentPage = i;
            afficherPageEtudiants(currentPage);
            mettreAJourPagination();
        });
 
        paginationDiv.appendChild(pageLink);
    }
 }

 
 // pagination diol
  let pageActuel = 0;
  let nbItems = 2;
  function paginate(page, data) {
     let lenght = parseInt(data.length / nbItems);
     if (data.length % nbItems == 0) lenght--;
     if (page == 1) {
        if (pageActuel !== 0) {
           pageActuel--;
        }
     } else if (page == 2) {
        if (pageActuel < lenght) {
           pageActuel++;
        }
     }
     const start = pageActuel * nbItems;
     const end = start + nbItems;
     
     afficherApprenants(data.etudiants.slice(start, end));
  }

  let back=document.getElementById('back');
  let next=document.getElementById('next');
  back.addEventListener('click',function(){
   paginate(1,data.etudiants);
  })
  next.addEventListener('click',function(){
   paginate(2,data.etudiants);
  })



  //modifier par double click
  let tdall=document.querySelectorAll(' .line5 tbody td');
  console.log(tdall)
  // Afficher les étudiants sur la première page et mettre à jour la pagination
  tdall.forEach((td)=>{
  td.addEventListener('dblclick',function(event){
     target=event.target;
     if(target.tagName=== "DIV"){

        target.contentEditable=true;
       
       
           let val=target.value;
           console.log(val)
        
     }
     
  })
  }) 
  tdall.forEach((td)=>{
     td.addEventListener('keypress',function(event){
        target=event.target;
        if(event.key=='Enter'){

            if(target.tagName=== "DIV"){
      
               target.contentEditable=false;
              
              
                  console.log('sidy')
               
            }
        }
        
     })
     }) 


     function hey(event) {

        target = event.target;
        if (target.tagName == "DIV") {
    
            target.contentEditable = true;
            valeur = target.textContent.trim();
    
            target.focus();
    
            target.addEventListener("blur", function () {
    
                let nouvelleValeur = target.textContent.trim();
                if (nouvelleValeur !== valeur) {
    
                    const rowIndex = target.parentElement.parentElement.rowIndex - 1;
    
                   /*  const columnIndex = Array.from(target.parentElement.children).indexOf(target) */;
                    const columnIndex = target.parentElement.parentElement.id;
                    console.log(columnIndex);
    
                    if (columnIndex === 0) {
                        data.etudiants[rowIndex].nom = nouvelleValeur;
                    }
                    afficherApprenants(data.etudiants);
                }
                else {
                    target.innerHTML = valeur;
                }
            })
        }
    
    }

    /** Modifier apprenant dans DB */
function editApprenante(id, apprenant) {
    dataBase.users.forEach((user, index) => {
       if (user.id == id) {
          console.log(true);
          dataBase.users[index] = Object.assign(user, apprenant);
       }
    });
    console.log(dataBase.users);
  }
 
 function ajouterDoubleClick() {
    const modifier=document.querySelectorAll('.col-bas');
    modifier.forEach(etudiant => {
       let firstValue = etudiant.textContent;
       let parentEl = etudiant.parentElement.parentElement;
       const Userid=etudiant.parentElement.parentElement.dataset.id;
       const propriete=etudiant.dataset.propriete;
       etudiant.addEventListener("dblclick",() => {
          etudiant.contentEditable = true;
          etudiant.classList.add("toedit-border");
          //afficherChampinput(etudiant,Userid,propriete);
       });
       etudiant.addEventListener("keydown",(e) => {
          if(e.key==='Enter'){
             etudiant.contentEditable = false;
             etudiant.classList.remove("toedit-border");
             let userId = parentEl.dataset.id;
             let columnEdit = etudiant.textContent;
             let toedit = etudiant.dataset.propriete;
 
             if (columnEdit != firstValue) {
                let editApprenant = {};
                if(toedit == "nom"){
                   editApprenant.nom = columnEdit;
                }else if(toedit == "prenom"){
                   editApprenant.prenom = columnEdit;
                }else if(toedit == "email"){
                   editApprenant.email = columnEdit;
                }else if(toedit == "telephone"){
                   editApprenant.telephone = columnEdit;
                }else if(toedit == "sexe"){
                   editApprenant.sexe = columnEdit;
                }
                editApprenante(userId, editApprenant);
             }
          }
       });
    });
    
 }

 

// Fonction pour trier les apprenants par colonne
function trierApprenantsParColonne(colonne) {
    // Trier les apprenants par la colonne spécifiée
    data.etudiants.sort((a, b) => {
        // Comparer les valeurs des colonnes pour le tri
        if (a[colonne] < b[colonne]) return -1;
        if (a[colonne] > b[colonne]) return 1;
        return 0;
    });

    // Réafficher les apprenants triés dans le tableau
    afficherApprenants(data.etudiants);
}

console.log(document.querySelectorAll('.col-bas'))
// Gestion des clics sur les en-têtes de colonne pour le tri
document.querySelectorAll('.col-bas').forEach(colonne => {
    colonne.addEventListener('click', () => {
        // Récupérer le nom de la colonne à partir de l'attribut data-column
        const colonneNom = colonne.dataset.column;
        // Trier les apprenants en fonction de la colonne cliquée
        trierApprenantsParColonne(colonneNom);
    });
});

//fermer popup edit-line
/* function  cacherpopup(){
    popup.style.display="none";
} */




const qrCode =  {
    text: contenuQRCode,
    width: 150,
    height: 150,
};

// Affiche la photo de l'apprenant à côté du QR code
qrCodecontent.innerHTML += `<img src="${photoURL}" width="100" height="100" alt="Photo de l'apprenant">`;
new QRCode(qrCodecontent,qrCode)




function afficherPageEtudiants(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const etudiantsPage = Object.values(data.etudiants).slice(startIndex, endIndex);

    // Efface le contenu de la table avant d'ajouter de nouveaux étudiants
    tbody.innerHTML = '';

    etudiantsPage.forEach(etudiant => {
        const tr = document.createElement('tr');
        tr.classList.add('line');
        tr.id = etudiant.id;

        // Ajoute les informations de l'étudiant à la ligne
        tr.innerHTML = `
           <td class="bloc">
               <div class="col-bas">
                   <img src="${etudiant.image}" width="30px" />
               </div>
           </td> 
           <td class="bloc">
               <div class="col-bas"  data-column="nom" ondblclick="editer(event)" style="color: rgb(29, 109, 29)">
                   ${etudiant.nom}
               </div>
           </td>
           <td class="bloc">
               <div class="col-bas" data-column="prenom"  style="color: rgb(29, 109, 29)" ondblclick="editer(event)">
                   ${etudiant.prenom}
               </div>
           </td>
           <td class="bloc">
               <div class="col-bas email" data-column="email" ondblclick="editer(event)">${etudiant.email}</div>
           </td>
           <td class="bloc">
               <div class="col-bas" data-column="sexe" ondblclick="editer(event)">${etudiant.sexe}</div>
           </td>
           <td class="bloc">
               <div class="col-bas" data-column="telephone" ondblclick="editer(event)">${etudiant.telephone}</div>
           </td>
           <td class="bloc">
               <div class="col-bas">${etudiant.referentiel}</div>
           </td>
           <td class="bloc">
               <div class="col-haut"></div>
               <input type="checkbox"  id="${etudiant.id}" onchange="transferer(event)"/>
              
               <button class="btn-hover color-5" value="${etudiant.id}"   onclick="changer(event)" >edit line </button>
               <button value="${etudiant.id}" onclick="genererQrCode(event)">Qr Code</button>
           </td>
       `;

        // Ajoute la ligne à la table
        tbody.appendChild(tr);
    });
}

//fonction pour trier le tableau dans l'ordre coissant décroissant en cliquant sur les entetes

let trie = document.getElementById("trieNom");

const trieCroissant = () => {
  BASEDEDONNEE.apprenant.sort((a, b) => a.nom.localeCompare(b.nom));

  const affiche = document.getElementById("affichapp");
  affiche.textContent = "";
  BASEDEDONNEE.apprenant.forEach((apprenant) => {
    affiche.innerHTML += AfficheApprenant(apprenant);
  });
};

const trieDecroissant = () => {
  BASEDEDONNEE.apprenant.sort((a, b) => b.nom.localeCompare(a.nom));

  const affiche = document.getElementById("affichapp");
  affiche.textContent = "";
  BASEDEDONNEE.apprenant.forEach((apprenant) => {
    affiche.innerHTML += AfficheApprenant(apprenant);
  });
};
trie.addEventListener("click", (e) => {
  if (e.target.classList.contains("croissant")) {
    trieDecroissant();
    e.target.classList.add("decroissant");
    e.target.classList.remove("croissant");
  } else {
    trieCroissant();
    e.target.classList.add("croissant");
    e.target.classList.remove("decroissant");
  }
});