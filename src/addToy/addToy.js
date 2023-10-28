import { useState } from "react"
import { useContext } from "react";
import { MultiToyCtx } from "../context";


function AddToy(props){

    const {data,setterfn} = useContext(MultiToyCtx)
    const [toyData,setToyData] = useState(data)
    
    function trackChange(e){
        let id = e.target.id
        let vl = e.target.value
        setToyData((p)=>{return {...p,[id]:vl}})
    }

    async function addToStore(e){


        if(data.mode === 'new'){
            let res = await fetch('https://toysrest.onrender.com/toys/',
            {
                method:'POST',
                body:JSON.stringify({
                    'name':toyData.name,
                    'description':toyData.description,
                    'release_date':toyData.release_date,
                    'toy_category':toyData.toy_category
                })
            })
            console.log(res)
            setterfn({'pk':'','mode':'new','name':'','description':'','toy_category':'','release_date':''})
        }

        if(data.mode === 'edit'){
            
            let res = await fetch(`https://toysrest.onrender.com/toys/${toyData.pk}`,{
                method:"PUT",
                body:JSON.stringify({
                    'name':toyData.name,
                    'description':toyData.description,
                    'release_date':toyData.release_date,
                    'toy_category':toyData.toy_category
                })
            })
            if (res.status === 200 ){
                window.location.href = ''
            }
        }
    }

    return(
        <div className="flex justify-center">
            <form className="p-3">
                <div className="w-full p-1">
                    <input 
                    type="text"
                    className="
                    h-8
                    border-2
                    rounded
                    border-slate-300
                    ring-slate-200
                    outline-none
                    w-full
                    pl-3
                    " 
                    placeholder="Name"
                    id="name"
                    onChange={trackChange}
                    value={toyData.name}
                    />
                </div>
                <div className="w-full p-1">
                    <input 
                    type="text"
                    className="
                    border-2
                    rounded
                    h-8
                    border-slate-300
                    ring-slate-200
                    outline-none
                    w-full
                    pl-3
                    " 
                    placeholder="Description"
                    id="description"
                    onChange={trackChange}
                    value={toyData.description}
                    />
                </div>
                <div className="w-full p-1">
                    <input 
                    type="text"
                    className="
                    border-2
                    rounded
                    h-8
                    border-slate-300
                    ring-slate-200
                    outline-none
                    pl-3
                    w-full
                    " 
                    placeholder="Category"
                    id="toy_category"
                    onChange={trackChange}
                    value={toyData.toy_category}
                    />
                </div>
                <div className="w-full p-1">
                    <input 
                    type="datetime-local"
                    className="
                    border-2
                    rounded
                    h-8
                    w-full
                    border-slate-300
                    ring-slate-200
                    outline-none
                    pl-3
                    " 
                    id="release_date"
                    onChange={trackChange}
                    value={toyData.release_date}
                    />
                    <p>{toyData.release_date}</p>
                </div>
                <div className="w-full p-1 text-center">
                    <button
                    type="button"
                    className="
                    h-10
                    w-40
                    text-center
                    rounded
                    bg-violet-300
                    shadow-md
                    active:shadow-none
                    "
                    onClick={addToStore}
                    >Add to store</button>
                </div>
            </form>
        </div>
    )
}

export default AddToy