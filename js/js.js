//création du plateau vide et aléaatoire pour savoir quel joueur commence et initialisations des pseudos
let j=Math.floor(Math.random()*2)+1;
let plateau=new Array(3);
let pseudo='';
let pseudo2='';
let coups=0;
let typeDeJeu='';
let choixJoueur1='';
let choixJoueur2='';


let x=0;
let y=0;

//création du plateau vide
for(let i=0;i<plateau.length;i++){
    plateau[i]=[0,0,0];
 }
 
 /**
 * Remplace les variables créer précédemment par les réponses mentionnés dans le formulaires html
 * @param{form} formulaire Le formulaire créer dans le code html  
 */
function player(formulaire){
    pseudo=document.getElementById("pseudo").value;
    pseudo2=document.getElementById("pseudo2").value;
    for (let i of document.getElementsByName("choix")){
        if (i.checked==true){
            console.log(i);
            if (i.value=="croix"){
                choixJoueur1="<img src='image/croix.png' alt='croix' class='figure'>";
            }
            if (i.value=="singe"){
                choixJoueur1="<img src='image/singe.png' alt='singe' class='figure'>";
            }
        }
    }   
    if (j==1){
        document.getElementById("resultat").innerHTML="<p>"+pseudo+" à toi de jouer</p>";
    }
    else{
        document.getElementById("resultat").innerHTML="<p>"+pseudo2+" à toi de jouer</p>";
    }    
    document.getElementById("form").style.display="none";
    document.getElementById("plateau").style.display="block"; 
    
    return false;    
}

 /**
 * Observe le plateau et retourne un chiffre entre [0;3] si il y a un gagant ou que le plateau est rempli
 * @return{number} 1,2 Si il y a un gagant. 3 Si il y a une égalité
 */
function gagner(){
    if (plateau[0][0]==1  && plateau[0][1]==1 && plateau[0][2]==1 || plateau[1][0]==1  && plateau[1][1]==1 && plateau[1][2]==1 || plateau[2][0]==1  && plateau[2][1]==1 && plateau[2][2]==1 || plateau[0][0]==1  && plateau[1][0]==1 && plateau[2][0]==1 || plateau[0][1]==1  && plateau[1][1]==1 && plateau[2][1]==1 || plateau[0][2]==1  && plateau[1][2]==1 && plateau[2][2]==1 || plateau[0][0]==1  && plateau[1][1]==1 && plateau[2][2]==1 || plateau[0][2]==1  && plateau[1][1]==1 && plateau[2][0]==1){
        document.getElementById("resultat").innerHTML="<p>"+pseudo+" a gagné</p>";
        return 1;
    }
    else if (plateau[0][0]==2  && plateau[0][1]==2 && plateau[0][2]==2 || plateau[1][0]==2  && plateau[1][1]==2 && plateau[1][2]==2 || plateau[2][0]==2  && plateau[2][1]==2 && plateau[2][2]==2 || plateau[0][0]==2  && plateau[1][0]==2 && plateau[2][0]==2 || plateau[0][1]==2  && plateau[1][1]==2 && plateau[2][1]==2 || plateau[0][2]==2  && plateau[1][2]==2 && plateau[2][2]==2 || plateau[0][0]==2  && plateau[1][1]==2 && plateau[2][2]==2 || plateau[0][2]==2  && plateau[1][1]==2 && plateau[2][0]==2){
        document.getElementById("resultat").innerHTML="<p>"+pseudo2+" a gagné</p>";
        return 2;
    }
    else if (coups>=9){
        document.getElementById("resultat").innerHTML="<p>Il s'agit là d'une égalité </p>";
        return 0;
    }
}

/**
 * Choix d'une case du pateau, change la valeur du de la case sélectionner ainsi que la dynamique de la page.
 * @param{number,number} x Pour l'abscisse du tableau Y pour l'ordonnée
 * @return{number} 1,2 Si il y a un gagant. 3 Si il y a une égalité
 */
function jouer(x,y){
    if (gagner()!=1 && gagner()!=2 && gagner()!=0){
        if (j==1 && plateau[x][y]==0){
            plateau[x][y]=1;
            document.getElementById("x"+x+"y"+y).innerHTML=choixJoueur1;
            j=2;
            coups++;
            if (typeDeJeu=='f' && gagner()!=1 && gagner()!=2 && gagner()!=0){
                facile();
            }
            else if (typeDeJeu=='m' && (gagner()!=1 || gagner()!=2 || gagner()!=0)){
                moyen();
            }
        }    
        else if (typeDeJeu=='2' && plateau[x][y]==0){
            plateau[x][y]=2;
            document.getElementById("x"+x+"y"+y).innerHTML="<img src='image/cercle.png' alt='cercle' class='figure'>";
            j=1;
            coups++;
        }
        if (j==1){
            document.getElementById("resultat").innerHTML="<p>"+pseudo+" à toi de jouer</p>";
    
        }
        else{
            document.getElementById("resultat").innerHTML="<p>"+pseudo2+" à toi de jouer</p>";
    
        }
        //envoie le message au gagnant et propose un boutton pour recommencer
        gagner();
        if (gagner()==1 || gagner()==2 || gagner()==0){
            document.getElementById("recommencer").style.display="block";
        } 
    }
}

//ia moyenne
function moyen(){
    while (j!=1){
        x=Math.floor(Math.random()*3);
        y=Math.floor(Math.random()*3);
        if (plateau[x][y]==0){
            plateau[x][y]=2;
            document.getElementById("x"+x+"y"+y).innerHTML="<img src='image/cercle.png' alt='cercle' class='figure'>";
            j=1;
            coups++;
        } 
    }
} 

//ia facile
function facile(){
    while (j!=1){
        x=Math.floor(Math.random()*3);
        y=Math.floor(Math.random()*3);
        if (plateau[x][y]==0){
            plateau[x][y]=2;
            document.getElementById("x"+x+"y"+y).innerHTML="<img src='image/cercle.png' alt='cercle' class='figure'>";
            j=1;
            coups++;
        } 
    }
}



//Cette function va faire apparaitre le formulaire et gare en memoire la difficulté
function dis(a){
    coups=0;
    let element=document.getElementsByClassName("dis");
    for (i=0;i<element.length;i++){
        element[i].style.display="none";
    }    
    if (a=='facile'){
        typeDeJeu='f';
        document.getElementById("pseudo2").value="IA Facile";
    }
    if (a=='moyen'){
        typeDeJeu='m';
        document.getElementById("pseudo2").value="IA Moyenne";
    }
    if (a=='2joueurs'){
        typeDeJeu='2';
    }

    document.getElementById("form").style.display="block";

    if (j==2 && typeDeJeu=='f'){
        facile();
    }
    else if (j==2 && typeDeJeu=='m'){
        moyen();
    }

}



// cette fonction remet le joueur au menu principal et vide le tableau (html comme js)
function recommencer(){
    let vide=document.getElementsByClassName("case");
    for (i=0;i<vide.length;i++){
        vide[i].innerText="";
    }
    for(let i=0;i<plateau.length;i++){
        plateau[i]=[0,0,0];
     }
    let element=document.getElementsByClassName("dis");
    for (let j=0;j<element.length;j++){
        element[j].style.display="none";
    }

    document.getElementById("button").style.display="block";
}
