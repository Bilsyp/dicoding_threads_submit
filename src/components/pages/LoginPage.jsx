import { Link, useNavigate } from "react-router-dom";
import { useAuthLoginMutation } from "../api/threadApi";
import Loading from "../Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slice/authSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Membuat form untuk halaman login

const LoginPage = () => {
  const [authLogin, { data, isLoading, isSuccess, error, isError }] =
    useAuthLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    // reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    authLogin(userData);
    // reset({
    //   data: "",
    // });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(login({ token: data }));
      toast.success("login berhasil", {
        position: "top-center",
        onClose: () => {
          navigate("/profile");
        },
      });
    }
    if (isError) {
      if (error?.data?.message) {
        setError("email", { message: error?.data?.message });
        setError("password", { message: error?.data?.message });
      }
      toast.error("connection timeout");
    }
  }, [isSuccess, isError]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="loginPage mt-10 lg:mt-10 lg:h-[90vh] px-3 flex justify-center items-center">
      <form
        data-test="form-test"
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border h-fit  bg-card text-card-foreground shadow-sm mx-auto max-w-sm"
        data-v0-t="card"
      >
        <div className="flex flex-col p-6 space-y-1">
          <h3
            data-test={"test-h3"}
            className="whitespace-nowrap tracking-tight text-2xl font-bold"
          >
            Login
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                data-test="email-test"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="m@example.com"
                required
              />{" "}
              {errors?.email && (
                <p role="alert" className="text-sm text-red-600 italic">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="ml-auto inline-block text-sm underline"
                  href="#"
                  rel="ugc"
                >
                  Forgot your password?
                </a>
              </div>
              <input
                data-test="password-test"
                {...register("password", { required: true })}
                type="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
              />
              {errors?.password && (
                <p role="alert" className=" text-red-600 text-sm italic">
                  {errors?.password.message}
                </p>
              )}
            </div>
            <button data-test="login-button" className="btn" type="submit">
              Login
            </button>
          </div>
          <div className="mt-4 text-center text-sm">
            {"Don't"} have an account?
            <Link to={"/signUp"} className="underline" rel="ugc">
              {" "}
              Sign up{" "}
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
