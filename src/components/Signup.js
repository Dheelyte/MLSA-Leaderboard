import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const renderErrorMessage = (name) =>
        formErrors[name] && (
        <div className="error">{formErrors[name].join(", ")}</div>
    );
    

    const handleSignup = async (event) => {
        event.preventDefault();
        setIsSubmitting(true)
        try {

            const response = await axios.post('user/signup/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            console.log(response.data);
            setIsSubmitting(false);
            setIsSubmitted(true)
        } catch(error) {
            setFormErrors(error.response.data);
            console.log(error.response.data)
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (isSubmitted) {
            
        }
    }, [isSubmitted]);
    
    return (
        <div class="modal-bg">
            <div class="modal">
                <div class="modal-header">
                    <p>Sign Up</p>
                </div>
                <div class="modal-body">
                <form onSubmit={handleSignup} className="form-container">
                        <div className="input-container">
                            <label>Username </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                            {renderErrorMessage("username")}
                        </div>
                        <div className="input-container">
                            <label>Email </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required />
                            {renderErrorMessage("email")}
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required />
                            {renderErrorMessage("password")}
                        </div>
                        <div className="button-container">
                            {
                                isSubmitting ? (
                                    <button type="submit" disabled>
                                        Loading...
                                    </button>
                                ) : (
                                    <button type="submit" >
                                        Sign Up
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

export default Signup;