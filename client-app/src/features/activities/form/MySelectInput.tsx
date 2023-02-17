//za DODAVANJE ODABIRA U TOM POLJU 121
import { useField } from 'formik';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props{
    placeholder:string;
    name:string;
    label?:string;
    options:any;

}
//Kopirano i z select inputa.Trebamo dodati jos jedan property options i u usefieldu trebamo helpers
//Heleprs sluzi za manualno postavljanje valua i setanje touched statusa of our input componenet
//meta jeli filed diran.!!-cast-> pretvara taj error koji je string u boolean
//ako je meta diran ili ima erora onda cemo imati crveni label sa meta errorima ako ne null
//Rezultat pocrveni  cijeli label

export default function MySelectInput(props:Props){

    const[field,meta,helpers]=useField(props.name);
    //Input ce biti drugaciji.Select je drop down sugar 
    return(
        <Form.Field error={meta.touched && !!meta.error} >
            <label>{props.label}</label>
            <Select
            clearable
            options={props.options}
            value={field.value || null}
            onChange={(e,d)=>helpers.setValue(d.value)}//uzima event i data
            onBlur={()=>helpers.setTouched(true)}//onblur->event koji se poziva kada korisnik napusti input field
            placeholder={props.placeholder}
            
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'> {meta.error}</Label>
            ):null}

        </Form.Field>
    )

}
  