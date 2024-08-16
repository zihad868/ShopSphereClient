import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import login from "../../assets/Authentication/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";


const Signin = () => {
  const navigate = useNavigate();
  const { signInGoogle, signUpGoogle } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignupGoogle = () => {
    signUpGoogle()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1500
        });
      })
  }


  const onSubmit = async (data) => {
    const { email, password } = data;

    signInGoogle()
    .then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    })
    .catch((error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    })
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-sky-400">
        Sign-in Now
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 m-5">
        <div>
          <img src={login} alt="" />
        </div>

        <div className="mt-15">
          <button onClick={handleSignupGoogle} className="border-2 p-2 bg-sky-200 hover:bg-sky-300 w-full rounded-md">
            <div className="flex  items-center justify-center ">
              <FcGoogle className="w-16" /> SignIn With Google
            </div>
          </button>

          <div className="text-xl text-center text-gray-500 uppercase mt-8">
              or signin with email and Password
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-400">Email field is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-400">Password field is required</span>
              )}
            
            </div>


            <input
              className="font-bold px-2 py-1 bg-sky-400 mt-3 rounded-lg w-full hover:bg-slate-400"
              type="submit"
            />
          </form>
          <div>
            <p>
              Already have an account? Please{" "}
              <Link to="/signup" className="text-primary mt-2">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;


