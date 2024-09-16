import { SigninInput, SignupInput } from "@deepakhp/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput | SigninInput>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest() {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );
      const data = await res?.data;
      localStorage.setItem("token", data.jwt);
      navigate("/blogs");
    } catch (error) {
      // alert user if the request failed
      console.log("something went wrong", error);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="text-3xl font-extrabold">Create an account</div>
        <div className="text-slate-400">
          {type === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            to={type === "signin" ? "/signup" : "/signin"}
            className="pl-2 underline"
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </div>
      <div className="pt-8 flex flex-col gap-3">
        {type === "signup" && (
          <Input
            id="name"
            // @ts-ignore
            value={postInputs?.name}
            inputType="text"
            label="Name"
            placeholder="John Doe"
            onChange={(e) => {
              setPostInputs((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
        )}
        <Input
          id="email"
          value={postInputs?.email}
          inputType="email"
          label="Email"
          placeholder="johndoe@example.com"
          onChange={(e) => {
            setPostInputs((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
        <Input
          id="password"
          value={postInputs?.password}
          inputType="password"
          label="Password"
          placeholder="******"
          onChange={(e) => {
            setPostInputs((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
        <div className="flex items-center justify-center pt-3">
          <button
            type="button"
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={sendRequest}
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

function Input({
  id,
  label,
  placeholder,
  onChange,
  value,
  inputType,
}: {
  id: string;
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
  inputType: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-bold text-black min-w-[300px]">
        {label}
      </label>
      <input
        className="min-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        value={value}
        id={id}
        type={inputType}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
