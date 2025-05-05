import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { Link } from "react-router-dom";

export default function SearchResults() {

  //States for filtering options
  const [sortBy, setSortBy] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [contentType, setContentType] = useState("");
  const [postedBy, setPostedBy] = useState("");

  // Reset filter values to blank
  const resetFilters = () => {
    setSortBy("");
    setDatePosted("");
    setContentType("");
    setPostedBy("");
  };

  //For "Results for _________"
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q"); // ✅ Get search term from URL


  const [results, setResults] = useState([]);

  //filter results
  const filteredResults = results
    .filter((post) => {
      // Content Type
      if (contentType && post.post_type !== contentType) return false;

      // Posted By 
      if (postedBy) {
        if (postedBy === "student" && post.user_type !== "student_alumni") return false;
        if (postedBy === "alumni" && post.user_type !== "student_alumni") return false;
        if (postedBy === "employer" && post.user_type !== "organization_member") return false;
      }

      // Date posted 
      if (datePosted && post.created_at) {
        const postDate = new Date(post.created_at);
        const now = new Date();

        if (datePosted === "24hours" && now - postDate > 86400000) return false;
        if (datePosted === "week" && now - postDate > 7 * 86400000) return false;
        if (datePosted === "month" && now - postDate > 30 * 86400000) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "alphabet") return a.title.localeCompare(b.title);
      if (sortBy === "latest" && a.created_at && b.created_at)
        return new Date(b.created_at) - new Date(a.created_at);
      return 0;
    });


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get(`/post/searchPosts?q=${searchQuery}`);
        setResults(res.data.rows);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);

//for timestamps
  const getTimeAgo = (timestamp) => {
    const postDate = new Date(timestamp);
    const now = new Date();
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
  
    if (diffHours < 1) {
      return `Posted ${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 1) {
      return `Posted ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
      return `Posted ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return `Posted ${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
    }
  };


  return (
    <div className="flex flex-col justify-center items-center mt-28">

      {/***********************************************************Filter Options *********************************************************************/}
      <div className="bg-gray-500 p-4 rounded-xs shadow-md mb-6 w-9/10 h-15">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">



          {/**************************************************Sort By **********************************************************/}
          <select
            className="bg-gray-400 h-8 p-1.5 focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="" hidden>Sort By</option>
            <option value="latest">Latest</option>
            <option value="relevancy">Relevance</option>
            <option value="alphabet">Alphabet</option>
          </select>



          {/**************************************************Date Posted**********************************************************/}
          <select
            className="bg-gray-400 h-8 p-1.5 focus:ring-2 focus:ring-blue-500"
            value={datePosted}
            onChange={(e) => setDatePosted(e.target.value)}
          >
            <option value="" hidden>Date Posted</option>
            <option value="24hours">Past 24 Hours</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="custom">Custom Range</option>
          </select>



          {/**************************************************Content Type **********************************************************/}
          <select
            className="bg-gray-400 h-8 p-1.5 focus:ring-2 focus:ring-blue-500"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="" hidden>Content Type</option>
            <option value="job">Job Posting</option>
            <option value="general">General Post</option>
          </select>



          {/**************************************************Posted By **********************************************************/}
          <select
            className="bg-gray-400 h-8 p-1.5 focus:ring-2 focus:ring-blue-500"
            value={postedBy}
            onChange={(e) => setPostedBy(e.target.value)}
          >
            <option value="" hidden>Posted By</option>
            <option value="student">Student/Alumni</option>
            <option value="employer">Employer</option>
          </select>



          {/*************************************************Reset Filters Button *************************************************/}
          <button className="bg-yellow-500 text-white p-1.5 rounded-md ml-auto w-25" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>




      {/******************************************************Results for ___________************************************************/}
      <div>
        <h3 className="text-gray-950 text-3xl">
          Results for: <span className="text-yellow-500">"{searchQuery}"</span>
        </h3>
      </div>



      {/*************************************************************Results**************************************************************/}
      <div className="mt-3 text-left text-gray-600 bg-gray-50 border rounded-lg p-4 h-[70vh] overflow-y-auto w-7/8 shadow-md">

        {filteredResults.length > 0 ? (
          filteredResults.map((post, index) => (
            <div key={post.post_id || index} className="p-2 border-b">

              <p className="text-sm text-right text-gray-500/50">{getTimeAgo(post.created_at)}</p>

              <Link to={`/otherProfiles/${post.user_id}?highlight=${post.post_id}`}>
                {post.title}
              </Link>

              

              <p className="text-sm text-gray-500">{post.content}</p>
              <p className="text-xs italic">
                Posted by: {post.firstName} {post.lastName}
                {post.organization_name ? ` | Org: ${post.organization_name}` : ""}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No results found.</p>
        )}

      </div>



    </div>
  );
}