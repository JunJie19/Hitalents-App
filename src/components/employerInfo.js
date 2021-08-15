import React, { Component } from 'react'

import '../styles/database.css'

export default class EmployerInfo extends Component {
    render() {
        return (
            <div>
                <div className='content-general-info'>
                    <div className='grid-info'>
                        <label>Organization :</label> <label> </label>

                        <label>Email :</label> <label> </label>
                        <label>Phone No :</label> <label> </label>
                        <label>Nationality :</label> <label> </label>
                        <label>Skillset</label> <label> </label>
                        <label>Position</label> <label> </label>
                    </div></div>

                <div>
                    <button className='edit-btn'>Edit</button>
                    <button className='download-btn'>Download</button>
                </div>

            </div>
        )
    }
}