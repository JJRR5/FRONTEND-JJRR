
const Patient = ({patient,setPatient,deletePatient}) => {
    const {name, owner, email, medical, symptom,id} = patient;

    const handleDelete = () => {
        const answer = confirm("Are you sure you want to delete this patient?");
        if(answer){
            deletePatient(id);
        }
    }
    return (
        <div className="m-3 bg-indigo-600 shadow-md px-5 py-10 rounded-xl text-white mb-2">
            <p className="font-bold mb-3 uppercase">Name: {""}
                <span className="font-normal normal-case">{name}</span>
            </p>
            <p className="font-bold mb-3 uppercase">Owner: {""}
                <span className="font-normal normal-case">{owner}</span>
            </p>
            <p className="font-bold mb-3 uppercase">Email: {""}
                <span className="font-normal normal-case">{email}</span>
            </p>
            <p className="font-bold mb-3 uppercase">Medical Release: {""}
                <span className="font-normal normal-case">{medical}</span>
            </p>
            <p className="font-bold mb-3 uppercase">Symptoms: {""}
                <span className="font-normal normal-case">{symptom}</span>
            </p>

            <div className="flex gap-2 mt-10">
                <button
                    type="button"
                    className="flex-1 py-2 px-10 bg-white rounded-md text-indigo-600 text-lg text-center font-bold uppercase tracking-wide hover:bg-gray-300 transition-all ease-in-out duration-300"
                    onClick = {() => setPatient(patient)}
                >Edit</button>
                
                <button
                    type="button"
                    className="flex-1 py-2 px-10 bg-red-600 rounded-md text-white text-lg text-center font-bold uppercase tracking-wide hover:bg-red-700 transition-all ease-in-out duration-300"
                    onClick = {handleDelete}
                >Delete</button>
                
            </div>
        </div>
    )
}

export default Patient