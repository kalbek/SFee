import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import CreateSchool from './pages/CreateSchool';
import RegisterStudent from './pages/RegisterStudent';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import RequireAuth from './components/RequireAuth';

const ROLES = {
  'User' : 2001,
  'Admin' : 5150,
}

function App() {
  return (
    <> 
      <Router>
        <div className='container'>
          <Header />
          <Routes>
              {/* public routes */}
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>  

              {/* Protected routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                <Route path='/' element={<Dashboard />}></Route>
                <Route path='/createSchool' element={<CreateSchool/>}></Route>
                <Route path='/registerStudent' element={<RegisterStudent/>}></Route>
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
                <Route path='/getUsers' element={<AdminDashboard />}></Route>
              </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
