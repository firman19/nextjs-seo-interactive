import Skeleton from 'react-loading-skeleton'
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Head from 'next/head';
import { useForm } from "react-hook-form";

export default function FormPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const msg = "success";
    // const msg = "error";
    const msg = "long_error";

    function customSubmit(data) {
        setLoading(true);
        setTimeout(displayMessage, 2000);
    }

    const displayMessage = () => {
        setLoading(false);
        if (msg == "success") {
            // display success msg
            toast.success('Login is successful');
        }

        if (msg == "error") {
            // display error
            toast.error('Invalid username/password');
        }

        if (msg == "long_error") {
            // display long message
            Swal.fire({
                title: 'Server is Busy',
                text: 'Please try again later',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    }

    return (
        <>
            <Head>
                <title>Interactive Form</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <main className="flex min-h-screen flex-col p-24 items-center">
                <h1 className={`mb-3 text-2xl font-semibold`}> Login </h1>
                <Toaster />

                <div class="w-full max-w-xs">
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(customSubmit)}>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="Username">
                                Username
                            </label>
                            <input
                                {...register("username", {
                                    required: "*This field is required"
                                })}
                                disabled={loading}
                                class={`${loading ? 'opacity-50' : ''} ${errors?.username ? 'border-red-500' : ''} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline`}
                                id="Username"
                                type="text"
                                placeholder="Username" />

                            {errors?.username &&
                                <p class="text-red-500 text-xs italic">
                                    {errors?.username?.message}
                                </p>
                            }
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input
                                {...register("password", { required: "*This field is required" })}
                                disabled={loading}
                                class={`${loading ? 'opacity-50' : ''} ${errors?.password ? 'border-red-500' : ''} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline`}
                                id="password"
                                type="password" placeholder="******************" />

                            {errors?.password &&
                                <p class="text-red-500 text-xs italic">
                                    {errors?.password?.message}
                                </p>
                            }
                        </div>
                        <div class="flex items-center justify-between">
                            <button disabled={loading}
                                class={`${loading ? 'opacity-50' : 'hover:bg-blue-700'} bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                type="submit" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
