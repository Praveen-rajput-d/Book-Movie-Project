// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { processPayment } from '../../services/Payment';

// const Payment = () => {
//     const navigate=useNavigate();
//     const bookingId=localStorage.getItem("bookedId");
//     const[payment,setpayment]=useState({
//         bookingId:bookingId,
//         paymentMethod:"UPI"
//     });

//     const handlechange=(e)=>{
//         setpayment({
//             ...payment,
//             [e.target.name]:e.target.value
//         });
//     };
     
//     const handleSubmit=async(e)=>{
//         e.preventDefault();
//         try{
//             const response=await processPayment(payment);
//             console.log(response.data);
//             alert("Payment SuccessFull")
//             navigate("/mytickets");
//         }catch(error){
//             console.log(error);
//             alert("payment Failed")
//         }
//     }
//   return (
//     <div className="container mt-5">
//         <div className="row justify-content-center">
//             <div className="col-md-6">
//                 <div className="card shadow-lg">
//                     <div className="card-body">
//                         <h2 className="text-center text-danger mb-4">Payment</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-3">
//                                 <label className="form-label">Booking ID</label>
//                                 <input className="form-control" value={bookingId||""} disabled />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Payment Method</label>
//                                 <select className="form-select" name="paymentMethod" value={payment.paymentMethod} onChange={handlechange}>
//                                     <option value="UPI">UPI</option>
//                                       <option value="CARD">CARD</option>
//                                         <option value="NET_BANKING">NET_BANKING</option>
//                                           <option value="CASH">CASH</option>
//                                 </select>
//                             </div>
//                             <button className="btn btn-danger w-100" type="submit">Pay Now</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Payment




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRazorpayOrder, processPayment, verifyRazorpayPayment } from "../../services/Payment";
import "../../assets/styles/user/Payment.css";
import { FaSortAmountDown } from "react-icons/fa";

