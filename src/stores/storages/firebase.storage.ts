import { createJSONStorage, StateStorage } from "zustand/middleware";


const firebaseurl = 'https://zustand-storage-eae6b-default-rtdb.firebaseio.com/zustand';


const storageApi: StateStorage = {
    getItem: async function (name: string):Promise<string | null> {
        // eslint-disable-next-line no-useless-catch
        try {
            const data = await fetch(`${firebaseurl}/${name}.json`).then( res => res.json() );
            return JSON.stringify(data);
        } catch (error) {
            throw error;
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        const data = await fetch(`${firebaseurl}/${name}.json`,{
            method: 'PUT',
            body: value
        }).then( res => res.json() );

        return;
    },
    removeItem: function (name: string): unknown | Promise<unknown> {
        throw new Error("Function not implemented.");
    }
}

export const firebaseStorage = createJSONStorage( () => storageApi )