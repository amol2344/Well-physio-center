import { useState, useEffect } from "react";import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  signOut,
} from "firebase/auth";
import {
  
  signInWithRedirect,
  getRedirectResult,
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
useEffect(() => {
  const handleRedirect = async () => {
    try {
      const result = await getRedirectResult(auth);

      if (result?.user) {
        await createUserDoc(result.user, result.user.displayName);

        await signOut(auth);

        toast.success(
          "Account created successfully! Please log in to continue."
        );

        navigate("/login");
      }
    } catch (err) {
  console.error("Redirect Error:", err.code);
  console.error(err.message);
}
  };

  handleRedirect();
}, []);
  // Creates the Firestore profile doc. Every new user defaults to "user" —
  // role upgrades only ever happen through the backend admin endpoint.
const createUserDoc = async (user, displayName) => {
  try {
    const userRef = doc(db, "users", user.uid);

    await setDoc(
      userRef,
      {
        name: displayName || user.displayName || "",
        email: user.email,
        role: "patient",
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log("✅ Firestore document created/updated");
  } catch (err) {
    console.error("❌ Firestore Error:", err.code, err.message);
    throw err;
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
  console.log("BUTTON CLICKED");

  try {
    const { user } = await signInWithPopup(auth, googleProvider);

    console.log("GOOGLE LOGIN SUCCESS");
    console.log(user.uid);

   await createUserDoc(user, user.displayName);

// Give Firestore a moment to finish writing
await new Promise(resolve => setTimeout(resolve, 500));

await signOut(auth);

toast.success("Account created successfully! Please log in.");

navigate("/login");
  } catch (err) {
    console.log("ERROR:", err.code);
    console.log(err);
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
  type="button"
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