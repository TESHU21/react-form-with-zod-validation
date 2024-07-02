import "./App.css";
import Input from "./Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object({
  fullname: yup.string().required("FullName is required"),
  phoneNumber: yup
    .string()
    .required("phone number is required")
    .matches(/^\d+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const formSubmit = (data) => {
    //  / console.log(data);
  };
  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <p>Please fill all the field to sign up</p>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Input
          id="fullname"
          label="Full Name"
          placeholder="Enter the input"
          type="text"
          register={{ ...register("fullname") }}
          errorMessage={errors.fullname?.message}
        />
        <Input
          id="phoneNumber"
          label="Phone Number"
          placeholder="Enter Phone Number"
          type="text"
          register={{ ...register("phoneNumber") }}
          errorMessage={errors.phoneNumber?.message}
        />
        <Input
          id="email"
          label="Email"
          placeholder="Enter Email Adress"
          type="email"
          register={{ ...register("email") }}
          errorMessage={errors.email?.message}
        />
        <Input
          id="password"
          label="Password"
          placeholder="Enter Password"
          type="password"
          register={{ ...register("password") }}
          errorMessage={errors.password?.message}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          register={{ ...register("confirmPassword") }}
          errorMessage={errors.confirmPassword?.message}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default App;
