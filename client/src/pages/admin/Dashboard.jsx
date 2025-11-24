import React from 'react'
import { useEffect, useState } from 'react';
import { dashboard_data as dashboard_Data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const {axios}= useAppContext()



  const fetchDashboard = async () => {
    try{
      const {data}= await axios.post('/api/admin/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    }catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDashboard()
  },[])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src="data:image/webp;base64,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" alt="dashboard icon" className='w-22 sm:w-10' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>
         <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src="data:image/webp;base64,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" alt="dashboard icon 2" className='w-22 sm:w-10'/>

          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src="https://th.bing.com/th/id/OIP.BMgt6gIMiTwAx2lHs1bswQHaHa?w=172&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" alt="dashboard icon 3" className='w-22 sm:w-10' />

          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>
      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <img src="https://th.bing.com/th/id/OIP.Gtsvg15xWbHXS3y9ZZPr1QHaHa?w=203&h=203&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" alt="dashboard icon4" className='w-22 sm:w-10' />
          <p>Latest Blogs</p>
        </div>
        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                 <th scope='col' className='px-2 py-4'>Blog Title</th>
                  <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                   <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                    <th scope='col' className='px-2 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) =>{
                return  <BlogTableItem key={blog._id} blog={blog}
                fetchBlogs={fetchDashboard} index={index + 1}/>
              })}
            </tbody>
          </table>

        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
