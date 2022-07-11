import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { generateDate } from '../helpers'

import SavingsIcon from "../img/icono_ahorro.svg"
import HouseIcon from "../img/icono_casa.svg"
import FoodIcon from "../img/icono_comida.svg"
import SpentsIcon from "../img/icono_gastos.svg"
import HobbiesIcon from "../img/icono_ocio.svg"
import HealthIcon from "../img/icono_salud.svg"
import SubsIcon from "../img/icono_suscripciones.svg"


const Spent = ({spent,setEditSpent,deleteSpentFn}) => {

    const {name,category,date,amount,id} = spent

    const icons = {
        savings : SavingsIcon,
        house : HouseIcon,
        food: FoodIcon,
        costs : SpentsIcon,
        hobbies: HobbiesIcon,
        health : HealthIcon,
        subscriptions : SubsIcon
    }


    const leadingActions = ()=>(
        <LeadingActions>
            <SwipeAction onClick ={() => setEditSpent(spent)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = ()=>(
        <TrailingActions>
            <SwipeAction 
                onClick={()=>deleteSpentFn(id)}
                destructive = {true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )
    
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions = {leadingActions()}
                trailingActions = {trailingActions()}
            >
            <div className='gasto sombra'>
                <div className='contenido-gasto'>
                    <img 
                        src={icons[category]}
                        alt= {`Icon: ${category}`} 
                    />
                    
                    <div className='descripcion-gasto'>
                        <p className='categoria'>
                            {category}
                        </p>
                        <p className='nombre-gasto'>
                            {name}
                        </p>
                        <p className='fecha-gasto'>
                            Added on: {" "}
                            <span>{generateDate(date)}</span>
                        </p>
                    </div>
                </div>
                <p className='cantidad-gasto'>
                    {`$${amount}`}
                </p>
            </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Spent