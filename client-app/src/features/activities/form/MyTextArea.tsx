import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
//120 kopiramo i z mytext inputa
interface Props{
    placeholder:string;
    name:string;
    label?:string;
    rows:number

}
//meta jeli filed diran.!!-cast-> pretvara taj error koji je string u boolean
//ako je meta diran ili ima erora onda cemo imati crveni label sa meta errorima ako ne null
//Rezultat pocrveni  cijeli label

export default function MyTextArea(props:Props){

    const[field,meta]=useField(props.name);
    return(
        <Form.Field error={meta.touched && !!meta.error} >
            <label>{props.label}</label>
            <textarea {...field} {...props}  />
            {meta.touched && meta.error ? (
                <Label basic color='red'> {meta.error}</Label>
            ):null}

        </Form.Field>
    )

}
  