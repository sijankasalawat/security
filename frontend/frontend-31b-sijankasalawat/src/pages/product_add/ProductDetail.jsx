import React, { useEffect, useState } from 'react'
import img1 from "../../assets/images/slide1.png"
import msg from "../../assets/icons/msg.png"
import call from "../../assets/icons/call.png"
import AllProduct from '../component/AllProduct'
import { useParams } from 'react-router-dom'
import { getProductDetailById } from '../../Apis/Api'
// import GoogleMapBox from '../component/GoogleMapBox'

const ProductDetail = ({ product }) => {
    console.log('Product:', product);
const {productId} = useParams();
const [productDetail,setProductDetail] = useState({owner:{}})
const fetchProductData = async ()=>{
    try {
        const res = await getProductDetailById(productId)
        console.log('res: ', res);
        setProductDetail(res.data.product)
    } catch (error) {
        console.log('error: ', error);
        
    }
}
useEffect(()=>{
fetchProductData()
},[productId])

    // if (!product) {
    //     return <div>Loading...</div>; 
    //   }
    return (
        <>
   
        <div className='bg-gray-100'>
            <div className='container'>
                <h1 className='text-gray-700 text-[24px] font-bold px-2'>{productDetail.brandName}</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-col-2 '>
                    <div className='p-2'>

                        <img src={productDetail.productImage} alt='product image' className='w-full h-[200px] lg:h-[400px] md:h-[300px] rounded-md object-cover' />
                        <h1>Rs {productDetail.price}</h1>
                        <p>{productDetail.details}</p>

                    </div>
                    <div className='p-2 '>
                        <div className='bg-black rounded-md'>
                            <h1 className='text-center text-green-500 text-[22px]'> Rs {productDetail.price}</h1>

                        </div>
                        <div className='bg-gray-200 rounded-md  p-5 mt-3'>
                            <div className='flex gap-2 items-start'>

                                <img src={productDetail.owner.avatar ||img1} className='w-[50px] h-[50px] rounded-full' alt="profile" />
                                <div >
                                <h1 className='text-xl font-bold text-gray-600  '>{productDetail.owner.fName} {productDetail.owner.lName}</h1>
                                <div className="div">{productDetail?.owner.phoneNumber}</div>


                                </div>
                            </div>
                                <div className='mt-2'>
                                    <div className="text-xl font-bold">
                                        Other Number
                                    </div>
                                         <div className="text-lg text-gray-500">{productDetail.contactNo}</div>
                                </div>
                                <div>
                                    <div className="text-lg mt-2 font-bold">
                                Address
                                </div>
                                <h1 className=''> {productDetail.address}</h1>

                                </div>
                         
                            <div className='grid grid-cols-2 gap-2'>
                                <button className='flex gap-2 items-center justify-center border-none rounded-md bg-gray-900 mt-2 p-2 px-2 text-teal-50 hover:bg-gray-700'>
                                    <img src={msg} alt="message" className='w-[20px] h-[20px]' />
                                    Message
                                </button>
                                <button className='flex gap-2 items-center justify-center border-none rounded-md bg-sky-500 mt-2 p-2 px-2 text-teal-50 hover:bg-sky-700'>
                                   <a href={`tel:+977${productDetail?.owner.phoneNumber}`} className='flex gap-2 items-center'>
                                    <img src={call} alt="call" className='w-[20px] h-[20px]' />
                                    <div>
                                    Contact 
                                    </div>
                                   </a>
                                </button>
                            </div>


                        </div>
                        <div className="maps bg-gray-200 rounded-md  p-5 mt-3">
{/* <GoogleMapBox/>                             */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AllProduct/>
        </>
      
    )
}

export default ProductDetail