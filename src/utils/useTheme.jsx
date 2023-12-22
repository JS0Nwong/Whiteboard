import { useEffect, useState, createContext, useMemo } from "react";
import { useTheme, createTheme, ThemeProvider } from '@mui/material'

const ThemeContext = createContext(true);

const DarkThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(true)

    const defaultTheme = useMemo(() => createTheme({
        palette: {
            theme,
            ...(theme === true) ? {
                background: {
                    default: 'rgb(229 229 229)',
                    secondary: 'rgb(17 17 17)'
                },
                text: {
                    primary: 'rgb(255 255 255)',
                    secondary: 'rgba(255, 255, 255, 0.4)',
                },
                borderColor: {
                    default: '#555'
                }
            } :
                {
                    background: {
                        default: 'rgb(23 23 23)',
                        secondary: 'rgb(17 17 17)'
                    },
                    text: {
                        primary: 'rgb(23 23 23)',
                        secondary: 'rgba(255, 255, 255, 0.4)',
                    },
                    borderColor: {
                        default: 'rgba(229, 229, 229, 0.25)'
                    }
                }
        },
        typography: {
            fontFamily: "Poppins, sans-serif"
        },
        borders: {
            theme,
            ...(theme === true ? {
                border: "1px solid rgb(64 64 64)"
            } :
                {
                    border: '1px solid orange'
                })
        }
    }), [theme])

    const toggleTheme = () => {
        setTheme(!theme)
        localStorage.setItem('theme', !theme)
    }

    useEffect(() => {
        if (window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches &&
            !window.localStorage.getItem('theme')) {
            setTheme(true)
        }
        else {
            if(window.localStorage.getItem('theme') !== null) {
                window.localStorage.getItem('theme') === 'true' ?
                setTheme(true) : 
                setTheme(false)
            }
        }
    }, [])

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >
            <ThemeProvider theme={defaultTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export { ThemeContext, DarkThemeProvider };