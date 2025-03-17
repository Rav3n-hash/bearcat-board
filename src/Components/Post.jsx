export default function Post({ user, time, postImg, content }) {
  return(
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xl mx-auto border border-gray-300">
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <img
          src={user.image}
          alt="User Avatar"
          className="w-12 max-h-12 object-cover  border border-gray-400"
        />
        <div>
          <h3 className="font-semibold text-left text-blue-500">{user.name}</h3>
          <p className="text-sm text-left text-gray-500">{user.role}</p>
        </div>
      </div>

      {/* Post Time */}
      <div className="text-xs text-gray-500 mt-2">{time}</div>

       {/* Post Image (if applicable) */}
       <div className="flex items-center justify-center space-x-3">
        <img
          src={postImg}
          alt="User Avatar"
          className="w-100 max-h-100 border-2 border-blue-400 p-1"
        />
        </div>

      {/* Post Content */}
      <div className="mt-3">
        <p className="text-gray-800">{content}</p>
      </div>
    </div>
  );

}