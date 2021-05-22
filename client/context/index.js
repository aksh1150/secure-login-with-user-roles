import {useReducer, createContext, useEffect} from 'react'
import axios from 'axios'


// create initial state
const initialState = {
    user: null,
}

// create context
const Context = createContext()

// root reducer
const rootReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {...state, user: action.payload};
        case "LOGOUT":
            return {...state, user: null};
        default:
            return state;
    }
}


// context provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(localStorage.getItem("user")),
        })
    }, [])
    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export {Context, Provider};