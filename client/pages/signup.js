import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../Hooks/useAuth";
export default () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = ()=>{
    setFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    })
  }

  const { mutate } = useAuth({ endpoint: "signup" });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData,{
      onSuccess: (data)=>{
        router.push("/signin");
        resetForm()
      },
      onError:(error)=>{
        alert(error?.response?.data?.message)
      }
    })
  };

  return (
    <>
      <div
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-2 sm:px-8 md:px-12 lg:px-20 flex flex-1 justify-center py-5">
            <div
              className="layout-content-container flex flex-col w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4
 py-5 "
            >
              <h2 className="text-[#111817] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
                Create your account
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="flex w-full flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111817] text-base font-medium leading-normal pb-2">
                      Full Name
                    </p>
                    <input
                      placeholder="Enter your full name"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111817] focus:outline-0 focus:ring-0 border border-[#dbe6e4] bg-white focus:border-[#dbe6e4] h-14 placeholder:text-[#618983] p-[15px] text-base font-normal leading-normal"
                      onChange={handleChange}
                      name="name"
                      value={formData.name}
                      required
                    />
                  </label>
                </div>

                <div className="flex w-full flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111817] text-base font-medium leading-normal pb-2">
                      Email
                    </p>
                    <input
                      placeholder="Enter your email"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111817] focus:outline-0 focus:ring-0 border border-[#dbe6e4] bg-white focus:border-[#dbe6e4] h-14 placeholder:text-[#618983] p-[15px] text-base font-normal leading-normal"
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                      required
                    />
                  </label>
                </div>

                <div className="flex w-full flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111817] text-base font-medium leading-normal pb-2">
                      Password
                    </p>
                    <input
                      placeholder="Create a password"
                      type="password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111817] focus:outline-0 focus:ring-0 border border-[#dbe6e4] bg-white focus:border-[#dbe6e4] h-14 placeholder:text-[#618983] p-[15px] text-base font-normal leading-normal"
                      onChange={handleChange}
                      name="password"
                      value={formData.password}
                      required
                    />
                  </label>
                </div>

                <div className="flex w-full flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111817] text-base font-medium leading-normal pb-2">
                      Confirm Password
                    </p>
                    <input
                      placeholder="Confirm your password"
                      type="password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111817] focus:outline-0 focus:ring-0 border border-[#dbe6e4] bg-white focus:border-[#dbe6e4] h-14 placeholder:text-[#618983] p-[15px] text-base font-normal leading-normal"
                      onChange={handleChange}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      required
                    />
                  </label>
                </div>

                <div className="flex px-4 py-3">
                  <input
                    type="submit"
                    value="Create Account"
                    className="flex min-w-[84px] w-full border-none cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#13ebc7] text-[#111817] text-base font-bold leading-normal tracking-[0.015em]"
                  />
                </div>
              </form>

              <p className="text-[#618983] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-teal-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
