import {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const EmployeeContext = createContext()

const EmployeeContextProvider  = (props) => {

    const [employees, setEmployees] = useState([
        {id:uuidv4(), name: 'Tamim Desai', email: 'tamimdesai@mail.com', address: '89, Tiranga Colony', phone: '9923356256'},
        {id:uuidv4(), name: 'Tahir Kadgaonkar', email: 'tahirkad@mail.com', address: '45, Indira Colony', phone: '7588120365'},
        {id:uuidv4(), name: 'Raees Chikode', email: 'raeeschikode@mail.com', address: '25, Rui Manenagar', phone: '8421032587'},
        {id:uuidv4(), name: 'Sohel Desai', email: 'soheldesai@mail.com', address: '54, Ganesh-nagar', phone: '9320589754'},
        {id:uuidv4(), name: 'Salim Sabkhan', email: 'salimsabkhan@mail.com', address: '23, Ganga-nagar', phone: '9172032418'}
])

useEffect(()=> {
    setEmployees(JSON.parse(localStorage.getItem('employees')))
},[])

useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
})



const sortedEmployees = employees.sort((a,b)=>(a.name < b.name ? -1 : 1));



const addEmployee = (name, email, address, phone) => {
    setEmployees([...employees , {id:uuidv4(), name, email, address, phone}])
}

const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id))
}

const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map((employee) => employee.id === id ? updatedEmployee : employee))
}

    return (
        <EmployeeContext.Provider value={{sortedEmployees, addEmployee, deleteEmployee, updateEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider;