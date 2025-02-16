import React from 'react'
import { CounterProps } from '../types/props'

const Counter: React.FC<CounterProps> = ({ title, value }) => {
    return (
        <div className='p-2'>
            <div className='text-2xl text-center'>{value}</div>
            <div className='text-xs'>{title}</div>
        </div>
    )
}

export default Counter