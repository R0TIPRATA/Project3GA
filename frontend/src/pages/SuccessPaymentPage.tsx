import successImg from "../assets/success.png";
import { useNavigate, useParams } from 'react-router-dom'

const SuccessPaymentPage = () => {
    const params = useParams()
    const navigate= useNavigate()
    const user = params.user

    const goBack = () => {
        navigate(`/${user}`)
    }

  return (
        <div className=" bg-orange-100 flex-col pb-20 h-full">
            <div className="parent flex flex-col py-10 px-40 gap-4 items-start">
                <img src={successImg} className='w-20'></img>
                <h3>You have successfully contributed to the wishlist!</h3>
                <button className="btn-primary" onClick={goBack}>Back to wishlist</button>
            </div>
        </div>
  )
}

export default SuccessPaymentPage