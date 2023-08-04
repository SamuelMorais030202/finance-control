import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { DashBoard } from '../pages/DashBoard/DashBoard';
import { EditProfile } from '../pages/EditProfile/EditProfile';
import { NewUser } from '../pages/NewUser/NewUser';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/dashboard' element={ <DashBoard /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/edit-profile' element={ <EditProfile /> } />
      <Route path='/new-profile' element={ <NewUser /> } />
      <Route path='' element={ <Navigate to="/dashboard" /> } />
      <Route path='*' element={<Navigate to="/dashboard" />} />
    </Switch>
  </BrowserRouter>
)