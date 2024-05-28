import Skeleton from 'react-loading-skeleton'
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from 'next/head';

export default function CSR() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>CSR</title>
                <meta property="og:title" content="Page CSR" key="title" />
                <meta name="description" content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, animi?"></meta>
            </Head>
            <main className="flex min-h-screen flex-col p-24">
                <h1 className={`mb-3 text-2xl font-semibold`}> Client Side Rendering </h1>
                <h2 className={`mb-3 text-2xl font-semibold`}> Pokemon Ditto </h2>

                <Skeleton count={5} />
                {loading &&
                    <Skeleton count={5} />
                }

                {data &&
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{data.weight}</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>{data.height}</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                <td>{data.abilities.map((e, i) => {
                                    return (
                                        <>
                                            {e.ability.name},
                                        </>
                                    )
                                })}</td>
                            </tr>
                            <tr>
                                <td>Sprites</td>
                                <td>
                                    <img className='inline' src={data.sprites.back_default} alt="" />
                                    <img className='inline' src={data.sprites.back_shiny} alt="" />
                                    <img className='inline' src={data.sprites.front_default} alt="" />
                                    <img className='inline' src={data.sprites.front_shiny} alt="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </main>
        </>
    );
}
