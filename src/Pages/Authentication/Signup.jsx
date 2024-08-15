import { useForm } from "react-hook-form";
import signUp from "../../assets/Authentication/signUp.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Signup = () => {
  const { signUpUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    const formData = new FormData()
    formData.append('image', data.image[0])

    try{
      const response = await fetch( `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API}`, {
        method: 'POST',
        body: formData
      })

      const result = await response.json();
      const imgURL = result.data.display_url;

      console.log(imgURL)

    }catch(error){
      console.error(error)
    }
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-sky-400">
        Sign-up Now
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 m-10">
        <div>
          <img src={signUp} alt="" />
        </div>
        <div className="mt-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              <p className="mt-2">
                {errors.name && (
                  <span className="text-red-400">Name field is required</span>
                )}
              </p>
            </div>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Image</span>
              </label>
              <input type="file" class="file:border file:border-solid ..." 
              {...register("image", {required: true})}
              />
              {errors.image && (
                <span className="text-red-400">Image field is required</span>
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
              <Link to="/signin" className="text-primary mt-2">
                Signin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
