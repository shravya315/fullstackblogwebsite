import React from 'react'

const BlogTableItem = ({blog, fetchBlogs, index}) => {
    const {title, createdAt} = blog;
    const BlogDate= new Date(createdAt)
  return (
    <tr className='border-y border-gray-300'>
        <th className='px-2 py-4'>{index}</th>
        <td className='px-2 py-4'>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
                <td className='px-2 py-4 max-sm:hidden'>
                    <p className={`${blog. isPublished ? "text-green-600" : "text-orange-700"}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
                </td>
                <td className='px-2 py-4 flex text-xs gap-3'>
                    <button className='border px-2 py-0.5 mt-1 rounded cursor-pointed'>{blog.isPublished ? 'Unpublished' : 'Published'}</button>
                    <img src="https://th.bing.com/th/id/OIP._gjXZ8j5S8MZlexahsJxDgHaHv?w=197&h=206&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" alt="cross icon" className='w-6 hover:scale-110 transition-all cursor-pointer' />
                </td>
    </tr>
  )
}

export default BlogTableItem
