import { useForm } from "react-hook-form";
import signUp from '../../assets/Authentication/signUp.jpg'
import { Link } from "react-router-dom";


const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-sky-400">Sign-up Now</h1>
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
                <span className="label-text">Contact Number</span>
              </label>
              <input
                type="number"
                placeholder="Contact Number"
                {...register("contact", { required: true })}
                className="input input-bordered"
              />
              {errors.contact && (
                <span className="text-red-400">Contact field is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="number"
                placeholder="Password"
                {...register("password", { required: true })}
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-400">Password field is required</span>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                {...register("gender")}
                className="select select-bordered w-full"
              >
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
            </div>
            <input
              className="font-bold px-2 py-1 bg-sky-400 mt-3 rounded-lg w-full hover:bg-slate-400"
              type="submit"
            />
          </form>
          <div>
            <p>Already have an account? Please <Link to='/signin' className="text-primary mt-2">Signin</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
