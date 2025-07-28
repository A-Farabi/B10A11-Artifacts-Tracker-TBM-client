import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from './firebase.init';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




export const AuthContext = createContext(null)

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Handle Google login
    const googleLogin = () => {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                setUser(result.user); // Update the user state
                console.log(result.user);
                return result.user;
            })
            .catch((err) => {
                const message = err.message;
                toast.error("Error during Google sign-in: " + err.message);
                throw new Error(message); // Allow caller to handle errors
            });
    };

    // update user profile 
    const updateUserProfile = async (name, photoUrl) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoUrl
            })
            setUser({ ...auth.currentUser })
        } 
        catch (error) {
            throw new Error(error.message);

        }
    }

     // Log out user
const logOut = async () => {
  try {
    // 1. First clear server session
    console.log('Initiating server logout...');
    const logoutResponse = await axios.post('http://localhost:5000/logout', {}, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Server logout response:', logoutResponse.data);

    // 2. Then sign out from Firebase
    console.log('Signing out from Firebase...');
    await signOut(auth);
    
    // 3. Force clear client-side token (belt-and-suspenders)
    document.cookie = 'token=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // 4. Verify token is gone
    console.log('Verifying token removal...');
    try {
      const check = await axios.get('http://localhost:5000/debug-check-token', {
        withCredentials: true
      });
      console.warn('Token still exists after logout!', check.data);
    } catch (err) {
      console.log('Token successfully cleared (received expected 401)');
    }
    
    return true;
  } catch (error) {
    console.error('Logout failed:', {
      message: error.message,
      response: error.response?.data
    });
    throw error;
  }
};

    // unsubscribe 
useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setLoading(false);

    if (currentUser?.email) {
      try {
        console.log('Setting JWT for:', currentUser.email);
        const response = await axios.post('http://localhost:5000/jwt', 
          { email: currentUser.email },
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );
        
        console.log('JWT Response:', response.data);
        
        // Verify cookie was set
        const tokenCheck = await axios.get('http://localhost:5000/debug-check-token', {
          withCredentials: true
        });
        console.log('Token Verification:', tokenCheck.data);
        
      } catch (error) {
        console.error('Auth Error:', {
          message: error.message,
          response: error.response?.data,
          config: error.config
        });
      }
    }
  });

  return () => unSubscribe();
}, []);



    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleLogin, 
        updateUserProfile,
        logOut,
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;