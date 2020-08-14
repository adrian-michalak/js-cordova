 firebase.firestore().collection('Zumba').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {  
            const setList = document.querySelector('#card-id');
            let li = document.createElement('ons-list');
            let title = document.createElement('ons-list-header');
            let coach = document.createElement('ons-list-item');
            let hour = document.createElement('ons-list-item');
            let dayOfTrain = document.createElement('ons-list-header');
 
            li.setAttribute('data-id',doc.id);
            
            
            coach.textContent = doc.data().coach;
            hour.textContent = doc.data().hour;
            dayOfTrain.textContent = doc.data().dayOfTraining;
            li.appendChild(title);
            li.appendChild(dayOfTrain);
            li.appendChild(coach);
            li.appendChild(hour);
            console.log(title);
            setList.append(li);  
           //renderEventList(doc);
      })    
  })

  firebase.firestore().collection('fitness').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {  
            const setList = document.querySelector('#card-id');
            let li = document.createElement('ons-list');
           let title = document.createElement('ons-list-header');
            let coach = document.createElement('ons-list-item');
            let hour = document.createElement('ons-list-item');
            let dayOfTrain = document.createElement('ons-list-header');
 
            li.setAttribute('data-id',doc.id);
            
            
            coach.textContent = doc.data().coach;
            hour.textContent = doc.data().hour;
            dayOfTrain.textContent = doc.data().dayOfTraining;
             li.appendChild(title);
            li.appendChild(dayOfTrain);
            li.appendChild(coach);
            li.appendChild(hour);
            console.log(title);
            setList.append(li);  
           //renderEventList(doc);
      })    
  })