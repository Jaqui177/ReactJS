import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('currentUser')));

    const login = (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};