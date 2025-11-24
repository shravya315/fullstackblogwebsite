import React, { useRef } from 'react'
import { useAppContext } from '../context/AppContext'

const Header = () => {

const {setInput, input}= useAppContext()
const inputRef= useRef()
const onClear= ()=>{
  setInput('')
  inputRef.current.value= ''
}

const onSubmitHandler= async(e)=>{
  e.preventDefault();
  setInput(inputRef.current.value)

}
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8'>
            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                <p>New: AI Feature Integrated</p>
                <img src="https://www.bing.com/th/id/OIP._Svt_s9bAkxmh-1FYsj-6wHaHa?w=195&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="star icon" className='w-2.5' />
            </div>
            <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>SUVICHAAR</h1>
            <h4 className='text-primary'>Your own <span className='text-gray-900 font-bold'>blogging</span> Platform</h4>
            <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-600'>This is your space to speak fearlessly, to write unapologetically, and to share what truly matters. One word or a thousand your story begins right here.</p>

            <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
              <input ref={inputRef} type="text" placeholder='Search for blogs' required className='w-full pl-4 outline-none'/>
              <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale=105 transition-all cursor-pointed'>Search</button>
            </form>
        </div>
        <div className='text-center'>
          {input &&
          <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>}
        </div>
    </div>
  )
}

export default Header
