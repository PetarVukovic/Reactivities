import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../layout/models/serverError";

export default class CommonStore{
    error:ServerError | null=null;
    token:string|null=localStorage.getItem('jwt');//to radimo kako bi nam nakon osvjkezivanja ostao user prikazan ako get item nije pronaden bit ce token nula
    appLoadded=false;

    constructor(){
        makeAutoObservable(this);

        //Napravit cemo reakciju kako bi reagirali mna promjene tokena.
        //Kada setamo nas token u reaction se nista nedogada samo kod promjena
        reaction(
            ()=>this.token,
            token=>{
                if(token)localStorage.setItem('jwt',token)
                else localStorage.removeItem('jwt')
            }
        )
    }
    setserverError(error:ServerError){
        this.error=error;
        
        

    }
    setToken=(token:string|null)=>{
        this.token=token;
    }
    setAppLoaded=()=>{
        this.appLoadded=true;
    }
}