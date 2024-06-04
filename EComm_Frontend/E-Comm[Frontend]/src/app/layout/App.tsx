import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { Container,CssBaseline, ThemeProvider, createTheme } from "@mui/material";
//import Catalog from "../../features/catalog/Catalog";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import { useStoreContext } from "../context/StoreContext";
//import { getCookie } from "../util/Util";
//import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import {fetchBasketAsync} from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";


function App() {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    }catch(error){
      console.log(error);
    }
  }, [dispatch])
   
 
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initApp().then(() => setLoading(false));
  }, [initApp])
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  
 
   return (
    <ThemeProvider theme={theme} >
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
    <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      {loading ?  <LoadingComponent message="Initialising app..." /> 
       : location.pathname === '/' ? <HomePage />
       :<Container sx={{mt: 4}}>
       <Outlet />
       </Container>
    }
      
    </ThemeProvider>
  );
}

export default App
