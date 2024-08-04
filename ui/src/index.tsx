import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {theme} from "./theme";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATZL0XFrSR-FvEgjX6R1XsnQY7ZLWCbEI",
    authDomain: "devote-ba3e8.firebaseapp.com",
    projectId: "devote-ba3e8",
    storageBucket: "devote-ba3e8.appspot.com",
    messagingSenderId: "712036837399",
    appId: "1:712036837399:web:027636783766a278c7d452",
    measurementId: "G-HS95D1MZW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Notifications/>
                    <App/>
                </QueryClientProvider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
