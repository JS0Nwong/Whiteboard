// For async operations 
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  getDoc,
  setDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const useFirebaseHooks = () => {
  const navigate = useNavigate();
  const {
    currentUser: { uid },
  } = getAuth();

  const boardColRef = collection(db, `users/${uid}/boards`);
  const { addBoard, boards, setBoards } = useStore()

  const createBoard = async ({ name, color, description }) => {
    try {
      const boardDoc = await addDoc(boardColRef, {
        name,
        color,
        description,
        createdAt: serverTimestamp(),
      })

      addBoard({
        name, 
        color,
        description,
        createdAt: new Date().toLocaleString('en-US'),
        id: boardDoc.id
      })
    }
    catch(error) {
      console.log(error)
    }
  };

  const deleteBoard = async (id) => {
    try {
      const docRef =  doc(db, `users/${uid}/boards/${id}`)
      await deleteDoc(docRef)

      const tBoards = boards.filter((board) => board.id !== id);
      setBoards(tBoards);
    }
    catch (error) { 
      throw error
    }

  };

  const getBoards = async(setLoading) => {
    try {
      const q = query(boardColRef, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString('en-US')
      }))

      setBoards(boards)
    }
    catch(error) {
      console.log(error)
    }
    finally {
      if (setLoading) setLoading(false)
    }
  };

  const getBoard = async(id) => {
    const docRef = doc(db, `users/${uid}/boardsData/${id}`)
    try {
      const doc = await getDoc(docRef)
      if(doc.exists) {
        return doc.data()
      }
      else return null
    }
    catch(error) {
      throw error
    }
  };

  const updateBoard = async(id, tasks) => {
    const docRef = doc(db, `users/${uid}/boardsData/${id}`)
    try {
      await updateDoc(docRef, {
        columns: {
          ...tasks
        }, 
        lastUpdated: serverTimestamp(),
      })
    }
    catch(error) {
      throw error
    }
  };

  const updateColumnKeys = async(id, keys) => {
    const docRef = doc(db, `users/${uid}/boardsData/${id}`)
    try {
      await updateDoc(docRef, {
        orderBy: keys,
      })
    }
    catch(error) {
      throw error
    }
  };


  return { createBoard, deleteBoard, getBoard, getBoards, updateBoard, updateColumnKeys };
};

export default useFirebaseHooks;
