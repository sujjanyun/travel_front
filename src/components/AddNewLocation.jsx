import { useState } from "react";
import { actionReload } from "../redux/action";
import { connect } from "react-redux";

const AddNewLocation = (props) => {
    const [location, setLocation] = useState("");

    const _handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const _handleSubmit = async (e) => {
        e.preventDefault();
        const submitResponse = await fetch("http://127.0.0.1:3333", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: location }),
        }).then((response) => response);
        console.log("RESPONSE IS:", submitResponse);
        setLocation("");
        if (submitResponse.status === 200) {
            props.triggerReload();
        }
    };

    return (
        <>
            <h1>Add New Location</h1>
            <form onSubmit = {_handleSubmit}>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location_name"
                        data-testid="addNewLocationName"
                        value={location}
                        onChange={_handleLocationChange}
                    />
                </label>
                <button data-testid="addNewLocationNameButton">Submit</button>
            </form>
        </>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        triggerReload: () => {
            dispatch(actionReload(true));
        },
    };
};

export default connect(null, mapDispatchToProps)(AddNewLocation);