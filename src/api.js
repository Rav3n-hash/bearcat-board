import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.PROD ? "https://bearcat-exp.vercel.app" : "http://localhost:8000", // Change this to your backend URL
    withCredentials: true, // Allows sending cookies (for refresh token)
});

if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
}


// Track whether the refresh token request is in progress
let isRefreshing = false;
let refreshSubscribers = [];

api.interceptors.response.use(
    (response) => response, // If the response is fine, just return it
    async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
	    if (!isRefreshing) {
                isRefreshing = true;
	            console.log("error");
                try {

                    // Call refresh endpoint
                    const refreshResponse = await api.post(
                        "/auth/refresh-token",
                        {},
                        { withCredentials: true }
                    );

                    console.log("refreshing");

                    const newAccessToken = refreshResponse.data.accessToken;
                    api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                    localStorage.setItem("accessToken", newAccessToken);

                    console.log("Doing access token things");
                
            	    // Retry the original request with the new token
            	    error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            	    return api.request(error.config);
            	} catch (refreshError) {
                    if (!window.location.href.includes("/login")) { 
                        console.error("Refresh token failed" + window.location.href + " ", refreshError);
                        window.location.href = "/login"; // Redirect to login if refresh fails
                        return Promise.reject(refreshError);
                    }
            	}
            }
	    }
        return Promise.reject(error);
    }
);



export default api;
