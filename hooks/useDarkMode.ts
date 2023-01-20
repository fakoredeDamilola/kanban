import { useEffect, useState } from 'react';
export const useDarkMode = () => {
    const [theme, setTheme] = useState<string>('light');
    const [mountedComponent, setMountedComponent] = useState(false)


    const setMode =( mode:string) => {
        window.localStorage.setItem('theme', mode)
        console.log({mode})
        setTheme(mode)
    };

    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        console.log({localTheme})
        localTheme && setTheme(localTheme)
        setMountedComponent(true)
    }, []);
    return [theme, themeToggler,mountedComponent]
};