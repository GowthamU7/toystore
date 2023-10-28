import { useState,useEffect } from "react"
import { useContext } from "react"
import { MultiToyCtx } from "../context"

export default function Toys(props){

    const [toysData,setToysData] = useState([])
    const [ele,setEle] = useState(0)

    const {setterfn} = useContext(MultiToyCtx)

    useEffect(()=>{
        async function get(){
            const response = await fetch('https://toysrest.onrender.com/toys/')
            const responseData = await response.json()
            setToysData(responseData)
            setEle(responseData.length)

        }
        get()
    },[ele])

    async function deleteToy(id){

        let res = await fetch(`https://toysrest.onrender.com/toys/${id}`,{method:'delete'})
        if(res.status === 204 ) alert('Item deleted.')
        setEle(ele-1)

    }

    function editToy(toy){
        props.setShowForm(true)
        setterfn({...toy,'mode':'edit'})
    }

    return (
        <div className="container flex justify-evenly flex-wrap">

            {
                toysData.map((toy,index)=>{
                    return (
                        <div key={index} className="
                        border-2
                        m-2
                        max-md:w-1/2
                        max-lg:w-1/2
                        max-xl:w-1/3
                        w-1/4
                        word-wrap
                        shadow shadow-lg p-4 rounded rounded-lg">
                            <div>
                                <ul className="list">
                                    <li>
                                        <h3 className="text-lg font-mono underline work-break">{toy.name}</h3>
                                        <small>{toy.toy_category}</small>
                                    </li>
                                    <li><p className="text-sm font-mono word-break">{toy.description}</p></li><br/>
                                    <li className="flex justify-around">
                                        <small className="word-break">release | {toy.release_date}</small>
                                        <div>
                                            <button
                                            className="
                                            bg-red-400 rounded
                                            text-xs
                                            shadow
                                            h-6
                                            p-1
                                            m-1
                                            "
                                            onClick={()=>deleteToy(toy.pk)}
                                            ><small>Delete</small></button>
                                            <button
                                            className="
                                            bg-green-400 rounded
                                            text-xs
                                            shadow
                                            h-6
                                            p-1
                                            m-1
                                            "
                                            onClick={()=>editToy(toy)}
                                            ><small>Edit</small></button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>    
                    )
                })
            }
        </div>
    )
}