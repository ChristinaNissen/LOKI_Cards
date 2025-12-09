import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ConsentForm from './Components/Study-Info/ConsentForm';
import StudyInfo1 from './Components/Study-Info/StudyInfo1';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import VotedBefore from './Components/VotedBefore';
import Voting from './Components/Voting';
import BallotConfirmation from './Components/BallotConfirmation_Card';
import BallotConfirmation_Picture from './Components/BallotConfirmation_Picture';
import BallotConfirmation_Word from './Components/BallotConfirmation_Word';
import VisualSelectionPicture from './Components/VisualSelection_Picture';
import VisualSelectionWord from './Components/VisualSelection_Word';
import StudyInfo2 from './Components/Study-Info/StudyInfo2';
import StudyInfo3 from './Components/Study-Info/StudyInfo3';
import VisualSelection from './Components/VisualSelection_Card';
import Navbar from './Components/Navbar';
import './App.css';
import VoteContext from "./Contexts/VoteContext";
import PrivateModeWarning from './Components/PrivateModeWarning';
import NoPrivateMode from './Components/NoPrivateMode';
import Help from './Components/Help';
import Parse from "parse";


//const PARSE_APPLICATION_ID = "aFtAdHBZI5s04YUs47bPYdDTlnVrRhSI9Dpl9CJ5";
//const PARSE_HOST_URL = "https://parseapi.back4app.com/";
//const PARSE_JAVASCRIPT_KEY = "AXphTNbNhIt6mb9NK5xa2I5SKZ0UwxyBl3aAAH1u";

Parse.initialize("aFtAdHBZI5s04YUs47bPYdDTlnVrRhSI9Dpl9CJ5", "AXphTNbNhIt6mb9NK5xa2I5SKZ0UwxyBl3aAAH1u");
Parse.serverURL = "https://parseapi.back4app.com/";
//Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const hideNavbarOn = ["/", "/studyinfo1", "/studyinfo2", "/studyinfo3"];
  const [userSelectedYes, setUserSelectedYes] = useState(false);
  
  // Initialize selectedImage from sessionStorage if it exists
  const [selectedImage, setSelectedImage] = useState(() => {
    const saved = sessionStorage.getItem('selectedImage');
    return saved || null;
  });
  
  const [selectedImageName, setSelectedImageName] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Save selectedImage to sessionStorage whenever it changes
  useEffect(() => {
    if (selectedImage) {
      sessionStorage.setItem('selectedImage', selectedImage);
    }
  }, [selectedImage]);

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      )}

      <VoteContext.Provider value={{ userSelectedYes, setUserSelectedYes, selectedImage, setSelectedImage, selectedImageName, setSelectedImageName, selectedImageIndex, setSelectedImageIndex }}>
        <Routes>
          <Route path="/" element={<ConsentForm />} />
          <Route path="/studyinfo1" element={<StudyInfo1 />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/votedbefore" element={<VotedBefore />} />
          <Route path="/voting" element={<Voting  />} />
          <Route path="/confirmation" element={<BallotConfirmation setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/confirmation2" element={<BallotConfirmation_Picture setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/confirmation3" element={<BallotConfirmation_Word setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/studyinfo2" element={<StudyInfo2 />} />
          <Route path="/studyinfo3" element={<StudyInfo3 />} />
          <Route path="/selection" element={<VisualSelection />} />
          <Route path="/selection2" element={<VisualSelectionPicture />} />
          <Route path="/selection3" element={<VisualSelectionWord />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/private-mode" element={<PrivateModeWarning />} />
          <Route path="/private-mode1" element={<NoPrivateMode/>} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </VoteContext.Provider>
    </>
  );
}

export default App;
