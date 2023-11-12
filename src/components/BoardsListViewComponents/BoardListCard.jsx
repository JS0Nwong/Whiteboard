import React from 'react'
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'

export default function BoardListCard({ data }) {
    const navigate = useNavigate()
    return (
        <>
            <Card sx={{
                background: `rgba(${data.color.replace(/['"]+/g, '')}, 0.15)`,
                border: `1px solid rgb(${data.color})`,
                width: { xs: "100%", md: "200px" },
                mt: { xs: 1, md: 0 },
                mb: { xs: 1, md: 0 },
                m: { md: 1 },
                cursor: 'pointer',
                '&:hover': {
                    background: `rgba(${data.color.replace(/['"]+/g, '')}, 0.35)`,
                },
                '&:first-of-type': {
                    mt: { xs: 2, md: 0 },
                    m: { md: 1 },
                },
            }}
                onClick={() => navigate(`/boards/${data.id}`)}
            >
                <CardContent sx={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Typography
                        fontWeight="600"
                        fontSize="1.3rem"
                        sx={{
                            textOverflow: "ellipsis",
                            maxWidth: '100%',
                            overflow: "hidden"
                        }}
                    >{data.name}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            textOverflow: "ellipsis",
                            maxWidth: '100%',
                            overflow: "hidden",
                            color: "rgba(255, 255, 255, 0.5)"
                        }}
                    >{data.description}
                    </Typography>
                    <Typography
                        variant='caption'
                        sx={{
                            mt: 2,
                            color: "rgba(255, 255, 255, 0.3)"
                        }}>
                        Last Modified: {data.createdAt.slice(0, 9)}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}
