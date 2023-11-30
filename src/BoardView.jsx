import { useCallback, useState, useMemo, useEffect } from 'react'
import useFirebaseHooks from './utils/firebaseHooks'
import useStore from './store'
import { useNavigate, useParams } from 'react-router-dom'

import Board from './components/BoardComponents/Board'
import Menubar from './components/BoardComponents/Menubar'
import Searchbar from './components/BoardComponents/Searchbar'
import List from './components/BoardComponents/List'

import {
    doc,
    onSnapshot
} from "firebase/firestore";
import { db } from "../src/firebase";
import { getAuth } from "firebase/auth";

import BoardLoading from "./components/LoadingComponents/BoardLoading"

export default function BoardView() {
    const navigate = useNavigate()
    const [boardData, setBoardData] = useState(null)
    const [orderBy, setOrderBy] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState(null)
    const [toggleListView, setToggleListView] = useState(false)
    const [labels, setLabels] = useState(null)
    // get current user
    const {
        currentUser: { uid },
    } = getAuth();

    // Gets board id from URL params
    const { id } = useParams();

    const { boards, areBoardsFetched, setData } = useStore()

    // Gets boards from global state and filters to find the selected board 
    const board = useMemo(() => boards.find((board) => board.id === id), [])
    const boardsData = useMemo(() => boardData, [boardData])

    useEffect(() => {
        const docRef = doc(db, `users/${uid}/boardsData/${id}`)
        onSnapshot(docRef, (doc) => {
            const { columns, lastUpdated, orderBy, labels } = doc.data()

            setBoardData(columns);
            setOrderBy(orderBy)
            setLabels(labels)
            //   setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));
            setLoading(false)

            setData(columns)
            const rows = []

            orderBy.map((key, index) => {
                columns[key].tasks.map((task, index) => {
                    Object.assign(task, {
                        ...task,
                        status: key,
                        associatedColor: columns[key].columnColor
                    })
                    rows.push(task)
                })
            })
            setListData(rows)
        })
    }, [])

    if (!board) return null
    if (loading) return <BoardLoading />
    if (!boardData) return setLoading(true)

    return (
        <>
            <div style={{
                height: "100dvh",
                display: "flex",
                flexDirection: 'column',
                minWidth: "100%",
            }}>
                <Menubar
                    data={board}
                    lastUpdated={lastUpdated}
                    setToggleListView={() => setToggleListView(!toggleListView)}
                />
                {toggleListView ?
                    <List
                        data={listData}
                        orderBy={orderBy}
                        id={id}
                        labels={labels}
                    />
                    :
                    <Board
                        columns={boardsData}
                        orderBy={orderBy}
                        id={id}
                        lastUpdated={lastUpdated}
                        labels={labels}
                    />
                }
            </div>
        </>
    )
}
