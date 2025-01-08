import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './TShirtDesigner.css';
import tshirt from "../assets/tshirt.webp"
const TShirtDesigner = () => {
    const [logo, setLogo] = useState(null);

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setLogo(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="designer-container">
            <h1>T-Shirt Designer</h1>
            
           <div className='tshirt_body'>
           <div className="tshirt-container">
                <img
                    src={tshirt}
                    alt="T-shirt"
                    className="tshirt-image"
                />
                
            </div>
            <div className='tshirt_button_part'>
            <div className="upload-section">
                <label htmlFor="logo-upload">Upload your logo:</label>
                <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={handleLogoUpload}
                />
            </div>
            {logo && (
                    <Draggable>
                        <img src={logo} alt="Uploaded Logo" className="logo" />
                    </Draggable>
                )}
                <button className='submit_btn'>Submit</button>
            </div>
           </div>
        </div>
    );
};

export default TShirtDesigner;
