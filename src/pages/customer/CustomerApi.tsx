export function searchCustomers(){
    if (!localStorage['customers']){
        localStorage['customers'] = '[]';
    }

    let customers = localStorage['customers'];
    customers = JSON.parse(customers);
    return customers;
}

export function removeCustomer(id: string){
    let customers = searchCustomers();
    
    let indice = customers.findIndex((customer:any) => customer.id == id);

    customers.splice(indice,1);
    localStorage['customers'] = JSON.stringify(customers);


}

export function saveCustomer(customer:any){
    let customers = searchCustomers();
    if (customer.id){
        let indice = customers.findIndex((c:any) => c.id == customer.id);
        customers[indice] = customer;
    }else{
            customer.id = Math.round(Math.random() * 100000);
            customer.push(customer);
        }
    localStorage['customers'] = JSON.stringify(customers);
}

export function searchCustomerById(id: string){

    let customers = searchCustomers();
    return customers.find((customer:any) => customer.id == id);
    
}