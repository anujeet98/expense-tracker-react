const FIREBASEKEY = process.env.REACT_APP_FIREBASE_KEY;

async function updateProfileBackendHandler(authobj) {
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
    finally{
        // setIsLoading(false);
    }
}

const updateProfileHandler = async(e, name, photourl) => {
    try{
        e.preventDefault();
        if(name.trim()==='')
            return alert('Profile name must be non-empty');
        if(photourl.trim()==='')
            return alert('Photo url name must be non-empty');
        const token  = localStorage.getItem('expensetracker-token');

        if(!token)
            return alert('user session expired, kindly sign in again');

        const resData = await updateProfileBackendHandler({idToken: token, displayName: name, photoUrl: photourl, deleteAttribute: [], returnSecureToken: true});

        console.log(resData);
        alert('user profile updated!');
        // history.push('/home');
    }
    catch(err)
    {
        console.error(err);
        alert(err.message);
    }
}

const fetchProfileHandler = async() => {
    try{
        const token  = localStorage.getItem('expensetracker-token');

        if(!token)
            throw new Error('user session expired, kindly sign in again');

        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASEKEY}`,{
            method: 'POST',
            body: JSON.stringify({idToken: token}),
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


module.exports = {
    updateProfileBackendHandler,
    updateProfileHandler,
    fetchProfileHandler,
    emailVerificationHandler,
}