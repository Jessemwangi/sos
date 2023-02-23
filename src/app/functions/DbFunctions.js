import { useEffect, useState } from "react";
import {
  onSnapshot,
  where,
  query,
  getDoc,
  collection,
  getDocs,
  doc,
  addDoc,
} from "@firebase/firestore";
import { db } from "../../DataLayer/FirestoreInit";

const GetData = (collectionName) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const coll_Name = collection(db, collectionName);
        const colle_Snapshot = await getDocs(coll_Name);
        const colleList = colle_Snapshot.docs.map((doc) => doc.data());

        setResponse(colleList);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }

    fetchData();
  }, [collectionName]);

  return { response, error, Loading };
};

const GetOneData = (collectionName, getId) => {
  // const db = getFirestore();

  const [response, setResponse] = useState(null);
  const [Loading, setLoading] = useState(true);

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
      } catch (err) {
        setResponse(`An Error occured .. ${err.meaasge}`);
      }
      setLoading(false);
    };
    fetchData();
  }, [collectionName, getId]);
  return { response, Loading };
};

const PostData = async (collectionName, data) => {
  const [response, setResponse] = useState({});
  const [Loading, setLoading] = useState(true);

  try {
    setLoading(true);
    await addDoc(collection(db, collectionName), data).then((docRef) => {
      setResponse({
        message: "Document has been added successfully",
        responseCode: 200,
        ref: docRef.id,
      });
      setLoading(false);
    });
  } catch (error) {
    setResponse({
      message: Error(`An error occured...", ${error}`),
      responseCode: 500,
      ref: 0,
    });
    setLoading(false);
  }

  return { response, Loading };
};

const PostData_With_Id = async (collectionName, data, idColName) => { 
  //idColName the id column name, ed Id, transactionID

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const postData = async () => {
      try {
        await addDoc(collection(db, collectionName), data).then((docRef) => {
          setResponse("Document has been added successfully");
        });
      } catch (error) {
        setError(`An error occured ... ${error}`);
        setResponse(`An error occured ... ${error}`);
      }
      setIsLoading(false);
      return response;
    };

    postData();
  }, [collectionName, data, response]);

  return { response, error, isLoading };
};

const Get_One = (collectionName, id, value) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState();
  const ref = collection(db, collectionName);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const q = query(ref, where(id, "==", value));

      setLoading(true);
      const unsub = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          setDocId(doc.id);
          items.push(doc.data());
        });

        setLoading(false);
        setResponse(items);
      });
      return () => {
        unsub();
      };
    } catch (error) {
      setError(` Error occured ${error}`);
    }
  }, [id, ref, value]);
  return { response, docId, loading, error };
};
export {  GetData, GetOneData, PostData,PostData_With_Id , Get_One };
