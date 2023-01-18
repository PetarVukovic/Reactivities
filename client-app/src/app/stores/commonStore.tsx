import { makeAutoObservable } from "mobx";
import { ServerError } from "../layout/models/serverError";

export default class CommonStore{
    error:ServerError | null=null;

    constructor(){
        makeAutoObservable(this);
    }
    setserverError(error:ServerError){
        this.error=error;

    }
}