import { useState , useEffect } from 'react';
import Error from './Error';

const Form = ({ patients,setPatients,patient,setPatient }) => {
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [email, setEmail] = useState("");
    const [medical, setMedical] = useState("");
    const [symptom, setSymptom] = useState("");

    const [error, setError] = useState(false);

    useEffect(() => {
        if(Object.keys(patient).length > 0) {
            const {name,owner,email,medical,symptom} = patient;
            setName(name);
            setOwner(owner);
            setEmail(email);
            setMedical(medical);
            setSymptom(symptom);
        }
    },[(patient)]);

    const generateID = () => {
        const date = Date.now().toString(36);
        const randoom = Math.random().toString(36).substr(2);

        return date + randoom;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Form validation 
        if([name, owner, email, medical, symptom].includes("")){
            setError(true);
            return;
        }
        setError(false);

        //Create patient object
        const newPatient = {
            name,
            owner,
            email,
            medical,
            symptom,
        }
        
        if(patient.id) {
            newPatient.id = patient.id;

            //map the patients array and when the id matches the id of the patient we want to update, replace it with the new patient object else keep the old one
            const patientUpdated = patients.map(patientState => patientState.id === newPatient.id ? newPatient : patientState);

            setPatients(patientUpdated);

            setPatient({});
            

        }else{
            //Add patient to list
            newPatient.id = generateID();
            setPatients([...patients, newPatient]);
        }

        //Reset Form
        setName("");
        setOwner("");
        setEmail("");
        setMedical("");
        setSymptom("");
    }
    return (
        <div class="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Patient Follow-up</h2>

            <p className="text-lg mt-5 text-center">Add Patients and {" "}
                <span className="text-indigo-600 font-bold ">Manage them</span>
            </p>

            <form className="bg-white shadow-md rounded-lg p-10 px-5 mt-10 mb-10"
                onSubmit={handleSubmit}
            >
                {error && 
                    <Error>
                        <p>All the fileds are required</p>
                    </Error>
                }
                <div>
                    <label htmlFor="pet" className="block text-grey-700 uppercase font-bold">Pet's Name</label>
                    <input 
                        type="text"
                        id="pet"
                        placeholder="Pet's Name"
                        className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md shadow focus:outline-none focus:border-indigo-600"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="owner" className="block text-grey-700 uppercase font-bold">Owner's Name</label>
                    <input 
                        type="text"
                        id="owner"
                        placeholder="Owner's Name"
                        className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md shadow focus:outline-none focus:border-indigo-600"
                        value={owner}
                        onChange={e => setOwner(e.target.value)}
                    />
                </div> 
                <div className="mt-5">
                    <label htmlFor="email" className="block text-grey-700 uppercase font-bold">Email</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md shadow focus:outline-none focus:border-indigo-600"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div> 
                <div className="mt-5">
                    <label htmlFor="medical" className="block text-grey-700 uppercase font-bold">Medical Release</label>
                    <input 
                        type="date"
                        id="medical"
                        className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md shadow focus:outline-none focus:border-indigo-600"
                        value={medical}
                        onChange={e => setMedical(e.target.value)}
                    />
                </div> 
                <div className="mt-5">
                    <label htmlFor="symptom" className="block text-grey-700 uppercase font-bold">Symptomatology</label>
                    <textarea 
                        id="symptom" 
                        className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md shadow focus:outline-none focus:border-indigo-600"
                        placeholder="The symptoms"
                        value={symptom}
                        onChange={e => setSymptom(e.target.value)}
                    />

                </div> 

                <input 
                    type="submit" 
                    className = "bg-indigo-600 w-full p-3 text-white uppercase font-bold  mt-5 rounded-md transition-all ease-in-out duration-300 hover:bg-indigo-800 cursor-pointer"
                    value={patient.id ? "Save changes" : "Add patient"}
                />
            </form>

        </div>
    );
}

export default Form