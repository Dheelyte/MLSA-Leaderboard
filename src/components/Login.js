import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from 'axios'


const Login = () => {    
    const { login } = useAuth();

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };    

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsSubmitting(true)
        try {
            const response = await axios.post('user/login/', {
                username: formData.username,
                password: formData.password,
            });
            console.log(response.data);
            setIsSubmitting(false);
            setIsSubmitted(true)
            login(response.data);
        } catch(error) {
            setIsSubmitting(false);
            error.response && setFormErrors(error.response.data);
            error.response && console.log(error.response.data);
        }
    }

    useEffect(() => {
        if (isSubmitted) {
            
        }
    }, [isSubmitted]);


    return (
        <div className="modal-bg" id="modal-bg">
            <div className="modal">
                <div className="modal-header">
                    <p>Login</p>
                </div>
                <div className="modal-body">
                <form onSubmit={handleLogin} className="form-container"> 
                        {
                            Object.keys(formErrors).length !== 0 &&
                            <div className="error">{formErrors["error"]}</div>
                        }
                        <div className="input-container">
                            <label>Username </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className="button-container">
                            {
                                isSubmitting ? (
                                    <button type="submit" disabled>
                                        Loading...
                                    </button>
                                ) : (
                                    <button type="submit" >
                                        Log In
                                    </button>
                                )
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default Login;