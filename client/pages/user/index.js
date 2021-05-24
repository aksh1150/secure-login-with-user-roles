import { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'
import axios from 'axios'

const UserIndex = () => {
    // get user from context state
    const { state: {user} } = useContext(Context)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/api/current-user');
                console.log(data);
            } catch(err) {
                console.log(err)
            }
        }
    },[])
    return (
        <h1 className="jumbotron text-center square">
            <pre></pre>
        </h1>
    )
}

export default UserIndex;