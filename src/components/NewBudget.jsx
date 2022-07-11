import { useState } from 'react'
import Message from './Message'

const NewBudget = ({budget,setBudget,setValidBudget}) => {

    let [msj,setMsj] = useState("")

    const handleBudget = (e) => {
        e.preventDefault()

        if (!budget || budget < 0){
            setMsj("The budget must be a number")
            return
        }
        setMsj("")
        setValidBudget(true)
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handleBudget} className="formulario">
                <div className="campo">
                    <label htmlFor="">Enter your Budget</label>
                    <input 
                        className = "nuevo-presupuesto"
                        type="number" 
                        placeholder="Your Budget"
                        value = {budget}
                        onChange = { e => setBudget(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="add"/>
                {msj && <Message type="error">{msj}</Message>}
            </form>
        </div>
    )
}

export default NewBudget