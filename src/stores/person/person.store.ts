import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist, StateStorage } from "zustand/middleware";
import { customSessionStorage } from "../storages/session.storage";
import { firebaseStorage } from "../storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";


interface PersonState {
    firstName: string;
    lastName: string;

}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> =  (set) => ({

    firstName: '', 
    lastName: '',

    setFirstName: ( value: string ) => set( state => ({ firstName: value }), false, 'setFirstName' ),
    setLastName: ( value: string ) => set( state => ({ lastName: value }), false, 'setLastName' ),

    }
);




export const usePersonStore = create<PersonState & Actions>()( 
    devtools(
        persist(
            storeApi
            , { 
                name: 'person-storage',
                // storage: customSessionStorage //guarda en el session storage 
                // storage: firebaseStorage //guarda en firebase
            }
        )
    )

);