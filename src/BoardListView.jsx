import { useEffect, useState, useContext } from 'react'

import { Box } from '@mui/material'

import BoardListCard from './components/BoardsListViewComponents/BoardListCard'
import CreateBoard from './components/BoardsListViewComponents/CreateBoard'

import useStore from './store'
import useFirebaseHooks from "./utils/firebaseHooks"
import { ThemeContext } from './utils/useTheme'

export default function BoardListView() {
    const [loading, setLoading] = useState(true)
    const { getBoards } = useFirebaseHooks()
    const { boards, areBoardsFetched } = useStore()

    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if (!areBoardsFetched) getBoards(setLoading)
        else setLoading(false)
    }, [])

    return (
        <>
            <Box sx={{
                height: "100vh",
                background: theme === true ? 'rgb(23 23 23)' : 'rgb(229 229 229)'

            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: 'row' },
                    m: { xs: 1, md: 0 },
                    flexWrap: 'wrap',
                }}>
                    <CreateBoard />
                    {boards.map((board, index) => (
                        <BoardListCard data={board} key={board.id} id={board.id} />
                    ))}
                </Box>
            </Box>
        </>
    )
}
