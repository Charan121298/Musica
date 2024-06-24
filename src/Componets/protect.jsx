import React, { Children } from 'react'
import { UserAuth } from '../firebase/AuthContext'
import { Navigate } from 'react-router-dom'

function Protect(Children) {
    const { user } = UserAuth()
    if (!user) {
        return (<Navigate to="/" />)
    }

    return Children
};

export default Protect
