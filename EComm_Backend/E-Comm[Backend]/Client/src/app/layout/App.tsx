import { Container, CssBaseline} from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";

import Header from "./Header";
import { useCallback, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBaskeyAsync} from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";



function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);


  const initApp = useCallback(async () => {
    try{
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBaskeyAsync());
    }catch(error){
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  },[initApp])


  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message="Initialising app..."/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChage={handleThemeChange} />
      <Container>
        <Outlet /> 
      </Container>
    </ThemeProvider>
  );
}


export default App;
