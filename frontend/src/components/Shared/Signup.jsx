import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  signOut,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../../firebase/firebase";
import toast from "react-hot-toast";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Creates the Firestore profile doc. Every new user defaults to "user" —
  // role upgrades only ever happen through the backend admin endpoint.
  const createUserDoc = async (user, displayName) => {
    const userRef = doc(db, "users", user.uid);
    const existing = await getDoc(userRef);
    if (!existing.exists()) {
      await setDoc(userRef, {
        name: displayName || user.displayName || "",
        email: user.email,
        role: "user",
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleSignup = async (e) => {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(user, {
      displayName: name,
    });

    await createUserDoc(user, name);

    // Sign out the newly created user
    await signOut(auth);

    // Show success message
    toast.success(
      "Account created successfully! Please log in to continue."
    );

    // Redirect to Login page
    navigate("/login");

  } catch (err) {
    console.error("Signup Error:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await createUserDoc(user, user.displayName);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl border-2 border-slate-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-teal-700 to-orange-600 bg-clip-text text-transparent mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-600 to-orange-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-slate-400 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-all duration-300 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-700 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}