import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react"; 
import axios from "axios";

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

useEffect(() => {
  const fetchResults = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/post/searchPosts?q=${searchQuery}`);
      setResults(res.data.rows);
    } catch (err) {
      console.error("Failed to fetch search results:", err);
    }
  };

  if (searchQuery) {
    fetchResults();
  }
}, [searchQuery]);


    return (
      <div className="flex flex-col justify-center items-center">

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
                  <option value="user">User Profile</option>
              </select>



            {/**************************************************Posted By **********************************************************/}
              <select
                  className="bg-gray-400 h-8 p-1.5 focus:ring-2 focus:ring-blue-500"
                  value={postedBy}
                  onChange={(e) => setPostedBy(e.target.value)}
              >
                  <option value="" hidden>Posted By</option>
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
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
        <div className="mt-4 text-left text-gray-600 bg-gray-50 border rounded-lg p-4 h-[70vh] overflow-y-auto w-7/8 shadow-md">
                
                {/* Placeholder results to test scrolling */}
                {results.length > 0 ? (
results.map((post, index) => (
    <div key={post.post_id || index} className="p-2 border-b">
      <p className="hover:text-yellow-500 font-semibold">{post.title || "Untitled Post"}</p>
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