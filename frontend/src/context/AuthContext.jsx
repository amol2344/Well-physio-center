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
  const [profile, setProfile] = useState(null); // { name, email, role }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubProfile = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }

      if (user) {
        // Live-subscribe to the user's Firestore doc so role changes
        // (e.g. an admin promoting them) reflect immediately without re-login.
        const userRef = doc(db, "users", user.uid);
        unsubProfile = onSnapshot(
  userRef,
  (snap) => {
    console.log("User profile:", snap.data());

    setProfile(snap.exists() ? snap.data() : null);
    setLoading(false);
  },
  (error) => {
    console.error("User profile error:", error);
    setLoading(false);
  }
);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubAuth();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  const value = {
    currentUser,
    name: profile?.name || currentUser?.displayName || "",
    role: profile?.role || "patient",
    profile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}