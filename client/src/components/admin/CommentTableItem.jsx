import React from 'react'
import { useAppContext } from "../context/AppContext";




const CommentTableItem = ({comment, fetchComments}) => {
    const {blog, createdAt, _id}= comment;
    const BlogDate= new Date(createdAt);

    const {axios}= useAppContext();

    const approveComment= async()=>{
        try{
            const {data}= await axios.post('/api/admin/approve-comment', {id: _id})
            if(data.success){
                toast.success(data.message)
                fetchComments()
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)

        }
    }


    const deleteComment= async()=>{
        try{
            const confirm= window.confirm('Are you sure you want to delete this commeny?');
            if(!confirm) return;

            const {data}= await axios.post('/api/admin/delete-comment', {id: _id})
            if(data.success){
                toast.success(data.message)
                fetchComments()
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)

        }
    }

  return (
    <tr className='border-y border-gray-300'>
        <td className='px-6 py-4'>
            <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
            <br />
            <br />
            <b className='font-medium text-gray-600'>Name</b> : {comment.name}
            <br />
            <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
        </td>
        <td className='px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleDateString()}
        </td>
        <td className='px-6 py-4'>
            <div>
                {!comment.isApproved ? 
                <img onClick={approveComment} src="data:image/webp;base64,UklGRigFAABXRUJQVlA4IBwFAAAwKQCdASoPAQ8BPp1OpkylpKQiJTSIILATiWlu4XExG/NF85fY7ws9Fn1a/ifKwZ06NewvaP/wG8dEH5C+KjzR7zc67/M/s95lPyn/aewJ/MumB+3fsJ/pH//xVBEhNKrEOmCPIkJpVYh0wR5EhNKrEOmCPIkJpVYY3Pw9VdJUsb8jyJCaVVrKcZrnzAyEv7mP/a+Huxj0k+VMNJSBUPd1Pb4iQmlVaynGa57ZKbYY38lDN1DoTrgpJ1h00fGa57ZKbYY38lDN1W0ORhXHRShLYmPjElDw4fA5cLR1nk38lDN1Y0IT5Flo6qJ41N3VYb7tcshDZLciwh7sWx50D0Mnmp7KZl9Kwbf36se8hEwS5XvGvOmwxv5KGbqx7yHEOqj3d4sD5rBt/fqx7yHTAu7T++4LFvl/Vj3kOmCPIkJpVYh0wR5EhNKrEOmCPIkJpVYhEAD+/mdQABcJn+vSenmDTTNL1G+RbrG71JQN4ole+uATFpmiW4lRk3bxibjQvG93I919Z4TIS7w/k4mtRlW7jFvaxpOlMUCkIP0in4Loh/Sb0s+qPTPKcjlUCjwhPHIrTPPONnT/HDK0Lvllvg15lTnE07FkyNx6rLrFEkLO2fugfb8bStpD9qvp3uPHGcv0+GVvAwKDkY00AaYiV7RPO0mF9YhlwkRfd43nK1kDpjwL5Skyyzu+ReKMXIQouC9b1iBT5NJskz3PIwc7UCCWi+o0Ak8BGH1ROwJeDmMTU3y2avVzQBlFR1f6eU09yke7/Ihw8jxtHX2eaQv0MDc2FK8J5cebLZubzz0FuuB37LeKZH4nwnqa5y9t9MHQALQlTC9WkHPaN+3e3hxWrIEyWIO3fHjB9H+unFCrfHTArqstI0e6p/UeiITU/l+QMxiam+Wpbv0Laih3nRgtuK8KbRAwgbh0rdJk+k4OBc+NzHdHP3/U9SgzdJ4QF7/HePo7BxdR+TVBt61Ix/RzkGLrk9dopeO4B934iifqJuOJQRCvsO4h/O+VrTJw0U0M5+zsf6MIQp4vvg8tCiF1eoxj4bQfH25YSY+4MKWNZeEGpBInjoESlnh9M3O9XiFx7EEF40icU6XEuJpng5mUMSbC7rG71Ie+pi+UpUeT07bi2tWpL1a4MwUVpm25WzKvSsQWKD6h0oLGjuNcJQBGmAuB37LeKXiZ0z8+55bMlNLAKZlqMetXJai+/jGwGsVhZB+S0viMfyfu/+HIdVwf6UziWX6aqM9mFcl2WrTPC3xoK2Pavl6IL3u1Du4NT7mcnAzjbzUtQlwC2ood50YOCMEQ3yq2Pbis2hlUwAQV05UIqkphIv8EG6yeGlXATbWDq226kxKdqKX3TrzN5J5vpDz2pxh/Tcaz14A81w9EFBo2vEu68Op6pfTObnrl3IkU79a1zBnPmwLiae4nqRoxX1zsfqbDV0F6+nfJOkO2P428+CxYYnc1HD6wxherL5M84bdWRj8Pc+CF2QSkOiAqLcCaciPLAhKzpxvxBRwMsPPpgUh/nxFzQ6NTu2X2Xafq226kxKdqKX3TrzN5J5vpDz2pxeJLq6EbucWJNSkUA+yH6diMgO8ajvOkTpi8PXybABghBAHuncB13N5rnOjPaulJz4xNlqxmBqzyCUA5KaWBgAMXsERXatXJaprvGNgGjAasPiGlmkOKssVljb5d2+PPqng2k7uUfByE2jdGfIGkXpX5vlDUOnPKOEelCWqWzctrg9G+o/WKIAAAAAA=" alt='tick icon' className='w-5 hover:scale-110 transition-all cursor-pointer'/> : <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>}
                <img onClick={deleteComment} src="https://static.vecteezy.com/system/resources/previews/020/810/217/original/trash-bin-icon-design-free-vector.jpg" alt="bin icon" className='w-5 hover:scale-110 transition-all cursor-pointer' />

            </div>
        </td>
    </tr>
  )
}

export default CommentTableItem
