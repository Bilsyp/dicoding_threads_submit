import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthSignUpMutation } from "../api/threadApi";
import { useEffect } from "react";
import Loading from "../Loading";
const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [authSignUp, { isLoading, isError, error, isSuccess }] =
    useAuthSignUpMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password.length < 6) {
      setError("password", {
        message: "password must be at least 6 characters",
      });
    } else {
      if (data.password !== data.confirmPassword) {
        setError("password", { message: "Oops! Password Tidak Cocok" });
        setError("confirmPassword", { message: "Oops! Password Tidak Cocok" });
      } else {
        const userData = {
          name: `${data.name} `,
          email: data.email,
          password: data.password,
        };
        authSignUp(userData);
        reset({
          data: "",
        });
      }
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Akun Anda telah berhasil didaftarkan! 😉", {
        position: "top-center",
        onClose: () => {
          navigate("/login");
        },
      });
    }
    if (isError) {
      setError("email", { message: error.data.message });
    }
  }, [isSuccess, isError]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="SignUpPage px-5 lg:px-1 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-6 py-6 px-2 rounded-md lg:p-5  lg:my-10 border bg-card text-card-foreground shadow-sm"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-xl lg:text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid  gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="first-name"
              >
                Name
              </label>
              <input
                {...register("name", { required: true })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="first-name"
                placeholder="Lee"
                required=""
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              {...register("email", { required: true })}
              placeholder="m@example.com"
            />
            {errors.email && (
              <p role="alert" className=" text-red-600 italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              className={`${
                errors.password ? "border-red-600" : ""
              } flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              id="password"
              required=""
            />
            <span className="text-sm italic text-gray-400">
              note: password must be at least 6 characters
            </span>
            {errors.password && (
              <p role="alert" className=" text-red-600 italic">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="confirm-password"
            >
              Confirm password
            </label>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              className={`${
                errors.password ? "border-red-600" : ""
              } flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="confirm-password`}
              required=""
            />
            {errors.confirmPassword && (
              <p role="alert" className=" text-red-600 italic">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              role="checkbox"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              id="terms"
            ></input>
            <label
              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-none"
              htmlFor="terms"
            >
              I agree to the
              <a className="underline" href="#" rel="ugc">
                terms and conditions
              </a>
            </label>
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-semibold ring-offset-background transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-800 text-white text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage;
