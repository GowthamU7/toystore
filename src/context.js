import { createContext, useState } from "react";

export const MultiToyCtx = createContext()

export const MultiToyCtxView = ({children})=>{
    const [data,setData] = useState(
        {'pk':'','mode':'new','name':'','description':'','toy_category':'','release_date':''})
    return <MultiToyCtx.Provider 
        value={{data,setterfn:(setterData)=>setData(setterData)}}
        >
        {children}
    </MultiToyCtx.Provider>
}

