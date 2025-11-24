import React from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, excerpt, isPublished } = blog;
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext(); 

  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>

      <td className="px-2 py-4">{title}</td>

      {/* optional excerpt column (hidden on small screens) */}
      <td className="px-2 py-4 max-sm:hidden">{excerpt ?? "-"}</td>

      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>

      <td className="px-2 py-4 max-sm:hidden">
        <p className={`${isPublished ? "text-green-600" : "text-orange-700"}`}>
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>

      <td className="px-2 py-4 flex items-center text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>

        <img
          src="https://th.bing.com/th/id/OIP._gjXZ8j5S8MZlexahsJxDgHaHv?w=197&h=206&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
          alt="delete icon"
          className="w-6 hover:scale-110 transition-all cursor-pointer"
          onClick={deleteBlog}
          title="Delete blog"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
