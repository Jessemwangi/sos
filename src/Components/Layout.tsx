import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { GetData, GetDataByTwoColumns, GetDataByTwoColumns2, GetOneData, Get_One } from '../app/functions/DbFunctions';
import '../styles/Layout.css';


const Layout = () => {

    // const [data, setData] = React.useState<DocumentData>([]);
    // const [error, setError] = React.useState<unknown>({});
    // const [loading, setLoading] = React.useState<boolean>(true);
    //   const { response, docId, loadingState, error } =  Get_One('users', 'age',"12") ;
    // const age: number = 12;
    // const { response, loadingState} =GetOneData('users','dqFH6J3A9EHy2HkDvXrG')
    const { response, error, loadingState } = GetData('users');
    //  const { response, error, loadingState } =  GetDataByTwoColumns2('users', 'age','30','name','jesse',) ;

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
    //console.log('Loading', loadingState, 'error....', error, 'response.....', response)
    // console.log('Loading', loadingState,  'response.....', response)
    return (
        <div className="layout">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default Layout;