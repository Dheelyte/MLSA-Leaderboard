import axios from "axios";
import { useState } from "react";
import { useAuth } from "./AuthContext";

const Submit = ({ handleSubmitSuccess, handleError }) => {
    const { user } = useAuth();

    const [link, setLink] = useState("");
    const [showSubmit, setShowSubmit] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const BASE_URL = 'https://mlsa-leaderboard-api.azurewebsites.net/'

    const handleLinkChange = (e) => {
        setLink(e.value)
    }

    const submitLink = async () => {
        try {
            const response = await axios.post(BASE_URL + 'api/v1/leaderboard/submit/', {
                pr_link: link
            }, {
                headers: {
                    'Authorization': `Bearer ${user.access}`
                }
            });
            console.log(response.data);
            setIsSubmitting(false);
            handleSubmitSuccess();
        } catch(error) {
            setIsSubmitting(false);
            handleError(error.data.pr_link);
            //handleError(["An error occurred"])
        }
    }

    return (
        <div className="submit-container">
            {
                user && !showSubmit && (
                <button onClick={()=>{setShowSubmit(true)}} className="submit">Submit Pull Request</button>
            )}
            {showSubmit && (
                <>
                    <input onChange={handleLinkChange} type="text" value={link} />
                    <button onClick={submitLink} className="submit-link">
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </>
            )}
        </div>
    )
    
}

export default Submit;