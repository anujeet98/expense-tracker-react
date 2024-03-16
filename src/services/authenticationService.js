const FIREBASEKEY = process.env.REACT_APP_FIREBASE_KEY;

async function authenticate(authType, authobj) {
    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${authType ? 'signInWithPassword': 'signUp'}?key=${FIREBASEKEY}`,{
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

export default authenticate;