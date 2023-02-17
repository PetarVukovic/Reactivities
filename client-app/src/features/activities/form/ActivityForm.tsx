
import { observer } from "mobx-react-lite";
import React, {  useEffect, useState } from "react";
import { Link, useNavigate, useParams, } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/layout/LoadingComponents";
import { Activity } from "../../../app/layout/models/activity";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from'uuid';
import { Formik,Form, ErrorMessage } from "formik";
import *as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "./MyTextArea";
import MySelectInput from "./MySelectInput";
import { CategoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";



export default observer  (function ActivityForm(){
const {activityStore}=useStore();
const {selectedActivity,createActivity,updateActivity,loading,loadActivity,loadingInitial}=activityStore;
const{id}=useParams();
const navigate=useNavigate();
const [activity,setActivity]=useState<Activity >({
    id:'',
    title:'',
    category:'',
    description:'',
    date:null,
    city:'',
    venue:''

});
//Validacija za svako polje 118
const validationsSchema=Yup.object({
    title:Yup.string().required('The activity title is required'),
    description:Yup.string().required('The activity descriptoion is required'),
    category:Yup.string().required().nullable(),
    date:Yup.string().required(),
    venue:Yup.string().required(),
    city:Yup.string().required(),
    
    
})

useEffect(()=>{
if(id)loadActivity(id).then(activity=>setActivity(activity!))
},[id,loadActivity]);

    function handleFormSubmit(activity:Activity)
    {
        if(activity.id.length===0)
        {
            let newActivity={
                ...activity,id:uuid()
            };
            createActivity(newActivity).then(()=>navigate(`/activities/${newActivity.id}`))
        }
        else{
            updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`))
        }
    }



   if(loadingInitial)return <LoadingComponents content='Loading activity...'/>
   // Formiku treba dati initial value i onsubmit.On ima ugradene funckije kao npr handlesubmit.Form je njegova child componeneta
    //Form je mali wraper oko formika koji automatski veze na formik handlesubmit i handlereset
    //MyTextInput automatski hook up inputs to formik koristi name atribute to match up with formik state
    //MyTextInput 119 .Zacrvene se svi ako nema inputa nikakvog 
    //my text area se sada prosirio na vise mjesta 120 
    return(
    
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik enableReinitialize 
            validationSchema={validationsSchema}
            initialValues={activity}
             onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit, isValid,isSubmitting,dirty})=>(
                         <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                            
                         <MyTextInput name='title' placeholder="Title"/>
                         <MyTextArea rows={3} placeholder='Description'  name='description'  />
                         <MySelectInput options={CategoryOptions} placeholder='Category'   name='category'  />
                         <MyDateInput 
                         //neki proipertiesi nisu optionallni i trebamo ih implementirati Partial
                         placeholderText="Date"
                         name='date'
                         showTimeSelect
                         timeCaption="time"
                         dateFormat='MMMM d, yyyy h:mm aa'
                         
                    
                         />
                        <Header content='Location Details' sub color='teal'/>
                         <MyTextInput placeholder='City'   name='city' />
                         <MyTextInput placeholder='Venue'  name='venue'  />
                         <Button
                         disabled={isSubmitting || !dirty || !isValid}//kada upisujemo nesto u fieldove ako nema nicege button bude disabel 
                         loading={loading}
                        floated='right'
                          positive type='submit' 
                          content='Submit' />
                         <Button as={Link} to='/activities' floated='right'  type='button' content='Cancel' />
                     </Form>
                )}
            </Formik>
           
        </Segment>
    )
})