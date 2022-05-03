import Patient from "./Patient";

const ListPatients = ({patients,setPatient,deletePatient}) => {
    

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen doverflow-y-scroll">
            {patients.length > 0 ? (
                <>
                    <h2 className="font-black text-3xl text-center">Patients List</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Manage your {" "}
                        <span className="text-indigo-600 font-bold">Patients and Dates</span>
                    </p>
                    
                    {
                        patients.map(patient => (
                            <Patient 
                                key = {patient.id}   //useId() is a function that returns a unique id
                                patient = {patient}
                                setPatient = {setPatient}
                                deletePatient = {deletePatient}
                            />
                        ))
                    }
                </>
            ) : (
                <>
                <h2 className="font-black text-3xl text-center">No patients yet</h2>
                <p className="text-xl mt-5 mb-10 text-center">
                    Start by{"  "}
                    <span className="text-indigo-600 font-bold">Adding One</span>
                </p>
                </>
            )}
        </div>
    )
}

export default ListPatients;