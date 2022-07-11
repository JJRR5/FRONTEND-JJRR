import React from 'react'
import NewBudget from './NewBudget'
import BudgetControl from './BudgetControl'
const Header = ({budget,setBudget,validBudget,setValidBudget,spents,setSpents}) => {
    return (
        <header>
            <h1>Budget Manager</h1>
            {validBudget ? 
                <BudgetControl
                    budget = {budget}
                    setBudget = {setBudget}
                    spents = {spents}
                    setSpents = {setSpents}
                    setValidBudget = {setValidBudget}
                    
                />
                :
                (<NewBudget 
                    budget={budget}
                    setBudget={setBudget}
                    setValidBudget ={setValidBudget}
                />)
            }

        </header>
    )
}

export default Header