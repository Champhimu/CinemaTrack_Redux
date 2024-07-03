import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className='vh-100'>
            {/* HEllo */}
            {/* <h1>Welcome</h1> */}
            <header>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#EAF7FF" }}>
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <a className="navbar-brand" href="#">
                            <img src='/Images/Logo.png' alt="Brand Logo" style={{ width: "200px", height: "150px" }} />
                        </a>
                        <button className="btn btn-outline-primary" style={{ color: "#004080", borderColor: "#004080", marginBottom: "70px" }}>Login as Guest</button>
                    </div>
                </nav>


            </header>

            <div className="">
                <div className="">
                    <div className="row">
                        <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ paddingLeft: "52px", backgroundColor: "#EAF7FF" }}>
                            <div className="text-center mt-4">
                                <h1 className="hero-title" style={{ color: "#004080" }}>Your Personal Movie Companion:</h1>
                                <h1 className="hero-title-secondary" style={{ color: "#FF4500" }}>CinemaTracker</h1>
                                <div style={{ marginTop: "50px" }}>
                                    <TypeAnimation
                                        sequence={['Create Your Movie Watchlist', 700, 'Personalize your Watchlist', 700, 'Rate and Review Movies Easily', 700]}
                                        style={{ fontSize: '2em', color: "#624A49" }}
                                        omitDeletionAnimation={true}
                                        repeat={Infinity}
                                    />
                                </div>
                                {/* <p className="hero-subtitle" style={{ color: "#555" }}>Manage, Rate, and Review Movies Effortlessly</p>
    <p className="hero-subtitle" style={{ color: "#555" }}>Never Miss a Movie Again</p> */}
                            </div>
                            <div className="mt-auto mb-auto text-center">
                                <button className="btn btn-hero btn-lg" style={{ backgroundColor: "#007BFF", color: "#fff", border: "none" }} onClick={() => navigate('/dashboard')}>Explore CinemaTracker Features</button>
                            </div>
                        </div>


                        <div className="col-lg-6">
                            <img src="/Images/Hero_Left.png" alt="Hero Left Image" className="img-fluid" style={{ height: "100%", width: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage