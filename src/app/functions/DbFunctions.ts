import { useEffect, useState } from "react";
import {
  onSnapshot,
  where,
  query,
  getDoc,
  collection,
  getDocs,
  doc,
  addDoc,QuerySnapshot, DocumentData,
} from "@firebase/firestore";
import { db } from "../../DataLayer/FirestoreInit";
import { LoadingState, Profile } from "../model";

interface Data {
  [key: string]: any;
  response:DocumentData
}

interface DataResponse {
  data: DocumentData[];
}

interface DataError {
  message: string;
}

const initialLoadingState: LoadingState = true;


const GetData = (collectionName:string) => {
  const [response, setResponse] = useState<DocumentData>([]);
  const [error, setError] = useState<unknown>({});

  const [loadingState, setLoading] = useState<LoadingState>(initialLoadingState);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const coll_Name = collection(db, collectionName);
        const colle_Snapshot = await getDocs(coll_Name);
        const colleList = colle_Snapshot.docs.map((doc) => doc.data());

        setResponse(colleList);
      } catch (err:any) {
        setError(err.message);
      }
      setLoading(false);
    }

    fetchData();
  }, [collectionName]);

  return { response, error, loadingState };
};

const GetOneData = (collectionName:string, getId:string) => {
  // const db = getFirestore();

  const [response, setResponse] = useState<DocumentData | string>([]);
  const [loadingState, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, collectionName, getId);

      setLoading(true);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
         
          setResponse(docSnap.data());
        } else {
          setResponse("Document does not exist");
        }
      } catch (err:any) {
        setResponse(`An Error occured .. ${err.meaasge}`);
      }
      setLoading(false);
    };
    fetchData();
  }, [collectionName, getId]);
  return { response, loadingState };
};

 const PostData = async (collectionName:string, data:any):Promise<string>=> {
  // const [response, setResponse] = useState({});
  // const [loadingState, setLoading] = useState(true);
   let rt: string = '';
  try {
    // setLoading(true);
    await addDoc(collection(db, collectionName), data).then((docRef) => {
      // setResponse({
      //   message: "Document has been added successfully",
      //   responseCode: 200,
      //   ref: docRef.id,
      // });
      // setLoading(false);
      rt = "Document has been added successfully";
    });
  } catch (error:any) {
    // setResponse({
    //   message: Error(`An error occured...", ${error}`),
    //   responseCode: 500,
    //   ref: 0,
    // });
    // setLoading(false);
    rt= error.message
  }
   return rt;
  // return { response, loadingState };
};

const PostData_With_Id = async (collectionName:string, data:any, idColName:number) => { 
  //idColName the id column name, ed Id, transactionID

  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loadingState, setIsLoading] = useState(true);
  useEffect(() => {
    const postData = async () => {
      try {
        await addDoc(collection(db, collectionName), data).then((docRef) => {
          setResponse("Document has been added successfully");
        });
      } catch (error:any) {
        setError(`An error occured ... ${error.message}`);
        setResponse(`An error occured ... ${error.message}`);
      }
      setIsLoading(false);
      return response;
    };

    postData();
  }, [collectionName, data, response]);

  return { response, error, loadingState };
};

const Get_One = (collectionName: string, id: string, value: any) => {
  // console.log(collectionName,id,value)
  const [response, setResponse] = useState(null);
  const [loadingState, setLoading] = useState(true);
  const [docId, setDocId] = useState<string>();
  const ref = collection(db, collectionName);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      const q = query(ref, where(id, "==", value));

      setLoading(true);
      const unsub = onSnapshot(q, (querySnapshot) => {
        const items: any = [];
        
        querySnapshot.forEach((doc) => {
          // console.log(doc)
          setDocId(doc.id);
          items.push(doc.data());
        });

        setLoading(false);
        setResponse(items);
      });
      return () => {
        unsub();
      };
    } catch (error:any) {
      setError(` Error occured ${error.message}`);
    }
  }, [id, value]);
  return { response, docId, loadingState, error };
};

export const GetDataByTwoColumns = (collectionName: string, column1name: string, value1: string | number | boolean, column2name: string, value2: string | number | boolean) => {
  const [response, setResponse] = useState<DocumentData[]>([]);
  const [error, setError] = useState<unknown>({});
  const [loadingState, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWithTwo = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, collectionName), where(column1name, '==', value1), where(column2name, '==', value2));
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        // console.log(querySnapshot.docs);
        const data = querySnapshot.docs.map(doc => doc.data());

        setResponse(data);
        setLoading(false);
      } catch (error:any) {
        setError(`Error getting data from Firestore: ${error.message}`);
        console.error('Error getting data from Firestore:', error);
        setLoading(false);
      }
    };
    getWithTwo();
  }, [collectionName, column1name, column2name, value1, value2]);

  return { response, error, loadingState };
};

export const GetDataByTwoColumns2 = async (
  collectionName: string,
  column1name: string,
  value1: string | number | boolean,
  column2name: string,
  value2: string | number | boolean
) => {
  // const [response, setResponse] = useState<DataResponse>({ data: [] });
  // const [error, setError] = useState<DataError>({ message: "" });
  // const [loadingState, setLoading] = useState<boolean>(true);
  let response: string | DataResponse | DataError = '';
      try {
        const q = query(
          collection(db, collectionName),
          where(column1name, "==", value1),
          where(column2name, "==", value2)
        );
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        // console.log(querySnapshot.docs);
        const data = querySnapshot.docs.map((doc) => doc.data());

        response={ data };
      } catch (error:any) {
        response = { message: `Error getting data from Firestore: ${error.message}` }
      }
  return  response
};

export {  GetData, GetOneData, PostData,PostData_With_Id , Get_One };
