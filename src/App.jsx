import { useState, useEffect } from 'react'
import Header from "./components/Header"
import newSpent from "./img/nuevo-gasto.svg"
import Modal from './components/Modal'
import Filters from './components/Filters'
import SpentsLists from './components/SpentsLists'
import { generateId } from './helpers'

function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  )
  const [validBudget, setValidBudget] = useState(false)

  const [modal,setModal] = useState(false)
  const [animateModal,setAnimateModal] = useState(false)

  const [spents,setSpents] = useState(
    localStorage.getItem('spents') ? JSON.parse(localStorage.getItem('spents')) : []
  )

  const [editSpent,setEditSpent] = useState({})

  const [filter,setFilter] = useState('')
  const [spentsFilter,setSpentsFilter] = useState([])

  useEffect(()=>{
    if(filter){
      const results = spents.filter( spent => spent.category === filter )
      setSpentsFilter(results)
    }
  },[filter]);


  useEffect(()=>{
    if(Object.keys(editSpent).length > 0){
      setModal(true)
      
      setTimeout(()=> {
        setAnimateModal(true)
      },300)
    }
  },[editSpent])

  //Use effect that checks the budget
  useEffect(()=>{
    localStorage.setItem('budget',budget ?? 0);
  },[budget])

  //Use effect that checks if there is a valid budget in the LocalStorage to avoid the initial window
  useEffect(()=>{
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0

    if(budgetLS > 0) setValidBudget(true)
  },[])

  //Use effect to add all the spents on  LocalStorage
  useEffect(()=>{
    localStorage.setItem('spents',JSON.stringify(spents) ?? [])  
  },[spents]);

  //function to animate and clera the state of the modal
  const handleNewSpent = () => {
    setModal(true)
    setEditSpent({})

    setTimeout(()=> {
      setAnimateModal(true)
    },300)
  }

  const saveSpent = spent => {

    if(spent.id){
      const updatedSpent = spents.map(spentState => spentState.id === spent.id ? spent : spentState)
      setSpents(updatedSpent)
      setEditSpent({})
      
    }else{
      spent.id = generateId()
      spent.date = Date.now()
      setSpents([...spents,spent])
    }
    
    setAnimateModal(true)
    setTimeout(()=> {
      setModal(false)
    },500)
  }

  const deleteSpentFn = id => {
    const updated = spents.filter(spent => spent.id !== id)
    setSpents(updated)
  }


  return (
    <div className={modal ? "fijar" : undefined}>
      <Header 
        budget={budget}
        setBudget={setBudget}
        validBudget = {validBudget}
        setValidBudget ={setValidBudget}
        spents = {spents}
        setSpents = {setSpents}
      />
    
      {
        validBudget && 
        <>
          <main>
          <Filters  
            filter = {filter}
            setFilter = {setFilter}
          />
            <SpentsLists
              spents = {spents}
              setEditSpent = {setEditSpent}
              deleteSpentFn = {deleteSpentFn}
              filter = {filter}
              spentsFilter = {spentsFilter}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={newSpent} 
              alt="newSpent" 
              onClick = {handleNewSpent}
            />
          </div>
        </>
      }

      {modal && 
      <Modal 
        setModal = {setModal} 
        animateModal = {animateModal} 
        setAnimateModal = {setAnimateModal}
        saveSpent = {saveSpent}
        editSpent = {editSpent}
        setEditSpent = {setEditSpent}
      />}

    </div>
  )
}

export default App
