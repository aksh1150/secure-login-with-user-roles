import {useReducer, createContext, useEffect} from 'react'
import axios from 'axios';
import {userRouter} from 'next/router'; 

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

    // router
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(localStorage.getItem("user")),
        })
    }, []);

    
    // use axios interceptors
    axios.interceptors.response.use(
        function(response) {
            // any status code that lie within the range of 2xx cause this function to triggeer 
            return response;
        }, function(error) {
            // any status code that falls outside the range of 2xx cause this function to trigger
            let res = error.response;
            if(res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios.get('/api/logout')
                    .then((data) => {
                        dispatch({type: "LOGOUT"})
                        window.localStorage.removeItem('user')
                        router.push('/login')
                    })
                    .catch((err) => {
                        console.log('AXIOS INTERCEPTORS ERR', err)
                        reject(error)
                    })
                })
            }
        }
    )

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export {Context, Provider};