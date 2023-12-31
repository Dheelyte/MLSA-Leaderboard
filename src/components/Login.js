import { useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import axios from 'axios'


const Login = ({ toggleLogin, handleLoginSuccess, signupSuccessMessage  }) => {    
    const { login } = useAuth();

    const BASE_URL = 'https://leaderboard.acel.dev/'

    const modalBackgroundRef = useRef();

    const [formErrors, setFormErrors] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBackgroundClick = (e) => {
        if (modalBackgroundRef.current === e.target) {
            // Only hide the modal when clicking on the modal background
            toggleLogin();
          }
    };

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
            const response = await axios.post(BASE_URL + 'api/v1/users/token/', {
                username: formData.username,
                password: formData.password,
            });
            console.log(response.data);
            setIsSubmitting(false);
            login(response.data);
            handleLoginSuccess();
        } catch(error) {
            setIsSubmitting(false);
            error.response && setFormErrors(error.response.data);
            error.response && console.log(error.response.data);
        }
    }


    return (
        <div className="modal-bg" ref={modalBackgroundRef} onClick={handleBackgroundClick}>
            <div className="modal">
                <div className="modal-header">
                    <p>Login</p>
                </div>
                <div className="modal-body">
                {
                    signupSuccessMessage && (
                        <div className="success-message">
                            {signupSuccessMessage}
                        </div>
                    )
                }
                <form onSubmit={handleLogin} className="form-container"> 
                        {
                            formErrors &&
                            <div className="error">{formErrors["detail"]}</div>
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
