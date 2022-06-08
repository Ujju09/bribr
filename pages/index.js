/** @format */

import Head from "next/head";

import styles from "../styles/Home.module.css";
import { Spacer, Input, Button } from "@nextui-org/react";
import StatesDropDown from "../components/StatesDropDown";
import DepartmentDropDown from "../components/DepartmentDropDown";
import { useState, useEffect } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { collection, addDoc, setDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKADgeYMSFmKtUarWH1eiMwtdpmynbViI",
  authDomain: "bribr-90e0a.firebaseapp.com",
  projectId: "bribr-90e0a",
  storageBucket: "bribr-90e0a.appspot.com",
  messagingSenderId: "776599062647",
  appId: "1:776599062647:web:352724babd822428c79e72",
  measurementId: "G-4J73T0Z9C9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default function Home() {
  const [bribe, setBribe] = useState("");

  const addData = async (myBribe) => {
    try {
      await setDoc(doc(db, "data", "start"), {
        bribe: bribe + myBribe,
      });
      console.log("Document written with ID: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getData = async () => {
    try {
      const docRef = onSnapshot(doc(db, "data", "start"), (doc) => {
        console.log(doc.data());
        setBribe(doc.data().bribe);
      });
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  };
  useEffect(() => {
    getData();
  }, [bribe]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Bribr</title>
      </Head>
      <main className={styles.main}>
        <label>Total Bribe Amount:</label>
        <h1>₹ {bribe}</h1>
        <Spacer size="sm" />
        <h2 className={styles.title}>Bribr</h2>
        <p
          style={{
            fontSize: "1.5rem",
            color: "black",
          }}
        >
          Because we bribe to escape the awful experiences we have at government
          offices and/or with officials.
        </p>
        <Spacer />
        <StatesDropDown />
        <Spacer />
        <DepartmentDropDown />
        <Spacer />
        <Input
          aria-label="How much did you pay ?"
          size="lg"
          placeholder="Kitna Paisa Diya ₹ "
          type="number"
          onChange={(e) => setBribe(e.target.value)}
        />
        <Spacer />
        <Button size="lg" variant="primary" onPress={(e) => addData(bribe)}>
          I have been bribed !!
        </Button>
      </main>
    </div>
  );
}
