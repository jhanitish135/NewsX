// import { getByTitle } from '@testing-library/dom'
//import React, { Component } from 'react' *class based component
 import React from 'react';
// export class Newsitem extends Component {
    // render() {
    // class based component
    
    const Newsitem=(props)=>{
        let {title,description,imageurl,newsurl,author,date,source} = props;
        return (
            <div className="my-3">
               <div className="card">
                <div style={{display:'flex',
                            justifyContent:'flex-end',
                            position:'absolute',
                            right:'0'}}>
                    <span className="badge rounded-pill bg-danger"> {source} </span>
                </div>
                    <img src={!imageurl?"https://img.etimg.com/thumb/msid-87235798,width-1070,height-580,imgsize-612232,overlay-etmarkets/photo.jpg":imageurl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="badge bg-warning text-dark">By {!author? "Unknown":author} on {new Date(date).toGMTString()} </small></p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    // } class based component
}

export default Newsitem
