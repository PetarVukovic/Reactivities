import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';

interface Props{
    placeholder:string;
    name:string;
    label?:string;

}
//meta jeli filed diran.!!-cast-> pretvara taj error koji je string u boolean
//ako je meta diran ili ima erora onda cemo imati crveni label sa meta errorima ako ne null
//Rezultat pocrveni  cijeli label

export default function MyTextInput(props:Props){

    const[field,meta]=useField(props.name);
    return(
        <Form.Field error={meta.touched && !!meta.error} >
            <label>{props.label}</label>
            <input {...field} {...props}  />
            {meta.touched && meta.error ? (
                <Label basic color='red'> {meta.error}</Label>
            ):null}

        </Form.Field>
    )

}
  