const Payment = () => {

    const navigate = useNavigate();

    const bookingId = localStorage.getItem("bookedId");
    const bookingNumber=localStorage.getItem("bookingNumber");

    const [payment, setPayment] = useState({
        bookingId: bookingId,
        paymentMethod: "UPI"
    });


    // ================= HANDLE CHANGE =================

    const handlechange = (e) => {

        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });

    };


    // ================= PAYMENT =================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!bookingId) {

            alert("Booking ID not found");

            return;

        }


        try {

            const response =
                await processPayment(payment);

            console.log(response.data);

            alert("Payment Successful 🎉");

            // Optional: remove temporary booking ID
            localStorage.removeItem("bookedId");

            // Make sure this matches your actual route
            navigate("/my-tickets");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Payment Failed"
            );

        }

    };

    const loadRazorpayScript=()=>{
        return new Promise((resolve)=>{
            const script=document.createElement("script");
            script.src="https://checkout.razorpay.com/v1/checkout.js";
            script.onload=()=>{
                resolve(true);
            };
            
            script.onerror=()=>{
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    // const handleRazorpayment=async()=>{
    //     try{
    //         if(!bookingId){
    //             alert("Booking ID not Found");
    //             return;
    //         }
    //         const isLoaded=await loadRazorpayScript();
    //         if(!isLoaded){
    //             alert("Razorpay SDK failed to load");
    //             return;
    //         }
    //         //create the order of razorpay
    //         console.log("Create order Response:",response);
    //         const response=await createRazorpayOrder(Number(bookingId));
    //         console.log("Create Order Response:",response);
    //         const order=response.data;
    //         console.log("RazorpayOrder:",order);
    //        if(!order||!order.orderId){
    //         alert("Razorpay Order Was not created");
    //         return;
    //        }
    //         //open razorpay checkout
    //         const options={
    //             key:"rzp_test_TRh09syeNDHPgm",
    //           amount:order.amount,
    //           currency:order.currency,
    //           name:"BookMovie",
    //           description:"Movie Ticket Booking",
    //           order_id:order.orderId,
    //           handler:  async function(paymentResponse){
    //            try{
    //             console.log("Razorpay payment Response:",paymentResponse);
    //             const verifyData={
    //                 bookingId:Number(bookingId),
    //                 razorpayPaymentId:
    //                 paymentResponse.razorpay_payment_id,
    //                 razorpayOrderId:
    //                 paymentResponse.razorpay_order_id,
    //                 razorpaySignature:paymentResponse.razorpay_signature
    //             };
    //             const verifyresponse=await verifyRazorpayPayment(verifyData);
    //             console.log("Verification Response:",verifyresponse.data);
    //             if(verifyresponse.data.success){
    //                 alert("Payment Successfull! Booking Confirmed");
    //                 localStorage.removeItem("bookingId");

    //                 navigate(`/booking/${bookingId}`);
    //             }
    //            }catch(error){
    //             console.error("Payment Verification Error:",error);
    //             console.error("Backend Response:",error.response?.data);
                
    //             alert(error.response?.data?.message||"Payment Verification Failed");
    //            }
    //           },
    //           prefill:{
    //             name:"",
    //             email:"",
    //             contact:""
    //           },
    //           theme:{
    //             color:"#e50914"
    //           }
    //         };
    //         console.log("opening Razorpay...");
    //         const razorpay=new window.Razorpay(options);
    //         razorpay.open();

    //     }catch(error){
    //         console.error("Razorpay Error:",error);
    //         console.error("Backend Error Response:",error.response?.data);
    //         alert(error.response?.data.message||"Unable to  start payment");
    //     }
    // }

    const handleRazorpayment = async () => {
    try {

        if (!bookingId) {
            alert("Booking ID not found");
            return;
        }
        console.log("Booking ID:",bookingId);

        // 1. Load Razorpay SDK
        const isLoaded = await loadRazorpayScript();

        if (!isLoaded) {
            alert("Razorpay SDK failed to load");
            return;
        }
            console.log("Razorpay SDK failed to load");
        // 2. Create Razorpay order from backend
        const response = await createRazorpayOrder(Number(bookingId));

        console.log("Create order Response:", response);

        const order = response.data;
        console.log("Razorpay order:",order);

        if (!order || !order.orderId) {
            alert("Razorpay Order was not created");
            return;
        }

        console.log("Razorpay Order:", order);

        // 3. Razorpay checkout configuration
        const options = {

            key: "rzp_test_TRh09syeNDHPgm",

            amount: order.amount,

            currency: order.currency,

            name: "BookMovie",

            description: "Movie Ticket Booking",

            order_id: order.orderId,

            //for qr code and upi in razorpay
            config:{
                display:{
                    blocks:{
                        upi:{
                            name:"Pay using UPI",
                            instruments:[
                                {
                                    method:"upi"
                                }
                                
                            ]
                        }
                    }
                },
                sequence:[
                    "block.upi"
                ],
                preferences:{
                    show_default_blocks:true
                }
            },

            handler: async function (paymentResponse) {

                try {

                    console.log(
                        "Razorpay Payment Response:",
                        paymentResponse
                    );

                    // 4. Send Razorpay payment details
                    // to Spring Boot for verification
                    const verifyData = {

                        bookingId: Number(bookingId),

                        razorpayPaymentId:
                            paymentResponse.razorpay_payment_id,

                        razorpayOrderId:
                            paymentResponse.razorpay_order_id,

                        razorpaySignature:
                            paymentResponse.razorpay_signature
                    };
                    console.log("Verification data:",verifyData);

                    const verifyResponse =
                        await verifyRazorpayPayment(verifyData);

                    console.log(
                        "Verification Response:",
                        verifyResponse.data
                    );

                    // 5. Payment successfully verified
                    if (verifyResponse.data.success) {

                        alert(
                            "Payment Successful! Booking Confirmed 🎉"
                        );

                        localStorage.removeItem("bookedId");

                        navigate("/myBookings");
                    }

                } catch (error) {

                    console.error(
                        "Payment Verification Error:",
                        error
                    );

                    console.error(
                        "Backend Response:",
                        error.response?.data
                    );

                    alert(
                        error.response?.data?.message ||
                        "Payment Verification Failed"
                    );
                }
            },

            prefill: {
                name: "",
                email: "",
                contact: ""
            },

            theme: {
                color: "#e50914"
            }
        };

        // 6. Open Razorpay UI
        console.log("Opening Razorpay...");

        const razorpay = new window.Razorpay(options);

        razorpay.open();

    } catch (error) {

        console.error(
            "Razorpay Error:",
            error
        );

        console.error(
            "Backend Error Response:",
            error.response?.data
        );

        alert(
            error.response?.data?.message ||
            "Unable to start payment"
        );
    }
};
    return (

        <div className="payment-page">

            <div className="container">


                {/* ================= HEADER ================= */}

                <div className="payment-header">

                    <div className="payment-header-icon">
                        💳
                    </div>

                    <div>

                        <h2>
                            Secure Payment
                        </h2>

                        <p>
                            Complete your booking securely
                        </p>

                    </div>

                </div>


                {/* ================= PAYMENT LAYOUT ================= */}

                <div className="payment-layout">


                    {/* ================= PAYMENT FORM ================= */}

                    <div className="payment-card">

                        <div className="payment-card-header">

                            <h4>
                                Payment Details
                            </h4>

                            <span>
                                🔒 Secure
                            </span>

                        </div>


                        <form >


                            {/* Booking ID */}

                            <div className="payment-field">

                                <label>
                                    Booking ID
                                </label>

                                <div className="booking-id-box">

                                    <span>
                                        #
                                    </span>

                                    <input
                                        className="form-control"
                                        value={bookingNumber || ""}
                                        disabled
                                    />

                                </div>

                            </div>


                            {/* Payment Method */}

                            <div className="payment-field">

                                <label>
                                    Select Payment Method
                                </label>


                                <div className="payment-methods">


                                    {/* UPI */}

                                    <label
                                        className={`payment-method ${
                                            payment.paymentMethod === "UPI"
                                                ? "payment-method-active"
                                                : ""
                                        }`}
                                    >

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="UPI"
                                            checked={
                                                payment.paymentMethod === "UPI"
                                            }
                                            onChange={handlechange}
                                        />

                                        <span className="method-icon">
                                            📱
                                        </span>

                                        <span className="method-content">

                                            <strong>
                                                UPI
                                            </strong>

                                            <small>
                                                Google Pay, PhonePe, Paytm
                                            </small>

                                        </span>

                                        <span className="radio-check">
                                            ✓
                                        </span>

                                    </label>


                                    {/* CARD */}

                                    <label
                                        className={`payment-method ${
                                            payment.paymentMethod === "CARD"
                                                ? "payment-method-active"
                                                : ""
                                        }`}
                                    >

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="CARD"
                                            checked={
                                                payment.paymentMethod === "CARD"
                                            }
                                            onChange={handlechange}
                                        />

                                        <span className="method-icon">
                                            💳
                                        </span>

                                        <span className="method-content">

                                            <strong>
                                                Credit / Debit Card
                                            </strong>

                                            <small>
                                                Visa, Mastercard, RuPay
                                            </small>

                                        </span>

                                        <span className="radio-check">
                                            ✓
                                        </span>

                                    </label>


                                    {/* NET BANKING */}

                                    <label
                                        className={`payment-method ${
                                            payment.paymentMethod === "NET_BANKING"
                                                ? "payment-method-active"
                                                : ""
                                        }`}
                                    >

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="NET_BANKING"
                                            checked={
                                                payment.paymentMethod === "NET_BANKING"
                                            }
                                            onChange={handlechange}
                                        />

                                        <span className="method-icon">
                                            🏦
                                        </span>

                                        <span className="method-content">

                                            <strong>
                                                Net Banking
                                            </strong>

                                            <small>
                                                All major banks supported
                                            </small>

                                        </span>

                                        <span className="radio-check">
                                            ✓
                                        </span>

                                    </label>


                                    {/* CASH */}

                                    <label
                                        className={`payment-method ${
                                            payment.paymentMethod === "CASH"
                                                ? "payment-method-active"
                                                : ""
                                        }`}
                                    >

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="CASH"
                                            checked={
                                                payment.paymentMethod === "CASH"
                                            }
                                            onChange={handlechange}
                                        />

                                        <span className="method-icon">
                                            💵
                                        </span>

                                        <span className="method-content">

                                            <strong>
                                                Cash
                                            </strong>

                                            <small>
                                                Pay at theatre counter
                                            </small>

                                        </span>

                                        <span className="radio-check">
                                            ✓
                                        </span>

                                    </label>


                                </div>

                            </div>


                            {/* Pay Button */}

                            <button
                                type="button"
                                className="pay-now-btn"
                                onClick={handleRazorpayment}
                            >

                                🔒 Pay Now

                            </button>


                            <div className="secure-payment-note">

                                🔐 Your payment information is secure
                                and protected.

                            </div>

                        </form>

                    </div>


                   
                           
                     
                        
                     


                        

                        

                      

                           

                </div>

            </div>

        </div>
    );
};

export default Payment;




