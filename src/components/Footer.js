import { useAuth } from "./AuthContext"


const Footer = () => {
    const {user, logout} = useAuth();
    return (
        <footer>
            <p>Created by MLSA Unilag x GDSC Unilag</p>
            {
                user && (
                    <button onClick={logout}>Logout</button>
                )
            }
        </footer>
    )
}

export default Footer;