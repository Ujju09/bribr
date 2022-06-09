/** @format */

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Spacer, Input, Button, Modal, Text } from "@nextui-org/react";
import StatesDropDown from "../components/StatesDropDown";
import DepartmentDropDown from "../components/DepartmentDropDown";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { collection, addDoc, setDoc, getDoc } from "firebase/firestore";
import { lazy, Suspense } from "react";

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
  const [myBribe, setMyBribe] = useState(0);
  const [visible, setVisible] = useState(false);
  const [copy, setCopy] = useState(false);
  const handler = async () => {
    await addData(myBribe).then(() => {
      setVisible(true);
    });
  };

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const ButtonComponent = () => {
    return (
      <div>
        <Button size="xl" onClick={handler}>
          I paid bribe.
        </Button>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              You paid:
              <Text b size={18}>
                ₹{myBribe} as bribe.
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              Share it with your friends and family. Lets see how much do
              Indians bribe to get their work done.
              <ul>
                <li>No information about you is stored anywhere.</li>
                <li>This is just for research purpose.</li>
              </ul>
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                setCopy(true);
                navigator.clipboard.writeText(
                  `I paid bribe. Let's find out how much bribe does india pays. https://bribr.vercel.app/ .Currently the total bribe is ₹${bribe} !`.trimStart()
                );
              }}
            >
              {copy === false ? "Share" : "Copied"}
            </Button>
            <Button auto flat color="error" onClick={closeHandler}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const addData = async () => {
    const totalBribe = parseInt(bribe) + parseInt(myBribe);
    try {
      await setDoc(doc(db, "data", "start"), {
        bribe: totalBribe,
      });
      console.log("Document written with ID: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getData = async () => {
    try {
      const docRef = onSnapshot(doc(db, "data", "start"), (doc) => {
        setBribe(doc.data().bribe);
      });
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Bribr</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="image" href="/favicon-16x16.png" />
        <link rel="image" href="/favicon-32x32.png" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bribe is a simple tool to find out how much bribe does india pays."
        />
        <meta
          name="keywords"
          content="bribe, india, indian, pay, how much, how much does india pay"
        />
        <meta name="author" content="Bribr" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="en" />
      </Head>
      <main className={styles.main}>
        <label>Total Bribe Amount:</label>
        <Suspense fallback={<div>Loading...</div>}>
          <h1>₹ {bribe}</h1>
        </Suspense>
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
          size="xl"
          placeholder="You paid ₹"
          type="number"
          onChange={(e) => setMyBribe(e.target.value)}
        />
        <Spacer />
        {/* <Button size="lg" variant="primary" onPress={(e) => addData()}>
          I paid bribe!!
        </Button> */}
        <ButtonComponent />
      </main>
    </div>
  );
}
