
import { createContext } from "react";

const AuthContext = createContext();

export default AuthContext = ({ children }) => {
    const[isloggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isloggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );




};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};