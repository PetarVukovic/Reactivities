import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid}from 'uuid';


function App() {
  //varijabla naseg stata i ono sto ce je setat
  const [activities,setActivities]=useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined);//nas activity moze biti activitiy ili undefined a inicijalno stanje mu je undef
  const[editMode,setEditMode]=useState(false);
  //sto zelimo uciniti kad se nasa apliakcija loada a zelimo dobiti data from our API
  //Nakon sto se effecdft izvrsi postavit ce data u activities i ponavljat ce se infinite puta zato je trebamo ogranicit
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/Activities')
    .then(response=>{
      setActivities(response.data);
    })
  },[])

function handleSelectActivity(id:string){
  setSelectedActivity(activities.find(x=>x.id===id))//x predstavlja aktiviti objekt koji c drzati id
}
function handleCancelSelectActivity(){
  setSelectedActivity(undefined);
}
function handleFormOpen(id?:string){
  id ? handleSelectActivity(id):handleCancelSelectActivity();
  setEditMode(true);
}
function handleFormClose(){
  setEditMode(false);
}

function handleCreateOrEditActivity(activity:Activity){
  //provjeravamo imamo li aktiviti ako da filtriramo array sa novim prosljedenim parametrom activitiy
  activity.id? setActivities([...activities.filter(x=>x.id !==activity.id),activity])
  :setActivities([...activities,{...activity,id:uuid()}]);
  setEditMode(false);
  setSelectedActivity(activity);
}

function handleDeleteActivity(id:string)
{
  setActivities([...activities.filter(x=>x.id!==id)])
}
 
  return (

    < >
      <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop:'7em'}}>
        <ActivityDashboard activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        />
        </Container>
 
    </>
  );
}

export default App;
