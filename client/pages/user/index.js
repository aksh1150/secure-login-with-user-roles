import { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'
import axios from 'axios'

const UserIndex = () => {
    useEffect(() => {
        const fetchUser = async () => {
            try {

            } catch(err) {
                console.log(err)
            }
        }
    },[])
    return (
        <h1 className="jumbotron text-center square">User</h1>
    )
}

export default UserIndex;