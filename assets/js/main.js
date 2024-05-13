let profile = document.querySelector('.header .profile');

document.querySelector('#user-btn').onclick = () => {
    profile.classList.toggle('active');
    search.classList.remove('active');
}

let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () => {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');

}

if (darkMode === 'enabled') {
    enableDarkMode();
}

toggleBtn.onclick = (e) => {
    darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'disabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

let data = {
    etudiants: [],
    promotion: [],
    referentiel: ["dev", "ref dig", "data", "hackeuse", "aws"]
};

const form = document.querySelector('#my-form');
const studentimage = document.getElementById('studentImg');
const image = document.getElementById('imageApp');
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const email = document.getElementById("email");
const sexe = document.getElementById("sexe");
const telephone = document.getElementById("telephone");
const dateNaissance = document.getElementById("dateNaissance");
const lieu_naissance = document.getElementById("lieu_naissance");
const cni = document.getElementById("cni");
const referentiel = document.getElementById("referentiels");

const promo = document.getElementById("promos");
//creation de la base de donnees

let currentPage = 1;
const itemsPerPage = 5;
/*============ Soumission du formilaire pour créer aprrenant ===============*/
form.addEventListener("submit", function (e) {
    e.preventDefault();

    validatechamp(image, document.querySelector('.error-image'));
    validatechamp(nom, document.querySelector('.error-nom'));
    validatechamp(prenom, document.querySelector('.error-prenom'));

    validatechamp(dateNaissance, document.querySelector('.error-date-naissance'));
    validatechamp(lieu_naissance, document.querySelector('.error-l-naissance'));
    validatemail(email, document.querySelector('.error-email'));
    validateCNI(cni, document.querySelector('.error-cni'));
    validateTelephone(telephone, document.querySelector('.error-tel'));

    let nouvelApprenant = {
        nom: nom.value.trim(),
        prenom: prenom.value.trim(),
        email: email.value.trim(),
        telephone: telephone.value.trim(),
        birth: dateNaissance.value.trim(),
        cni: cni.value.trim(),
        promo: promo.value.trim(),
        lieu_naissance: lieu_naissance.value.trim(),
        referentiel: referentiel.value.trim(),
        sexe: sexe.value.trim(),
        image: image.value.trim(),
        id: parseInt(data.etudiants.length)
    };

    if (validerApprenant(nouvelApprenant)) {


        data.etudiants.push(nouvelApprenant);
        afficherApprenants(data.etudiants);
        afficherPageEtudiants(currentPage);
        mettreAJourPagination();
    }

});


//charger l'image de l'apprenant
image.addEventListener('input', function () {
    if (image.value.trim() != "") {
        studentimage.src = image.value;
    }
});
//validation des champs
function validatechamp(input, error_msg) {
    if (input.value.trim() === "") {
        error_msg.textContent = "champ vide! veuilllez le remplir"
    }
    else {
        error_msg.textContent = "";
    }
}
//fonction pour valider l'email
function validatemail(email, error_msg) {
    if (email.value.trim() === "") {
        error_msg.textContent = "le champ est requis"
    }
    else if (!validerMail(email.value.trim())) {
        error_msg.textContent = "veuillez saisir un email valide";
    } else {
        error_msg.textContent = "";
    }
}
//fonction pour valider la CNI
function validateCNI(cni, error_msg) {
    if (cni.value.trim() === "") {
        error_msg.textContent = "le champ est requis"
    }
    else if (!validerNumeroCNI(cni.value.trim())) {
        error_msg.textContent = "veuillez saisir un cni valide";
    } else {
        error_msg.textContent = "";
    }
}

function validateTelephone(tel, error_msg) {
    if (tel.value.trim() === "") {
        error_msg.textContent = "le champ est requis"
    }
    else if (!validerNumeroTelephoneSenegal(tel.value.trim())) {
        error_msg.textContent = "veuillez saisir un numero valide";
    } else {
        error_msg.textContent = "";
    }
}

//  regex pour validation email
function validerMail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

//regex pou valider la cni
const regexCNI = /^\d{13}$/;

function validerNumeroCNI(numeroCNI) {
    return regexCNI.test(numeroCNI);
}

//regex pour valider le numéro de téléphone
const regexTelephoneSenegal = /^\+221\d{9}$/;

function validerNumeroTelephoneSenegal(numero) {
    return regexTelephoneSenegal.test(numero);
}


// Fonction pour afficher les apprenants dans le tableau HTML
tbody = document.querySelector('.line5 tbody');
let rows = [];
let cells = [];
function afficherApprenants(data) {

    let tbodys = document.querySelector('.line5 tbody');
    tbodys.innerHTML = '';


    data.forEach(function (apprenant, index) {
        // Créer une nouvelle ligne pour chaque apprenant
        let tr = document.createElement('tr');
        tr.classList.add('line');
            tr.id=apprenant.id;
      

        tr.innerHTML = `
            <td class="bloc" >
                <div class="col-bas" >
                    <img src="${apprenant.image}" width="30px" />
                </div>
            </td>
            <td class="bloc" >
                <div class="col-bas" style="color: rgb(29, 109, 29)" data-column="nom" ondblclick="editer(event)">${apprenant.nom}</div>
            </td>
            <td class="bloc">
                <div class="col-bas" style="color: rgb(29, 109, 29)" ondblclick="editer(event)" data-column="prenom">${apprenant.prenom}</div>
            </td>
            <td class="bloc">
                <div class="col-bas" ondblclick="editer(event)" data-column="email">${apprenant.email}</div>
            </td>
            <td class="bloc">
                <div class="col-bas" ondblclick="editer(event)" data-column="sexe">${apprenant.sexe}</div>
            </td>
            <td class="bloc">
                <div class="col-bas" ondblclick="editer(event)" data-column="telephone">${apprenant.telephone}</div>
            </td>
            <td class="bloc">
                <div class="col-bas" ondblclick="editer(event)" >${apprenant.referentiel}</div>
            </td>
            <td class="bloc">
                <div class="col-haut"></div>
                <input type="checkbox" id="${apprenant.id}"  onchange="transferer(event)"/>
                
                <button class="btn-hover color-5" onclick="changer()" >edit line </button>
                <button value="${apprenant.id}"  onclick="genererQrCode(event)" >Qr Code</button>
            </td>
        `;

        // Ajouter la ligne à la table
        tbodys.appendChild(tr);

    });
}

//validation globale
function validerApprenant(nouvelApprenant) {
    if (nouvelApprenant.nom == "" ||
        nouvelApprenant.prenom == "" ||
        !validerNumeroCNI(cni.value.trim()) ||
        !validerNumeroTelephoneSenegal(telephone.value.trim()) ||
        !validerMail(email.value.trim()) ||
        nouvelApprenant.telephone === "" ||
        nouvelApprenant.cni == "" ||
        nouvelApprenant.dateNaissance == "" ||
        nouvelApprenant.lieu_naissance == "" ||
        nouvelApprenant.email == ""
    ) {
        return false
    }
    else {
        return true
    }
}

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
        tr.id = etudiant.id;

        // Ajoute les informations de l'étudiant à la ligne
        tr.innerHTML = `
           <td class="bloc">
               <div class="col-bas">
                   <img src="${etudiant.image}" width="30px" />
               </div>
           </td> 
           <td class="bloc">
               <div class="col-bas"  data-column="nom" ondblclick="editer(${etudiant.id},event)" style="color: rgb(29, 109, 29)">
                   ${etudiant.nom}
               </div>
           </td>
           <td class="bloc">
               <div class="col-bas" data-column="prenom"  style="color: rgb(29, 109, 29)" ondblclick="editer(${etudiant.id},event)">
                   ${etudiant.prenom}
               </div>
           </td>
           <td class="bloc">
               <div class="col-bas email" data-column="email" ondblclick="editer(${etudiant.id},event)">${etudiant.email}</div>
           </td>
           <td class="bloc">
               <div class="col-bas" data-column="sexe" ondblclick="editer(${etudiant.id},event)">${etudiant.sexe}</div>
           </td>
           <td class="bloc">
               <div class="col-bas" data-column="telephone" ondblclick="editer(${etudiant.id},event)">${etudiant.telephone}</div>
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

//===================filtrer par nom ou prenom=====================

filterName = document.getElementById("filterName");

filterName.addEventListener("input", function () {
    let searchValue = filterName.value.toLowerCase();
    let tabFilter = [];
    if (searchValue == "") {
        afficherApprenants(data.etudiants); 
     /*    afficherPageEtudiants(currentPage); */

    } else {
        data.etudiants.forEach(function (etudiant) {
            let match = false;
            if (searchValue.length >= 3) {
                if (etudiant.nom.toLowerCase().includes(searchValue) || etudiant.prenom.toLowerCase().includes(searchValue)) {
                    match = true;
                }

            }
            if (match) {
                tabFilter.push(etudiant);
            }
        });

         afficherApprenants(tabFilter); 
       /*  afficherPageEtudiants(currentPage); */
    }

});


//fonction pour éditer par dblclick
function editer(id,event) {

     target = event.target; 
    if (target.tagName == "DIV") {

        target.contentEditable = true;
        valeur = target.textContent.trim();
        target.focus();

        target.addEventListener("blur", function () {

            let nouvelleValeur = target.textContent.trim();
            if (nouvelleValeur !== valeur) {

                /*      const columnIndex = target.getAttribute('data-index');  */
                /* const columnIndex = target.id */
                /*     const columnIndex = target.parentElement.parentElement.id; */
            const rowIndex = target.parentElement.parentElement.rowIndex ;
            console.log(rowIndex)
            const column=target.dataset.column;

                console.log(rowIndex,column);

                if (column =="nom") {
                    data.etudiants[id].nom = nouvelleValeur;
                   
                }else  if (column =="prenom") {
                    data.etudiants[id].prenom = nouvelleValeur;
                   
                }else if(column =="email"){
                    data.etudiants[id].email = nouvelleValeur;
                    
                }else if(column =="sexe"){
                    data.etudiants[id].sexe = nouvelleValeur;
                    
                }else if(column =="telephone"){
                    data.etudiants[id].email = nouvelleValeur;
                   
                }

                afficherPageEtudiants(currentPage)
               
            }
            else {
                 target.innerHTML = valeur; 
            }
        })
    }

}

/*============== fonction pour modifier la ligne ===============*/

let popup=document.querySelector('.modifier')

function  changer(event){
  window.location.href='#popup'
    target=event.target;

    let user = data.etudiants.find(user => user.id == target.value);

    image.value = user.image;
    nom.value = user.nom;
    prenom.value = user.prenom;
    email.value = user.email;
    telephone.value = user.telephone;
    dateNaissance.value = user.dateNaissance;
    cni.value = user.cni;
    promo.value = user.promo;
    lieu_naissance.value = user.lieu_naissance;
    referentiel.value = user.referentiel;
    sexe.value = user.sexe;

    let editline=document.getElementById('editline');

editline.addEventListener('click',function(){

  data.etudiants.forEach((app)=>{
    if(user.id == app.id){
        app.nom=nom.value;
        app.image = image.value;
        app.prenom= prenom.value;
        app.sexe= sexe.value;
        app.dateNaissance= dateNaissance.value;
        app.lieu_naissance= lieu_naissance.value;
        app.promo= promo.value;
        app.telephone= telephone.value;
        app.referentiel= referentiel.value;
        app.cni= cni.value;

       
        afficherPageEtudiants(currentPage);
    }
  })
})
}

/* =====================>PROMOTION<======================= */

const app=document.querySelector('#app')
firstTab=document.querySelector(".firstTab");
//au click sur apprenant 
app.addEventListener("click",function(){
    firstTab.style.display="block";
    promotion.style.display="none";
    nouveauBoutton.textContent='+Nouveau';
})

const promotion=document.querySelector('#promotion');
promotion.style.display="none";

 P6=document.querySelector('#P6');
 let nouveauBoutton=document.getElementById('nouveau');
 //au click sur promo
P6.addEventListener("click",function(){

firstTab.style.display="none";
promotion.style.display="block";
nouveauBoutton.textContent="Nouvelle";

})

let modifier=document.querySelector('.modifier');
let popupPromo=document.querySelector('.popupPromo');

//au click sur le button nouveau /nouvelle
nouveauBoutton.addEventListener('click',function(){

    if(nouveauBoutton.textContent == "Nouvelle"){
        form.style.display="none"  ;
        popupPromo.style.display="block";
    }

     if(nouveauBoutton.textContent == "+Nouveau"){
        popupPromo.style.display="none"  ;
        form.style.display="block"  ;
    } 

})


/*=================== recupération du formulaire pour ajouter promo ================*/
let prom=document.getElementById("my-promo");
let date_debut= document.getElementById('date_debut');
let date_fin= document.getElementById('date_fin');
let libelle= document.getElementById('libelle');
let buttonAddPromo=document.getElementById("buttonAddPromo");


/* =================Controle de saisie ajout promo */

let error_date_debut= document.querySelector('.error-date-debut');
let error_date_fin= document.querySelector('.error-date-fin');
let error_libelle= document.querySelector('.error-libelle');

function validatechampPromo(input, error_msg) {
    if (input.value.trim() === "") {
        error_msg.textContent = "champ vide! veuilllez le remplir"
    }
    else {
        error_msg.textContent = "";
    }
}
function validerPromo(nouvelApprenant) {
    if (nouvelApprenant.libelle == "" ||
        nouvelApprenant.date_debut == "" ||
       
        nouvelApprenant.date_fin == ""
        
    ) {
        return false
    }
    else {
        return true
    }
}

 buttonAddPromo.addEventListener('click',function(e){
    e.preventDefault();

    validatechampPromo(date_debut,error_date_debut);
    validatechampPromo(date_fin,error_date_fin);
    validatechampPromo(libelle,error_libelle);

    let nouvellepromo = {
        libelle: libelle.value.trim(),
        date_debut: date_debut.value,
        date_fin: date_fin.value,
        id: parseInt(data.promotion.length + 1),
        etat:"DESACTIVÉE"

    };
    if(validerPromo(nouvellepromo)){

        if(data.promotion.length == 0){
            nouvellepromo.etat= "ACTIVÉE";
        }
        data.promotion.push(nouvellepromo);
        afficherPromotion(data.promotion,currentPage);
        mettreAJourPaginationPromo();
    }

}) 

function afficherPromotion(data,page) {

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const promoPage = Object.values(data).slice(startIndex, endIndex);


    let tabPromo = document.querySelector('.tabProm tbody');
        tabPromo.innerHTML = '';


        promoPage.forEach(function (promo,index) {
      
        let tr = document.createElement('tr');
        tr.classList.add('line');
            tr.id=promo.id;
    
        tr.innerHTML = `
            
            <td class="bloc" >
                <div class="col-bas" style="color: rgb(29, 109, 29)" data-column="nom" ondblclick="editer(event)">${promo.libelle}</div>
            </td>
            <td class="bloc">
                <div class="col-bas" style="color: rgb(29, 109, 29)" ondblclick="editer(event)" data-column="prenom">${promo.date_debut}</div>
            </td>
            <td class="bloc">
                <div class="col-bas" ondblclick="editer(event)" data-column="email">${promo.date_fin}</div>
            </td>
           
            <td class="bloc">
                <div class="col-haut"></div>
                <button class="btn-hover color-5 new"  onclick="activerPromo(event)" value="${promo.id}"> ${promo.etat}</button>
            </td> 
        `;

        // Ajouter la ligne à la table
        tabPromo.appendChild(tr);
    });
}

// Fonction pour mettre à jour les liens de pagination
function mettreAJourPaginationPromo() {
    const totalEtudiants = Object.keys(data.promotion).length;
    const totalPages = Math.ceil(totalEtudiants / itemsPerPage);

    const paginationDiv = document.querySelector('.paginationpromo');
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
            afficherPromotion(data.promotion,currentPage);
            mettreAJourPaginationPromo();
        });

        paginationDiv.appendChild(pageLink);
    }
}
/* ====================Activation desactivation promo================== */
function activerPromo(event){
    
    target=event.target;
    let id=target.value;

    data.promotion.forEach((promo)=>{
    if(promo.id==id){
        promo.etat="ACTIVÉE"
        target.style.color= "red"
    }else{
        promo.etat="DÉSACTIVÉE";
    }
})
afficherPromotion(data.promotion)
}

/* ===============Qr code de l'apprenant===================== */
const closeQr=document.querySelector('.closeQr');
const qrCode = document.querySelector('.qrCode');
const  code = document.querySelector('.code');
const imgCode= document.querySelector('.imgCode')
const nomQr=document.querySelector('.nomQr');
qrCode.style.display="none";

//fermer QrCode=============
closeQr.addEventListener('click',function(){

    qrCode.style.display="none";

})

function afficherQRCode(image,telephone,nom,prenom) {

    imgCode.innerHTML= `  <img src="${image}" width="70px" height="50px" />`;
    nomQr.textContent= nom+prenom;
    const img = document.createElement('img');
    img.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + telephone;
    code.innerHTML=`  <img src="${img.src}" width="100px" />`;

}

function genererQrCode(event){

    target=event.target;
    qrCode.style.display="block";

    let user1 = data.etudiants.find(user => user.id == target.value);

    afficherQRCode(user1.image,user1.telephone,user1.nom,user1.prenom);

}

/* ====================>TRANSFERT<===================== */

let referentielTransfert = document.getElementById('referencielaTransferer');

function transferer(event) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
        const etudiant = data.etudiants[checkbox.id];
           
        for (let i = 0; i < referentielTransfert.options.length; i++) {
            if (referentielTransfert.options[i].value == etudiant.referentiel) {
                referentielTransfert.options[i].disabled = true;
            }
        }
    });
}

referentielTransfert.addEventListener("change",function(){
    const referentielSelectionnee=referentielTransfert.value;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox =>{

        const etudiant=data.etudiants[checkbox.id];

        etudiant.referentiel=referentielSelectionnee;
       
    });
    afficherPageEtudiants(currentPage);

    for (let i = 0; i < referentielTransfert.options.length; i++) { 
            referentielTransfert.options[i].disabled = false;
        
    }
   
})

/*================>Trie par ordre croissant ou décroissant<=============*/

let sortNom = document.getElementById("sortNom");
let sortPrenom = document.getElementById("sortPrenom");
let sortEmail = document.getElementById("sortEmail");
let sortTelephone = document.getElementById("sortTelephone");
let sortGenre = document.getElementById("sortGenre");
let sortReferentiel = document.getElementById("sortReferentiel");
/*=================ordre croissant============================================*/
function trieCroissant(caractere,data){
    data.sort((a, b) => a[caractere].localeCompare(b[caractere]));
  
    afficherPageEtudiants(currentPage);
  
  };
sortNom.addEventListener('click',function(){
    trieCroissant("nom",data.etudiants);
});
sortPrenom.addEventListener('click',function(){

    trieCroissant("prenom",data.etudiants);
});

 sortEmail.addEventListener('click',function(){

     trieCroissant("email",data.etudiants);
 });
sortTelephone.addEventListener('click',function(){

    trieCroissant("telephone",data.etudiants);
});
sortGenre.addEventListener('click',function(){

    trieCroissant("sexe",data.etudiants);
});
sortReferentiel.addEventListener('click',function(){

    trieCroissant("referentiel",data.etudiants); 
});

/* ===ordre decroissante===== */
  function trieDecroissant(caractere,data){
    data.sort((a, b) => b[caractere].localeCompare(a[caractere]));
  
    afficherPageEtudiants(currentPage);
  
  };

  sortNom.addEventListener('dblclick',function(){
    trieDecroissant("nom",data.etudiants);
});
sortPrenom.addEventListener('dblclick',function(){

    trieDecroissant("prenom",data.etudiants);
});

 sortEmail.addEventListener('dblclick',function(){

     trieDecroissant("email",data.etudiants);
 });
sortTelephone.addEventListener('dblclick',function(){

    trieDecroissant("telephone",data.etudiants);
});
sortGenre.addEventListener('dblclick',function(){

    trieDecroissant("sexe",data.etudiants);
});
sortReferentiel.addEventListener('dblclick',function(){

    trieDecroissant("referentiel",data.etudiants); 
});

