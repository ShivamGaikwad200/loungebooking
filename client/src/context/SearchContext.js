import { createContext, useReducer } from "react";

const INITIAL_STATE={
    city:undefined,
    dates:[],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined,
    },
    loading: false,
    error: null, 
};

export const SearchContext=createContext(INITIAL_STATE)

const SearchReducer=(state,action)=>{
    switch(action.type){
        case "NEW_SEARCH":
            // return action.payload
            return { ...state, ...action.payload };
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state;    
    }
}

export const SearchContextProvider=({children})=>{
    const [state,dispatch]=useReducer(SearchReducer,INITIAL_STATE);

    return (
        <SearchContext.Provider
            value={{
                user:state.loading,
                city: state.city,
                dates: state.dates, // ✅ Pass dates
                options: state.options,
                loading:state.loading,
                error:state.error,
                dispatch,
            }}>
                {children}
        </SearchContext.Provider>
    )
}