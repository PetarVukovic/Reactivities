import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store{
    activityStore:ActivityStore
    commonStore:CommonStore;//tu pohranjujemo nase errore sa APIa
}
export const store:Store={
   activityStore:new ActivityStore(),
   commonStore:new CommonStore()
}
export const StoreContext=createContext(store);

//react hook to allows us to use our stores inside our components
export function useStore(){
    return useContext(StoreContext);
    //storecontext sadsrzi objekt sa activitystore inside i commonstore
    //we need to provide our context to our application in index.tsx
}