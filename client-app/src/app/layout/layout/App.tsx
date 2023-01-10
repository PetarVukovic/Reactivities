import React, {  useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid}from 'uuid';
import agent from '../../api/agent';
import LoadingComponents from './LoadingComponents';


function App() {
  //varijabla naseg stata i ono sto ce je setat
  const [activities,setActivities]=useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined);//nas activity moze biti activitiy ili undefined a inicijalno stanje mu je undef
  const[editMode,setEditMode]=useState(false);
  const [loading,setLoading]=useState(true);
  const[submitting,setSubmmiting]=useState(false);
  useEffect(()=>{
    agent.Activities.list()
    .then(response=>{
      let activities:Activity[]=[];
      response.forEach(activity=>{
        activity.date=activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
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
  setSubmmiting(true);
  if(activity.id){
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(x=>x.id !==activity.id),activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmmiting(false);

    })
  }else{
    activity.id=uuid();
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities,activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmmiting(false);
    })

  }
  
 
}

function handleDeleteActivity(id:string)
{
  setSubmmiting(true);
  agent.Activities.delete(id).then(()=>{
    setActivities([...activities.filter(x=>x.id!==id)]);
    setSubmmiting(false);

  })

  setActivities([...activities.filter(x=>x.id!==id)])
}
if(loading) return <LoadingComponents content='Loading app'/>
 
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
        submitting={submitting}
        />
        </Container>
 
    </>
  );
}

export default App;
