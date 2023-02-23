
import { useEffect, useState } from 'react';
import {
    getDoc,getFirestore, collection, getDocs,
    doc,  addDoc,
} from "@firebase/firestore";
import { db } from '../../DataLayer/FirestoreInit';


const useGetData = (collectionName) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const coll_Name = collection(db, collectionName);
                const colle_Snapshot = await getDocs(coll_Name);
                const colleList = colle_Snapshot.docs.map(doc => doc.data());

                setResponse(colleList);

            } catch (err) {
                setError(err);

            }
            setLoading(false);
        }

        fetchData();
    }, [collectionName]);



    return { response, error, Loading };
}


const useGetOneData = (collectionName, getId) => {
    // const db = getFirestore();

    const [response, setResponse] = useState(null);
    const [Loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () =>{
    const docRef = doc(db,collectionName , getId);

    setLoading(true);
    try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setResponse(docSnap.data());
        } else {
          
            setResponse("Document does not exist");
        }
        
    } catch (err) {
        setResponse(`An Error occured .. ${err.meaasge}` )

    }
    setLoading(false);
}
fetchData()

}, [collectionName, getId]);
return {response,Loading};
}

const Post_Data = async (collectionName, data) => {
    const [response, setResponse] = useState({});
    const [Loading, setLoading] = useState(true);
   
   

    try {
        setLoading(true)
      await addDoc(collection(db, collectionName), data).then((docRef) => {

        setResponse( {
            message:"Document has been added successfully",
            responseCode:200,
            ref:docRef.id
        })
        setLoading(false)
      });
    } catch (error) {

        setResponse ({
        message:Error (`An error occured...", ${ error }` ),
        responseCode:500,
        ref:0
    })
    setLoading(false)
    }
    
    return {response,Loading};
  };



const usePostData = async (collectionName, data, idColName) => {  //idColName the id column name, ed Id, transactionID

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const postData = async () => {

            try {
                await addDoc(collection(db, collectionName), data)
                  .then(docRef => {
                 
                    setResponse("Document has been added successfully")
                  });
          
              } catch (error) {
                setError(`An error occured ... ${error}`);
                setResponse(`An error occured ... ${error}`);
              }
              setIsLoading(false);
              return response;
            }
          
        postData();

    }, [collectionName, data]);
  
    return { response,error,isLoading };
}

export { usePostData, useGetData,useGetOneData ,Post_Data};