import React, { useContext, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import bcrypt from "bcryptjs";
import { Appstate } from "../App";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where("mobile", "==", form.mobile));
      const querySnapShot = await getDocs(quer);

      querySnapShot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          navigate("/");
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "error.message",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col mt-48 items-center">
      <h1 className="text-xl font-bold">Log In</h1>
      <div class="p-2 w-96 md:w-1/3">
        <div class="relative">
          <label for="name" class="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
            type={"number"}
            id="name"
            name="name"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-96 md:w-1/3">
        <div class="relative">
          <label for="name" class="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="name"
            name="name"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-full">
        <button
          onClick={login}
          class="flex mx-auto text-white bg-cyan-500 border-0 py-2 px-8 
          focus:outline-none hover:bg-cyan-700 rounded-md text-lg"
        >
          {loading ? <Triangle height={25} color="white" /> : "Login"}
        </button>
      </div>

      <div className="mt-2">
        <p>
          Do not have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-400">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
