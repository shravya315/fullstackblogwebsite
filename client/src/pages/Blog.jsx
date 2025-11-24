import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comment, setComment] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", {
        blogId: id,
      });
      data.success ? setComment(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  if (!data) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="relative">
      {/* Background Gradient */}
      <img
        src={data.gradient || ""}
        alt=""
        className="absolute -top-10 -z-10 opacity-40 w-full"
      />

      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-24 text-gray-600 px-4">
        <p className="text-primary py-2 font-medium">
          Published on {moment(data.createdAt).format("MMMM Do YYYY")}
        </p>

        <h1 className="text-3xl sm:text-5xl font-semibold max-w-3xl mx-auto text-gray-800 leading-snug">
          {data.title}
        </h1>

        <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
          {data.subTitle}
        </p>

        <p className="mt-5 inline-block py-1 px-4 rounded-full border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Nitish
        </p>
      </div>

      {/* Blog Content Section */}
      <div className="mx-auto max-w-4xl mt-10 px-4 sm:px-6">
        {/* Blog Banner */}
        <img
          src={data.image || data.banner || ""}
          alt="Blog"
          className="rounded-3xl w-full object-cover mb-10 shadow-sm"
        />

        {/* Blog Description */}
        <div
          className="prose prose-lg max-w-3xl mx-auto text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto mt-16 px-4">
        <p className="font-semibold text-lg mb-4">
          Comments ({comment.length})
        </p>

        <div className="flex flex-col gap-4">
          {comment.map((item, index) => (
            <div
              key={index}
              className="bg-primary/5 border border-primary/10 p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3 mb-1">
                <img
                  src={item.avatar || ""}
                  alt="user"
                  className="w-7 h-7 rounded-full"
                />
                <p className="font-medium text-gray-700">{item.name}</p>
              </div>

              <p className="text-sm text-gray-600 ml-10">{item.content}</p>

              <p className="text-xs text-gray-400 mt-2 ml-10">
                {moment(item.createdAt).fromNow()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Comment */}
      <div className="max-w-3xl mx-auto mt-12 px-4">
        <p className="font-semibold mb-3 text-lg">Add your comment</p>

        <form onSubmit={addComment} className="flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your Name"
            required
            className="p-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment..."
            className="p-3 border border-gray-300 rounded-lg outline-none h-40 focus:border-primary"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Share Section */}
      <div className="max-w-3xl mx-auto mt-20 px-4 mb-20">
        <p className="font-semibold mb-4 text-lg text-center">
          Share this article on Social Media
        </p>

        <div className="flex gap-4 justify-center">
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
            alt="facebook"
            width={50}
          />
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
            alt="twitter"
            width={50}
          />
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg"
            alt="google"
            width={50}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
