import { FaThumbsUp } from "react-icons/fa"
import { FiMessageCircle } from "react-icons/fi"


const PopularBlog = () => {
  const blogs = [
    {
      title: "My amazing blog title-1",
     author:"Ram thapa",
     likes:100,
     comments:50
    },
    
    {
      title: "My amazing blog title-1",
     author:"Ram thapa",
     likes:100,
     comments:50
    },
    {
      title: "My amazing blog title-2",
     author:"Sita Shahi",
     likes:110,
     comments:55
    },
    {
      title: "My amazing blog title-3",
     author:"Jordan Deo",
     likes:130,
     comments:57
    }
  ]
  return (
    <div className="w-[23rem] bg-white p-5 mt-4 border ml-5 rounded">
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {blogs.map((blog,index)=>(
          <li key={index} className="mb-4">
            <div className="flex items-center justify-between">
              <span className="font-bold mb-2">{blog.title}</span>
            </div>
            <span className="text-gray-600">Publish by: {blog.author}</span>
            <div className="flex items-center mt-2 ">
              <FiMessageCircle size={16}/>
              <span className="text-gray-500  mr-5 ml-1 ">{blog.comments}</span>

              <FaThumbsUp size={16}/>
              <span className="text-gray-500 mr-2 ml-2">{blog.likes}</span>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default PopularBlog