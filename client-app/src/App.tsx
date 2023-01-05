import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';


function App() {
  //varijabla naseg stata i ono sto ce je setat
  const [activities,setActivities]=useState([]);
 
  //sto zelimo uciniti kad se nasa apliakcija loada a zelimo dobiti data from our API
  //Nakon sto se effecdft izvrsi postavit ce data u activities i ponavljat ce se infinite puta zato je trebamo ogranicit
  useEffect(()=>{
    axios.get('http://loacalhost:5000/api/activities')
    .then(response=>{
      //ako nismo sigurni sto dolazi od API dodajm oswmao konzol log
      console.log(response)
      setActivities(response.data);
    })
  },[])//[] only once
  //U mainu treba ispisat activities preko js koda 
  return (
    //prosljedujem oheaduer neke propertiese
    <div >
      <Header as='h2' icon='users' content='Reactivities'/>
       
         <List>
          {activities.map((activity:any)=>(
             <List.Item key={activity.id}>
              {activity.title}
              </List.Item>
           
          ))}
          </List>
          
       
       
 
    </div>
  );
}

export default App;
