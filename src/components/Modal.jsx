import { useState, useEffect } from "react"
import Message from "./Message"
import closeBtnImg from "../img/cerrar.svg"



const Modal = ({
    setModal,
    animateModal,
    setAnimateModal,
    saveSpent,
    editSpent,
    setEditSpent
}) => {

    const [name,setName] = useState("") 
    const [amount,setAmount] = useState("")
    const [category,setCategory] = useState("")
    const [msg,setMsj] = useState("")
    const [id,setId] = useState("")
    const [date,setDate] = useState("")

    useEffect(()=>{
        
        if(Object.keys(editSpent).length > 0){
            setName(editSpent.name)
            setAmount(editSpent.amount)
            setCategory(editSpent.category)
            setId(editSpent.id)
            setDate(editSpent.date)
        }

    },[]);

    const hideModal = () => {
        setAnimateModal(false)
        setEditSpent({})

        setTimeout(() => {
            setModal(false)
        },300)
    }

    const handlerSubmit = e => {
        e.preventDefault();

        if([name,amount,category].includes("")){
            setMsj("All the fields are required")

            setTimeout(()=> {
                setMsj("")
            },3000);

            return;
        }


        saveSpent({name,amount,category,id,date})

    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={closeBtnImg} alt="closeBtnImg" className="cursor-pointer" onClick={hideModal}/>
            </div>
            <form 
                className={`formulario ${animateModal ? "animar" : "cerrar"}`}
                onSubmit = {handlerSubmit}
            >
                <legend>{editSpent.name ? "Edit Spent" : "New Spent"}</legend>

                {msg && <Message type="error">{msg}</Message>}

                <div className="campo">
                    <label htmlFor="name">Cost Name</label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="Add your cost here" 
                        value = {name}
                        onChange = {e => setName(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="amount">Amount</label>
                    <input 
                        id="amount"
                        type="number"
                        placeholder="Add the amount here e.g. 400" 
                        value = {amount}
                        onChange = {e => setAmount(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="category">Category</label>
                    <select 
                        id="category"
                        value = {category}
                        onChange = {e => setCategory(e.target.value)}
                    >
                        <option value="">-- Select one --</option>
                        <option value="savings"> Savings </option>
                        <option value="food"> Food </option>
                        <option value="house"> House </option>
                        <option value="hobbies"> Hobbies </option>
                        <option value="subscriptions"> Subscriptions </option>
                        <option value="health"> Health </option>
                        <option value="costs"> Other Costs </option> 

                    </select>
                    
                </div>

                <input 
                    type="submit" 
                    value={Object.keys(editSpent).length > 0 ? "Save Changes" : "Add Spent"} 
                />

            </form>
        </div>
    )
}

export default Modal