import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker,{ReactDatePickerProps} from 'react-datepicker';
import { date } from 'yup';



//meta jeli filed diran.!!-cast-> pretvara taj error koji je string u boolean
//ako je meta diran ili ima erora onda cemo imati crveni label sa meta errorima ako ne null
//Rezultat pocrveni  cijeli label
//OVJDE KORISTIMO DATAPICKER KOJI TREBA NEKE PROPERTISE koje importamo preko ReactDatePickerProps

export default function MyDateInput(props:Partial <ReactDatePickerProps>){//Partial da nemoram o implementirat non optionalne nego sto mi zelimo 
    //jer su svi ?optionalni p odefault trebamo staviti ! da cemo ga imati 

    const[field,meta,helpers]=useField(props.name!);
    return(
        <Form.Field error={meta.touched && !!meta.error} >
           <DatePicker
           {...field}
           {...props}
           selected={(field.value &&new Date(field.value)) || null}//ako imamo neki value u fieldu onda specificiramo novi date ako nemamo onda null.new Date JS object
           onChange={value=>helpers.setValue(value)}


           
           
           
           />
            {meta.touched && meta.error ? (
                <Label basic color='red'> {meta.error}</Label>
            ):null}

        </Form.Field>
    )

}
  