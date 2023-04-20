import { Typography, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useFetchSignalsByIdQuery } from '../features/signalHistorySlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/services/FirebaseAuth';

//TODO: how is response to signal collected? => when user responds to signal, need to modify document in db

const SignalHistory = () => {
    //a log of sent SOSs

    const [user] = useAuthState(auth);
    const uid = user?.uid;

    const { data, isFetching } = useFetchSignalsByIdQuery(uid as any);
console.log(data);

    if (isFetching) {
        return <LinearProgress color="secondary" />;
    }

    if (!user) {
        return (<Typography component="h2" variant="h6" color="primary" gutterBottom>Please sign in to manage your signals</Typography>)
    }

    return (
        <div style={{ padding: '2rem' }}>

            {!user ? (<Typography>Please sign in to view your signal history</Typography>) : (

                <> <Typography>Signal Log</Typography>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date sent</TableCell>
                                <TableCell>Signal Id</TableCell>
                                <TableCell>Signal Type</TableCell>
                                <TableCell>Sent from location</TableCell>
                                <TableCell>Response</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data && data.map((signal) => (
                                <TableRow key={signal.id} >
                                    <TableCell>{/* {signal.createdAt.toDateString()} */}</TableCell>
                                    <TableCell>{signal.id}</TableCell>
                                    <TableCell>{signal.signalType}</TableCell>
                                    <TableCell>{`${signal.geolocation.lng.toFixed(2)}, ${signal.geolocation.lat.toFixed(2)}`}</TableCell>
                                    <TableCell>{signal.response}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>)}
        </div>
    );
};

export default SignalHistory;