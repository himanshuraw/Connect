import React, { useState } from 'react'
import useFetchData from '../hooks/UseFetchData'

const Home: React.FC = () => {
    const { data: feedData, loading, error } = useFetchData(`/feeds`, true);
    if (loading) return <></>
    if (error) return <>error</>
    return (
        <div className='text-2xl'>Home</div>
    )
}

export default Home