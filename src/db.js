import {useState, useEffect} from 'react'
import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])

    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> (b.date && b.date.seconds) - (a.date && a.date.seconds))
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    
    useEffect(() => {
        const collection = room ? 
            store.collection(coll).where('room','==',room) :
            store.collection(coll)
       
        collection.onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [room])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyBgmLTXxo_rdIkV0mcIThp23sN-iAqeX70",
    authDomain: "chatter-d927b.firebaseapp.com",
    projectId: "chatter-d927b",
    storageBucket: "chatter-d927b.appspot.com",
    messagingSenderId: "4722169895",
    appId: "1:4722169895:web:741dc2f97b26c38f6ad602"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()