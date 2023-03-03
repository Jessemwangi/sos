import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import {DocumentData} from "@firebase/firestore";
import { GetDataByTwoColumns, Get_One } from '../app/functions/DbFunctions';



const Layout = () => {
   
    // const [data, setData] = React.useState<DocumentData>([]);
    // const [error, setError] = React.useState<unknown>({});
    // const [loading, setLoading] = React.useState<boolean>(true);
    // const { response, docId, loading, error } =  Get_One('users', 'age',"12") ;
    const age: number = 12;
    const { response, error, Loading } =  GetDataByTwoColumns('users', 'feeling','jubijubi','name','jesse',) ;

    // React.useEffect(() => {
    //     const FetchData = async () => {
    //       try {
    //         const { response, error, Loading } =  GetDataByTwoColumns('users', 'age',"12",'name','jesse',) ;
    //         setData(response);
    //         setError(error);
    //         setLoading(Loading);
    //       } catch (error) {
    //         console.error(error);
    //         setError(error);
    //       }
    //     };
    //     FetchData();
    //   }, []);
 console.log('Loading',Loading, 'error....',error, 'response.....',response)
    
    return (
        <div>
            <Header/>
            <h1>LAYOUT</h1>
            <Outlet />

            <Footer/>
        </div>
    );
};

export default Layout;