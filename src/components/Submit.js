import axios from "axios";
import { useState } from "react";
import { useAuth } from "./AuthContext";

const Submit = ({ handleSubmitSuccess, handleError, setUpdateKey }) => {
    const { user } = useAuth();

    const [link, setLink] = useState("");
    const [showSubmit, setShowSubmit] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const BASE_URL = 'https://mlsa-leaderboard-api.azurewebsites.net/'

    const handleLinkChange = (e) => {
        setLink(e.target.value)
    }

    const submitLink = async () => {
        setIsSubmitting(true);
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
            setShowSubmit(false)
            handleSubmitSuccess();
            const updateRankResponse = await axios.get(BASE_URL + 'api/v1/leaderboard/me/', {
                headers: {
                    'Authorization': `Bearer ${user.access}`
                }
            });
            const storedUser = JSON.parse(localStorage.getItem('mlsa_leaderboard_user'));
            storedUser.user.rank = updateRankResponse.data.rank;
            storedUser.user.total_points = updateRankResponse.data.total_points
            localStorage.setItem('mlsa_leaderboard_user', JSON.stringify(storedUser));
            setUpdateKey(prev => prev + 1)
        } catch(error) {
            setIsSubmitting(false);
            error.response ? handleError(error.response.data.pr_link) : handleError(["An error occurred"]);
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