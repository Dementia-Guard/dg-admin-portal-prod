import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import Toaster from '../../../Utils/Toaster/Toaster'

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const authContext = useAuth();
    const navigate = useNavigate();

        const handleLoginAsGuest = () => {
        setLoading(true);
        Toaster.loadingToast("Validating Credentials .......");

        // Introduce a 2-second delay
        setTimeout(() => {
            // Sample data from the response you provided
            const guestData = {
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzEyZjM4NjhhMDA1YTM3NzkyNjhmMzAiLCJlbWFpbCI6InNoYWJlZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE3MjkzMjk2NjcsImV4cCI6MTcyOTM0MDQ2NywiaWF0IjoxNzI5MzI5NjY3fQ.8o12QJU6BhucSXy_stuus7wFY7hv03rbNeQ8cB44DDU",
                user: {
                    Id: "6712f3868a005a3779268f30",
                    FirstName: "Guest",
                    LastName: "User",
                    Email: "shabeer@example.com",
                    Role: "ADMIN",
                    Telephone: "712345678",
                    Age: 50,
                    Status: "ACTIVE",
                    IsApproved: "True",
                    Province: "western",
                    District: "matara",
                    City: "Colombo 07",
                    ZipCode: "56900",
                    Company: "sb",
                    DateCreated: "2024-10-18T23:47:18.154Z",
                    VendorRatings: []
                },
                role: "ADMIN"
            };

            // Call login method after the delay
            authContext.login({ access_token: guestData.access_token, user: guestData.user, role: guestData.role });

            Toaster.dismissLoadingToast();
            Toaster.justToast('success', "Credentials Validated", () => {})

            // Redirect to the dashboard
            navigate('/app/admin/dashboard');
            setLoading(false);


            // Optionally, log the action
            console.log("Guest logged in!");
        }, 2000); // 2-second delay
    };

    return (
        <section className="vh-100">
            <div className="container h-100 px-6 p-md-0 d-flex flex-column justify-content-center align-items-center">
                {/* row */}
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-md-5">
                        <div className="mb-lg-9 mb-5 d-flex flex-column align-items-center">
                            <img className='w-65 mb-5' src="../assets/images/logo/dg-logo.png" alt="eCommerce HTML Template" />
                            <p className='fw-bolder'>Admin Login</p>
                        </div>
                        <form className="needs-validation" noValidate>
                            <div className="row g-3">
                                {/* row */}
                                <div className="col-12">
                                    {/* input */}
                                    <input type="email" className="form-control" id="formSigninEmail" placeholder="Email" required />
                                    <div className="invalid-feedback">Please enter name.</div>
                                </div>
                                <div className="col-12">
                                    {/* input */}
                                    <div className="password-field position-relative">
                                        <div className="password-field position-relative">
                                            <input type="password" className="form-control fakePassword" id="formSigninPassword" placeholder="Password" required />
                                            <div className="invalid-feedback">Please enter name.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mb-4 mt-1">
                                    <div>
                                        <a href="">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                {/* btn */}
                                <div className="col-12 d-grid"><button type="submit" className="btn btn-primary">Sign In</button></div>
                                <p className='text-center m-0 my-3'>or</p>
                                <div className="col-12 d-grid"><button type="button" onClick={() => handleLoginAsGuest()} className="btn btn-primary">Login As Guest</button></div>
                                {/* link */}
                                <p className='text-capitalize'>
                                    With great power comes great
                                    <span className='text-danger'> responsibility!!</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
