import axiosInstance from "./axiosInstance";

export const processPayment=(paymentdata)=>{
    return axiosInstance.post("/api/payment",paymentdata);
}

export const allPayments=()=>{
    return axiosInstance.get("/api/payment/all");
}

export const searchPaymentBystatus=(paymentStatus)=>{
    return axiosInstance.get(`/api/payment/status/${paymentStatus}`);
}

export const searchPaymentByTransactionId=(transactionid)=>{
    return axiosInstance.get(`/api/payment/transaction/${transactionid}`);
}
export const searchPaymentByMethod=(paymentMethod)=>{
    return axiosInstance.get(`/api/payment/method/${paymentMethod}`)
}
export const GetTotalRevenue=()=>{
    return axiosInstance.get("/api/payment/revenue")
}
export const countSuccessPayments=()=>{
    return axiosInstance.get("/api/payment/SuccessPayment");
}
export const countFailedPayment=()=>{
    return axiosInstance.get("/api/payment/FailedPayment");
}

export const createRazorpayOrder=(bookingId)=>{
    return axiosInstance.post(
        "/api/payment/razorpay/create-order",
        {
            bookingId:bookingId
        }
    )
}
export const verifyRazorpayPayment=(paymentData)=>{
    return axiosInstance.post(
        "/api/payment/razorpay/verify",paymentData
    );
}