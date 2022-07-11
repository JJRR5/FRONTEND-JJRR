import React from 'react'
import Spent from './Spent'

const SpentsLists = ({spents,setEditSpent,deleteSpentFn,filter,spentsFilter}) => {




    return (
        <div className='listad-gastos contenedor'>

            {
                filter ? (
                    <>
                    <h2>{spentsFilter.length  ? "Spents" : "No Spents of this Category Yet"}</h2>
                        {spentsFilter.map( spent => (
                            <Spent
                                key = {spent.id}
                                spent = {spent}
                                setEditSpent = {setEditSpent}
                                deleteSpentFn = {deleteSpentFn}
                            />
                        ))}
                    </>
                ) : (
                    <>
                    <h2>{spents.length  ? "Spents" : "No Spents Yet"}</h2>
                        {spents.map( spent => (
                            <Spent
                                key = {spent.id}
                                spent = {spent}
                                setEditSpent = {setEditSpent}
                                deleteSpentFn = {deleteSpentFn}
                            />
                        ))}
                    </>
                )
            }

            
        </div>
    )
}

export default SpentsLists