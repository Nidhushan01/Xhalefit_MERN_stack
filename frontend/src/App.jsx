import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import SurveyForm from './components/surveyForm/SurveyForm';
import PostList from './practice/pagination/components/PostList';
import OTPPage from './pages/auth/OTPPage';
import GoogleCalendarEmbed from './practice/calender/EmbedGoogleCalender';
import Background from './components/Background';
import ChangePassword from './pages/auth/ChangePassword';
import ProfileUser from './pages/dashboard/ProfileUser';
import ProfileTrainer from './pages/dashboard/ProfileTrainer';
import CustomizePlan from './components/CustomizePlan/CustomizePlan';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import TrainerDashboard from './pages/dashboard/TrainerDashboard';
import TrainerToApprove from './pages/auth/TrainerToApprove';
import LandingPage from './pages/LandingPage';
import Header from './components/Header';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AssignWorkout from './pages/dashboard/AssignWorkout';
import TrainerRejectedPage from './pages/auth/TrainerRejectedPage';
import About from './components/navigation/About';
import Contact from './components/navigation/Contact';
import Services from './components/navigation/Services';
import Features from './components/navigation/Features';
import AlreadyAssigned from './pages/dashboard/AlreadyAssigned';

function App() {

  return (
    <>
      <Background>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path="/pagination" element={<PostList />} />
          <Route path="/verify-otp" element={<OTPPage />} />
          <Route path="/calender" element={<GoogleCalendarEmbed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/surveyform" element={<SurveyForm />} />
          <Route path="/userprofile" element={<ProfileUser />} />
          <Route path="/trainerprofile" element={<ProfileTrainer />} />
          <Route path="/customize" element={<CustomizePlan />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/trainerToApprove" element={<TrainerToApprove />} />
          <Route path='/header' element={<Header />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path="/assign-workout/:surveyId" element={<AssignWorkout />} />
          <Route path="/rejected" element={<TrainerRejectedPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features" element={<Features />} />
          <Route path="/already-assigned/:surveyId" element={<AlreadyAssigned />} />




          {/* Protected Dashboard Route */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </Background>
    </>
  );
};

export default App;