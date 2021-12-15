import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type NotificationProps = {
    show: boolean,

    errors?: {
        msg: string,
        
    }[],
    success?: {
        msg: string,
    }[]
}

const Notification = (props: NotificationProps) =>{



  

    props.errors?.map((e)=>{
        toast.error(e.msg, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: e.msg
            });
    })

    props.success?.map((e)=>{
        toast.success(e.msg, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: e.msg
            });
    })
    

    return(

     

       


       

        
        
        <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        
        
        
        
    

    )
}

export default Notification;