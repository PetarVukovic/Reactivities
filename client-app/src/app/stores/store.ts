import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store{
    activityStore:ActivityStore
}
export const store:Store={
   activityStore:new ActivityStore()
}
export const StoreContext=createContext(store);

//react hook to allows us to use our stores inside our components
export function useStore(){
    return useContext(StoreContext);
    //storecontext sadsrzi objekt sa activitystore inside
    //we need to provide our context to our application in index.tsx
}