// import React, { Component } from 'react' *class based component
import React from 'react'
import loading from './loading.gif'

// export class Spinner extends Component {   *class based 
    // render() {                               component*
    const Spinner=()=>{ //          *Function based component*
        return (
            <div className="text-center">
                <img className='my-3' src={loading} alt="loading" />
            </div>
        )
    // } *class based component*
}

export default Spinner
