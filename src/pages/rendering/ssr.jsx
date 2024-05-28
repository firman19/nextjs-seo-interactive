import Skeleton from 'react-loading-skeleton'
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from 'next/head';

export default function SSR({ data }) {

    return (
        <>
            <Head>
                <title>SSR</title>
                <meta property="og:title" content="Page SSR" key="title" />
                <meta name="description" content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, animi?"></meta>
            </Head>
            <main className="flex min-h-screen flex-col p-24">
                <h1 className={`mb-3 text-2xl font-semibold`}> Client Side Rendering </h1>
                <h2 className={`mb-3 text-2xl font-semibold`}> Pokemon Ditto </h2>

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


// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}