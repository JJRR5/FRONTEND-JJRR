import {useEffect,useState} from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

const BudgetControl = ({budget,spents,setBudget,setSpents,setValidBudget}) => {

    const [avaliable,setAvaliable] = useState(0)
    const [wasted,setWasted] = useState(0)
    const [percentage,setPercentage] = useState(0)

    useEffect(()=>{
        const total = spents.reduce((ac,el)=> el.amount + ac,0)

        const totalAvalible = budget - total

        //Calculate the % spented to show it on the graph
        const newPercentage = (((budget - totalAvalible) / budget * 100)).toFixed(2)

        setPercentage(newPercentage)
        setAvaliable(totalAvalible)
        setWasted(total)    

    },[spents])

    const formatQuantity = budget =>{
        return budget.toLocaleString("en-US",{
            style: "currency",
            currency: "USD"
        })
    }

    const handleResetApp = () => {
        const result = confirm(`Are you sure you want to reset the App?`)

        if(result){
            setBudget(0)
            setSpents([])
            setValidBudget(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
            <CircularProgressbar 
                value = {percentage}
                text = {`${percentage}% Spented`}
                styles = {buildStyles({        
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 4.5,
                    pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                    textColor: percentage > 100 ? '#DC2626' : '#3B82F6'

                })}
            />
            </div>
        
            <div className="contenido-presupuesto">
                <button 
                    className='reset-app'
                    type = 'button'
                    onClick = {handleResetApp}
                >
                    Reset App
                </button>
                <p>
                    <span>Budget: </span>{formatQuantity(budget)}
                </p>
                <p className={`${avaliable < 0 ? 'negativo' : ''}`}>
                    <span>Avalible: </span>{formatQuantity(avaliable)}
                </p>
                <p>
                    <span>Spent: </span>{formatQuantity(wasted)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl