 //===================================== PUSH - PAGE - FUNCTIONS ========================================================================
function nextPage(){
  document.addEventListener('init', function(event) {
    var page = event.target;
    if (page.id === 'homePage') {
      
      page.querySelector('#push-button-bmi').onclick = function() {
        document.querySelector('#myNavigator').pushPage('bmi.html', {data: {title: ''}});
      };
    } else if (page.id === 'bmi') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
    if (page.id === 'homePage') {
        page.querySelector('#push-button-gallery').onclick = function() {
          document.querySelector('#myNavigator').pushPage('gallery.html', {data: {title: ''}});
        };
      } else if (page.id === 'gallery') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
      }
      if (page.id === 'homePage') {
        page.querySelector('#push-button-events').onclick = function() {
          document.querySelector('#myNavigator').pushPage('events.html', {data: {title: ''}});
          
        };
      } else if (page.id === 'events') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
       
      }
      if (page.id === 'homePage') {
        page.querySelector('#push-button-price').onclick = function() {
          document.querySelector('#myNavigator').pushPage('price.html', {data: {title: ''}});
        };
      } else if (page.id === 'price') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
      }
  });
}

//==========================Your web app's Firebase configuration===================================================================================
function initFirebase(){
  var firebaseConfig = {
    apiKey: "AIzaSyAq28eeGQ7z7JxtQW4K1Ku3YhdjfEPkcfE",
    authDomain: "mygymappstore.firebaseapp.com",
    databaseURL: "https://mygymappstore.firebaseio.com",
    projectId: "mygymappstore",
    storageBucket: "gs://mygymappstore.appspot.com/",
    messagingSenderId: "1068575262467",
    appId: "1:1068575262467:web:4b30412e6c49c839"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}
 //============================= BMI ================================================================================
var calc = function(){
  var weight =  document.getElementById('weight').value;
  var growth = document.getElementById('growth').value/100;
 if (weight.value || growth.value ==="" ){
   alert("Your input is empty.</br> Please enter value")
 }
 else if (isNaN(weight)  || isNaN(growth)){
  alert("Your input is not a number.</br> Please enter correct value")
 }
  var calc =   (weight/(growth*growth));
  document.getElementById('textarea-result').value = calc.toPrecision('3');
 
}
 //===============================================================================================================================
  //===================================== CLOUD FUNCTIONS ========================================================================
 function loadDataFromDatabase(collection){
  firebase.firestore().collection(collection).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {  
    const card__content = document.querySelector('#container');
    let main_div = document.createElement('div'); 

    let day = document.createElement('p');
    let title = document.createElement('p');
    let coach = document.createElement('h1');
    let hour = document.createElement('p');
    //===============STYLE==========================
    main_div.setAttribute("style", "background-color: rgb(255, 255, 255, 0.5); min-height: 300px;max-width: 300px;border: 5px solid #ffffff ;display: flex;flex-direction: column;align-items: center;justify-content: center;text-align: center;padding: 0 15%;position: relative; margin-bottom:15px;");
    title.setAttribute('style',"font-size: 35px;font-weight: bold; color:teal;");
    coach.setAttribute('style'," font-size: 20px; font-family: 'Fira Code, sans-serif', padding:3px; font-weight: bold;" );
    day.setAttribute('style',"font-size: 15px; font-family: 'Fira Code, sans-serif';font-weight: bold;");
    hour.setAttribute('style',"font-size: 15px; font-family: 'Fira Code, sans-serif';font-weight: bold;");
    title.style.fontFamily='Impact, Charcoal, sans-serif';

      main_div.setAttribute('data-id', doc.id);
      title.textContent = doc.data().title;
      coach.textContent = doc.data().coach;
      hour.textContent = doc.data().hour;
      day.textContent = doc.data().day;

     main_div.appendChild(title);
     main_div.appendChild(coach);
     main_div.appendChild(day);
     main_div.appendChild(hour);
      card__content.appendChild(main_div);
    })    
  })
 }
 //==============================================================================================================================
function getPrice(){

  firebase.firestore().collection('price').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
     const container = document.querySelector('#container');
     let box = document.createElement('div');
     let box_title = document.createElement('h2')
     let box_description = document.createElement('p');
     let box_price = document.createElement('p');
     let box_button = document.createElement('button');

      box.setAttribute("style", "background-color: rgb(255, 255, 255, 0.5);min-height: 300px;max-width: 300px;border: 5px solid #ffffff ;display: flex;flex-direction: column;align-items: center;justify-content: center;text-align: center;padding: 0 15%;position: relative; margin-bottom:15px;");
      box_title.setAttribute('style',"font-size: 45px;font-weight: bold;color:teal;");
      box_description.setAttribute('style'," font-size: 16px; font-family: 'Lucida Console, Monaco, monospace', padding:3px; font-style:italic;font-weight: bold;" );
      box_price.setAttribute('style',"font-size: 45px; font-weight: bold;");
      box_button.setAttribute('style', "font-weight: bold; background-color: #171717; border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;");
      box_button.innerHTML="choose";
      box_description.style.fontFamily='Verdana, Geneva, sans-serif';
      box_title.style.fontFamily='Impact, Charcoal, sans-serif';
      box_price.style.fontFamily="'Fira Code', sans-serif";

      box_title.textContent = doc.data().title;
      box_description.textContent = doc.data().desc;
      box_price.textContent = doc.data().price + "  pln";
      
      box.appendChild(box_title);
      box.appendChild(box_description);
      box.appendChild(box_price);
      box.appendChild(box_button);
      container.appendChild(box);
      
    })
  })
}
//==============================================================================================================
 //================================= STORAGE FUNCTIONS =========================================================

 function fetchStorage(){
    const div = document.querySelector('#img-conteiner');
    for (i=1 ; i<=7 ; i++){
      firebase.storage().ref('gymImages/'+i+'.jpg').getDownloadURL().then(function(url){
        var img = document.createElement('img');
        img.src = url;
        img.style.width="100%";
        img.style.height="100%";
        div.appendChild(img);
    });
  }
}

//=============================================================================================================
 document.addEventListener('init', function(event){
   var page = event.target;
   if(page.id === 'events'){
    loadDataFromDatabase('fitness');
   }
   if(page.id === 'gallery'){
    fetchStorage();
   }
   if(page.id === 'price'){
    getPrice()
  }
 })

//================================== Checks that Firebase has been imported.===========================================================================
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

 //================================================INITIALIZE===========================================================================================
 initFirebase();
 nextPage();
 checkSetup();
 

//=============================================================================================================




