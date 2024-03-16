const FIREBASEKEY = process.env.REACT_APP_FIREBASE_KEY;

async function getUserProfile(authObj) {
    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASEKEY}`,{
            method: 'POST',
            body: JSON.stringify(authObj),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const resData = await res.json();
        if(!res.ok){
            throw new Error(resData.error.message);
        }
        return resData.users[0];
    }
    catch(err){
        throw err;
    }
}


async function updateProfileBackend(authobj) {
    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASEKEY}`,{
            method: 'POST',
            body: JSON.stringify(authobj),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const resData = await res.json();
        if(!res.ok){
            throw new Error(resData.error.message);
        }
        return resData;
    }
    catch(err){
        throw err;
    }
}


const emailVerificationHandler = async() => {
    try{
        const token  = localStorage.getItem('expensetracker-token');

        if(!token)
            throw new Error('user session expired, kindly sign in again');

        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASEKEY}`,{
            method: 'POST',
            body: JSON.stringify({requestType: 'VERIFY_EMAIL', idToken: token}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const resData = res.json();
        if(!res.ok){
            throw new Error(resData.error.message);
        }
        alert('Email verification request sent');
    }
    catch(err){
        alert(err.message);
    }
}

async function resetPassword(resetobj) {
    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASEKEY}`,{
            method: 'POST',
            body: JSON.stringify(resetobj),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const resData = await res.json();
        if(!res.ok){
            throw new Error(resData.error.message);
        }
    }
    catch(err){ 
        throw err.message;
    }
}


module.exports = {
    getUserProfile,
    updateProfileBackend,
    emailVerificationHandler,
    resetPassword,
}