import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // App initialization
  const [loading, setLoading] = useState(true);

  // Firestore profile loaded
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    let unsubscribeProfile = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      // Reset whenever auth state changes
      setProfile(null);
      setProfileLoaded(false);

      // Stop previous Firestore listener
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      if (user) {
        const userRef = doc(db, "users", user.uid);

        unsubscribeProfile = onSnapshot(
          userRef,
          (snap) => {
            if (snap.exists()) {
              setProfile(snap.data());
            } else {
              setProfile(null);
            }

            setProfileLoaded(true);
            setLoading(false);
          },
          (error) => {
            console.error("User profile error:", error);

            setProfile(null);
            setProfileLoaded(true);
            setLoading(false);
          }
        );
      } else {
        // Logged out
        setProfile(null);
        setProfileLoaded(true);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  const value = {
    currentUser,
    profile,

    name: currentUser
      ? profile?.name || currentUser.displayName || ""
      : "",

    email: currentUser?.email || "",

  role:
  currentUser && profileLoaded
    ? profile?.role || "patient"
    : null,

    loading,
    profileLoaded,
  };

  return (
      <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
  );
}