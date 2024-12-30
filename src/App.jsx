import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/GeneralBlock/Navbar"; // Import your NavBar component

import CreateD from "./Components/Doctor/Create"; // Your AddDoctor component
import CardD from "./Components/Doctor/Card";
import DetailsD from "./Components/Doctor/Details";
import UpdateD from "./Components/Doctor/Update";



import CreateN from "./Components/Nurse/Create"; // Your AddNurse component
import CardN from "./Components/Nurse/Card";
import DetailsN from "./Components/Nurse/Details";
import UpdateN from "./Components/Nurse/Update";


import CreateM from "./Components/Management/Create"; // Your AddNurse component
import CardM from "./Components/Management/Card";
import DetailsM from "./Components/Management/Details";
import UpdateM from "./Components/Management/Update";

import CreatePH from "./Components/Pharmacist/Create"; // Your AddNurse component
import CardPH from "./Components/Pharmacist/Card";
import DetailsPH from "./Components/Pharmacist/Details";
import UpdatePH from "./Components/Pharmacist/Update";


import Patient from './Components/Patient/PatientTable'
import Addpatient from './Components/Patient/AddPatient'

import Createpres from './Components/Patient/WritePrescription';
import GetPres from './Components/Patient/Prescription';
import All from './Components/Patient/AllPrescription'


import WriteVitalSigns from './Components/Patient/WriteVitalSigns';
import VitalSignHistory from './Components/Patient/vitalSignsHistory';


import WriteDiagnosis from "./Components/Patient/WriteDiagnose";
import DiagnosisCard from "./Components/Patient/GetDiagnose";
import DiagnosisCards from "./Components/Patient/AllDiagnosis";

import WriteSickLeave from "./Components/Patient/ExcuseAbsence";
import SickLeaves from "./Components/Patient/AllSickLeave";
import SickLeave from "./Components/Patient/SickLeave";
function App() {
  return (
   <BrowserRouter>
   <NavBar/>
   

      <Routes>

      <Route path="/create-sick-leave/:id" element={<WriteSickLeave/>}/>
      <Route path="/sick-leave/:id" element={<SickLeave/>}/>
      <Route path="/all-sick-leaves/:id" element={<SickLeaves/>}/>

      <Route path="/create-diagnosis/:id" element={<WriteDiagnosis/>}/>
      <Route path="/diagnosis/:id" element={<DiagnosisCard/>}/>
      <Route path="/all-diagnosis/:id" element={<DiagnosisCards/>}/>



        <Route path="/all-prescription/:id" element={<All/>}/>
        <Route path="/prescription/:id" element={<GetPres/>}/>
        <Route path="/create-prescription/:id" element={<Createpres/>}/>


        <Route path="/create-vital-signs/:id" element={<WriteVitalSigns/>}/>
        <Route path="/history-vital-signs/:id" element={<VitalSignHistory/>}/>
        

      <Route path="/update-doctor/:id" element={<UpdateD  />}/>
      <Route path="/create-doctor" element={<CreateD  />}/>
      <Route path="/doctors" element={<CardD  />}/>
      <Route path="/details-doctor/:id" element={<DetailsD  />}/>


      <Route path="/update-nurse/:id" element={<UpdateN  />}/>
      <Route path="/create-nurse" element={<CreateN  />}/>
      <Route path="/nurses" element={<CardN  />}/>
      <Route path="/details-nurse/:id" element={<DetailsN  />}/>



       <Route path="/update-staff/:id" element={<UpdateM  />}/>
      <Route path="/create-staff" element={<CreateM  />}/>
      <Route path="/staff" element={<CardM  />}/>
      <Route path="/details-staff/:id" element={<DetailsM  />}/>


       <Route path="/update-pharmacist/:id" element={<UpdatePH  />}/>
      <Route path="/create-pharmacist" element={<CreatePH  />}/>
      <Route path="/pharmacists" element={<CardPH  />}/>
      <Route path="/details-pharmacist/:id" element={<DetailsPH  />}/>




<Route path="/patients" element={<Patient/>}/>
<Route path="/create-patient" element={<Addpatient/>}/>

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
