import { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'
import axios from 'axios'

const UserRoute = () => {
    const [ok, setOk] = useState(false);
    // get user from context state
    const { state: {user} } = useContext(Context);

     const fetchUser = async () => {
            try {
                const { data } = await axios.get('/api/current-user');
                if(data.ok) setOk(true);
            } catch(err) {
                console.log(err);
                setOk(false);
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