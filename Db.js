
import { initializeApp,getApps } from 'firebase/app';
import {getDatabase,ref,onValue,set  } from "firebase/database";
import * as React from "react";

export default function Db(){
    const firebaseConfig = {
      apiKey: "AIzaSyDd0WcW6uhPXTOCYLOd1JkzpOxqOqpvjzc",
      authDomain: "mobileappproject-a26eb.firebaseapp.com",
      databaseURL: "https://mobileappproject-a26eb-default-rtdb.firebaseio.com",
      projectId: "mobileappproject-a26eb",
      storageBucket: "mobileappproject-a26eb.appspot.com",
      messagingSenderId: "435160651175",
      appId: "1:435160651175:web:8386852e52d7b6c5df1282",
      measurementId: "G-2TTJTTL522"
    };
    
    
    React.useEffect(()=>{
      if(!getApps.length){
        initializeApp(firebaseConfig)
      }
      
       
    },[])

    return(null);
  }