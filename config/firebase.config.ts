import { initializeApp } from "firebase/app";
    import { initializeAuth } from 'firebase/auth';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { getReactNativePersistence } from "@firebase/auth";
    import Constants from 'expo-constants';

    const firebaseConfig = {
        apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
        authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
        projectId: Constants.expoConfig?.extra?.firebaseProjectId,
        storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
        messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
        appId: Constants.expoConfig?.extra?.firebaseAppId
    };

    const app = initializeApp(firebaseConfig);

    export const auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });