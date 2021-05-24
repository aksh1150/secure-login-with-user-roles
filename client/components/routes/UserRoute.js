import { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'
import axios from 'axios'

const UserRoute = () => {
    const [ok, setOk] = useState(true);
    // get user from context state
    const { state: {user} } = useContext(Context);

     const fetchUser = async () => {
            try {
                const { data } = await axios.get('/api/current-user');
                console.log(data);
                setOk(false);
            } catch(err) {
                console.log(err);
                setOk(true);
            }
        };


    useEffect(() => {
        fetchUser();
    },[]);


    return (
        <>
       {!hidden && (
       <h1 className="jumbotron text-center square">
            <pre>{user.name}</pre>
        </h1> 
       )
        }
        </>
    )
}

export default UserRoute;