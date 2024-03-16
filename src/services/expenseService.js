

const fetchExpenseFromDB = async () => {
    try{
        const res = await fetch('https://expense-tracker-6d78c-default-rtdb.firebaseio.com/expense/expense.json');
        const resData = await res.json();
        if(!res.ok)
            throw new Error(resData);
        return resData;
    }
    catch(err){
        throw err;
    }
}


const saveExpenseToDB = async(methodType, idToEdit, expenseObj) => {
    try{
        const res = await fetch(`https://expense-tracker-6d78c-default-rtdb.firebaseio.com/expense/expense${methodType==='POST'?'':'/'+idToEdit}.json`,{
            method:`${methodType}`,
            body:JSON.stringify(expenseObj),
            headers:{'Content-Type':'Application/json'},
        });
        const resData = await res.json();
        if(!res.ok)
            throw new Error(resData);
        
        return resData;
    }
    catch(err){
        throw err;
    }
}


const deleteExpenseFromDB = async(id) => {
    try{
        const res = await fetch(`https://expense-tracker-6d78c-default-rtdb.firebaseio.com/expense/expense/${id}.json`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        const resData = await res.json();
        if(!res.ok)
            throw new Error(resData);
        
        alert('Item has been deleted');
    }
    catch(err){
        alert(err.message);
    }
}


module.exports = {
    fetchExpenseFromDB,
    saveExpenseToDB,
    deleteExpenseFromDB,
}