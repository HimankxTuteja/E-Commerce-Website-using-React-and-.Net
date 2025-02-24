//import * as React from 'react';
import Avatar from '@mui/material/Avatar';
//import LoadingButton from '@mui/material/Button';
//import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { Alert, AlertTitle, List, ListItem, ListItemText, Paper } from '@mui/material';
//import { FieldValues } from 'react-hook-form';
//import agent from '../../app/api/agent';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
//import { useAppDispatch } from '../../app/store/configureStore';
//import { signInUser } from './accountSlice';
import agent from '../../app/api/agent';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';
//import { useState } from 'react';

//import { useState } from 'react';
//import agent from '../../app/api/agent';

/*function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}*/

// TODO remove, this demo shouldn't need to reset the theme.


export default function Register() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { register, handleSubmit, setError ,formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleApiErrors(errors) {
        if (errors) {
            errors.forEach((error) => {
                if (error.includes('Password')) {
                    setError('password', { message: error });
                } else if (error.includes('Email')) {
                    setError('email', { message: error });
                } else if (error.includes('Username')) {
                    setError('username', { message: error });
                }
            });
        }
    }
    

    return (
        
            <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" 
                onSubmit={handleSubmit(data => 
                    agent.Account.register(data)
                    .then(() => {
                        toast.success('Registration successful - you can now login');
                        navigate('/login');
                    })
                    .catch(error => handleApiErrors(error)))}
                 noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        autoFocus
                        {...register('username', {required: 'Username is required'})}
                        error={!!errors.username}
                        helperText={errors?.username?.message as string}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email address"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                // eslint-disable-next-line no-useless-escape
                                value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                                message: 'Not a valid email address'
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors?.email?.message as string}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password', {
                            required: 'password is required',
                            pattern: {
                                value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                message: 'password does not meet complexity requirements'
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}
                    />
            
                      <LoadingButton loading = {isSubmitting}
                      disabled={!isValid}
                      type="submit" 
                      fullWidth variant="contained" sx={{ mt: 3, mb: 2}}
                      >
                       Register
                    </LoadingButton>
                    <Grid container>

                        <Grid item>
                            <Link to='/login'>
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        
    );
}


