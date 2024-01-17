import { useState, useReducer } from "react";

function UserForm({
    // addUser, users
}) {

    const [formData, dispatchFormData] = useReducer(
        // REDUCER REDUCER FUNCTION NAME
        formReducer,
        // INITIAL STATE (name: <-FIELD '' <-VALUE)
        { name: '', email: '' });

    // REDUCER FUNCTION
    function formReducer(state, action) {
        switch (action.type) {
            case "CHANGE_FIELD":
                // CHANGE RETURNS A STATE WITH THE FORM FIELD VALUES
                return { ...state, [action.field]: action.value };

            case "RESET_FORM":
                // RESET RETURNS A STATE WITH EMPTY VALUES
                return { name: '', email: '' };

            default:
                return state;
        };
    };

    function handleFieldChange(field, value) {
        dispatchFormData({

            // REDUCER ACTION TYPE NAME
            type: "CHANGE_FIELD",

            // STATE PARAMETERS TO HANDLE
            field, value

        })
    };

    function resetForm(e) {
        e.preventDefault();
        dispatchFormData({ type: 'RESET_FORM' });
    };

    function logForm(e) {
        e.preventDefault();
        console.log(formData);
    };

    // NOT USED YET
    /*     function userFormSubmit(e) {
    
            e.preventDefault();
    
            const user = {
    
                name: formData.name,
    
                email: formData.email,
    
            };
    
            addUser(user);
    
            console.log("USER:", user);
    
            console.log("USERS:", users);
    
        } */

    return (
        <>

            {/* FORM */}
            <form className="bg-light rounded">

                {/* NAME FORM */}
                <div className="mb-3 p-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        placeholder="Rick Sanchez"
                        aria-describedby="helpId"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                    />
                    <small id="helpId" className="text-muted">Enter your name</small>
                </div >

                {/* EMAIL FORM */}
                <div className="mb-3 p-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="RickSanchez@email.rick"
                        aria-describedby="helpId"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                    />
                    <small id="helpId" className="text-muted">Enter your name</small>
                </div >

                {/* RESET BUTTON */}
                <div className="text-center py-2">
                    <button className="btn btn-dark" onClick={resetForm}>Reset Form</button>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="text-center py-2">
                    <button type="submit" className="btn btn-dark">Add User</button>
                </div>

                <div className="text-center py-2">
                    <button className="btn btn-dark" onClick={logForm}>Log Form</button>
                </div>

            </form>

        </>
    )

}

export default UserForm;