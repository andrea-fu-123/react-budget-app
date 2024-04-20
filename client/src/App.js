

import { Route,Routes , Navigate} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Budget from './pages/Budget.jsx';
import Login from './pages/Login.jsx';

function Main() {

  
  return (

    <div className = 'App'>
      {/* {signInDivVisible && <div id = "signInDiv"></div>}
      {!signInDivVisible &&  <Button variant="contained" onClick = {(e) => handleSignOut(e)} >Sign Out</Button> } */}
     
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/summary" element={<Summary />} />
        <Route path="/history" element={<SpendingHistory />} /> */}
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
