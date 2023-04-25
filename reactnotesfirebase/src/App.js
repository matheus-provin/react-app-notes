
import './App.css';
import { AppRoutes } from './routes/routes';
import { AuthGoogleProvider } from './context/authGoogle';

function App() {
  return (
    
      <AuthGoogleProvider>
        <AppRoutes/>
      </AuthGoogleProvider>
    
  );
}

export default App;
