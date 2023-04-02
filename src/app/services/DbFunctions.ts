import {setDoc,doc
} from "@firebase/firestore";
import { db } from "../../DataLayer/FirestoreInit";


export const CreateDocSetId = async (collectionName: string, docId: string, payload: any) => {

        await setDoc(doc(db, collectionName, docId),
          payload, { merge: true });
}
