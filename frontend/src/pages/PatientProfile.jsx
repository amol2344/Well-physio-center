import { useEffect, useState } from "react";
import {
doc,
getDoc,
updateDoc,
} from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

import { FaUserCircle } from "react-icons/fa";

export default function PatientProfile() {

const { currentUser } = useAuth();

const [loading,setLoading]=useState(true);

const [profile,setProfile]=useState({

name:"",
email:"",
phone:"",
dob:"",
gender:"",
address:"",
emergencyContact:""

});

useEffect(()=>{

const loadProfile=async()=>{

if(!currentUser) return;

const ref=doc(db,"users",currentUser.uid);

const snap=await getDoc(ref);

if(snap.exists()){

setProfile({
  name: snap.data().name || "",
  email: currentUser.email,
  phone: snap.data().phone || "",
  dob: snap.data().dob || "",
  gender: snap.data().gender || "",
  address: snap.data().address || "",
  emergencyContact: snap.data().emergencyContact || "",
});
}else{

setProfile((prev)=>({

...prev,

email:currentUser.email

}));

}

setLoading(false);

};

loadProfile();

},[currentUser]);

const handleChange=(e)=>{

setProfile({

...profile,

[e.target.name]:e.target.value

});

};

const saveProfile=async()=>{

try{
await setDoc(
    doc(db,"users",currentUser.uid),
    {
      
name:profile.name,

phone:profile.phone,

dob:profile.dob,

gender:profile.gender,

address:profile.address,

emergencyContact:profile.emergencyContact,

    },
    { merge:true }
);

alert("Profile Updated Successfully");

}catch(err){

console.log(err);

alert(err.message);

}

};

if(loading){

return <h2 className="text-center mt-20">Loading...</h2>;

}

return(

<div className="min-h-screen bg-slate-100">

<div className="max-w-4xl mx-auto py-10">

<div className="bg-white rounded-2xl shadow-lg p-8">

<div className="text-center">

<FaUserCircle className="mx-auto text-8xl text-teal-600"/>

<h1 className="text-3xl font-bold mt-4">

Patient Profile

</h1>

</div>

<div className="grid md:grid-cols-2 gap-5 mt-8">

<div>

<label>Name</label>

<input

type="text"

name="name"

value={profile.name}

onChange={handleChange}

className="w-full border rounded-lg p-3"

/>

</div>

<div>

<label>Email</label>

<input

type="email"

value={profile.email}

disabled

className="w-full border rounded-lg p-3 bg-slate-100"

/>

</div>

<div>

<label>Phone</label>

<input

type="text"

name="phone"

value={profile.phone}

onChange={handleChange}

className="w-full border rounded-lg p-3"

/>

</div>

<div>

<label>Date of Birth</label>

<input

type="date"

name="dob"

value={profile.dob}

onChange={handleChange}

className="w-full border rounded-lg p-3"

/>

</div>

<div>

<label>Gender</label>

<select

name="gender"

value={profile.gender}

onChange={handleChange}

className="w-full border rounded-lg p-3"

>

<option value="">Select</option>

<option>Male</option>

<option>Female</option>

<option>Other</option>

</select>

</div>

<div>

<label>Emergency Contact</label>

<input

type="text"

name="emergencyContact"

value={profile.emergencyContact}

onChange={handleChange}

className="w-full border rounded-lg p-3"

/>

</div>

<div className="md:col-span-2">

<label>Address</label>

<textarea

rows={3}

name="address"

value={profile.address}

onChange={handleChange}

className="w-full border rounded-lg p-3"

/>

</div>

</div>

<button

onClick={saveProfile}

className="mt-8 w-full bg-gradient-to-r from-teal-600 to-orange-600 text-white py-3 rounded-xl"

>

Save Profile

</button>

</div>

</div>

</div>

);

}