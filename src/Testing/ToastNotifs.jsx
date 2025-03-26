import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./toastStyles.css"

const ToastNotifs = () => {
  const triggerToast = (type) => {
    if (type === 'success') {
      toast.success('This is a success toast!', {
        position: "top-right",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (type === 'error') {
      toast.error('This is an error toast!', {
        position: "top-right",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (type === 'info') {
      toast.info('This is an info toast!', {
        position: "top-right",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (type === 'warning') {
      toast.warning('This is a warning toast!', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <h3 className='text-black text-3xl'>Toast Notification Test</h3>
      <button className='text-black text-2xl' onClick={() => triggerToast('success')}>Show Success Toast</button> <br></br>
      <button className='text-black text-2xl' onClick={() => triggerToast('error')}>Show Error Toast</button> <br></br>
      <button className='text-black text-2xl'onClick={() => triggerToast('info')}>Show Info Toast</button> <br></br>
      <button className='text-black text-2xl' onClick={() => triggerToast('warning')}>Show Warning Toast</button> <br></br>
      
      <ToastContainer />
    </div>
  );
};

export default ToastNotifs;