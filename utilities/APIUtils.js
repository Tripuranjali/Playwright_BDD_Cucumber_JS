class APIUtils{

    constructor(apicontextparam,loginapipayloadparam){
        this.apicontext=apicontextparam;
        this.loginapipayload=loginapipayloadparam;
    }


    async getToken(){
        const loginapiresponse=await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {data:this.loginapipayload})
            //expect(loginapiresponse.ok()).toBeTruthy();
            const loginjsonresponse=await loginapiresponse.json();
            const token=loginjsonresponse.token;
            console.log(token);
            return token;
        
    }

    async createOrder(placeorderapipayloadparam){
            let response={};
            response.tokenproperty= await this.getToken();
            const placeorderapiresponse=await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {data:placeorderapipayloadparam,headers:{'Authorization':response.tokenproperty,'Content-Type':'application/json'}})
            //expect(placeorderapiresponse.ok()).toBeTruthy();
            const placeorderjsonresponse=await placeorderapiresponse.json();
            console.log(placeorderjsonresponse);
            const OrderIDJson=placeorderjsonresponse.orders[0];
            response.orderidproperty=OrderIDJson;
            return response;
    }

}
module.exports={APIUtils};