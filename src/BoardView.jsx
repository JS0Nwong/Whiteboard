import { useCallback, useState, useMemo, useEffect } from 'react'
import useFirebaseHooks from './utils/firebaseHooks'
import useStore from './store'
import { useNavigate, useParams } from 'react-router-dom'

import Board from './components/BoardComponents/Board'
import Menubar from './components/BoardComponents/Menubar'

import {
    doc,
    onSnapshot
} from "firebase/firestore";
import { db } from "../src/firebase";
import { getAuth } from "firebase/auth";

import useBoard from "./utils/useBoard"

export default function BoardView() {
    const navigate = useNavigate()
    const [boardData, setBoardData] = useState(null)
    const [orderBy, setOrderBy] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)
    const [loading, setLoading] = useState(true)
    const {
        currentUser: { uid },
      } = getAuth();

    // Gets board id from URL params
    const { id } = useParams();

    const { getBoard, deleteBoard } = useFirebaseHooks()
    const { boards, areBoardsFetched } = useStore()

    // Gets boards from global state and filters to find the selected board 
    const board = useMemo(() => boards.find((board) => board.id === id), [])
    const boardsData = useMemo(() => boardData, [boardData])

    const {initialData, setInitialData, lastUpdatedTimestamp} = useBoard(uid, id)

    useEffect(() => {
        const docRef = doc(db, `users/${uid}/boardsData/${id}`)
        onSnapshot(docRef, (doc) => {
          const {columns, lastUpdated, orderBy} = doc.data()
          
          setBoardData(columns);
          setOrderBy(orderBy)
        //   setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));
          setLoading(false)
        })
    }, [])

    if (!board) return null
    if (loading) return <></>
    if (!boardData) setLoading(true)

    return (
        <>
            <div style={{
                height: "100dvh",
                display: "flex",
                flexDirection: 'column',
                minWidth: "100%"
            }}>
                <Menubar 
                    data={board} 
                    lastUpdated={lastUpdated}
                />
                <Board
                    columns={boardsData}
                    orderBy={orderBy}
                    id={id}
                    lastUpdated={lastUpdated}
                />
            </div>
        </>
    )
}
