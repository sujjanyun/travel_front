import { useState } from "react";
import { Button } from '@material-ui/core';

const AddNewLocation = ({ handleReload }) => {
    const [location, setLocation] = useState("");
    const [submitError, setSubmitError] = useState(null);

    const _handleSubmit = async (e) => {
        e.preventDefault();
        const submitResponse = await fetch("http://127.0.0.1:3333/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ location }),
        }).then((response) => response);
        console.log('Submitted response is,', submitResponse.status);
        setLocation("");

        if (submitResponse.status === 200) {
            handleReload(true);
        } else {
            setSubmitError(submitResponse.statusText);
        }
    };

    const _handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    return (
        <>
            <h2>Plan a New Adventure!</h2>
            <form onSubmit = {_handleSubmit}>
                <label className="location_name">
                    <input
                        type="text"
                        name="location_name"
                        value={location}
                        onChange={_handleLocationChange}
                        placeholder="Destination"
                        required
                    />
                </label>
                <Button size="small" variant="contained" color="secondary" type='submit'>Lez Get It!</Button>
                {!!submitError && <div className='error'>{submitError}</div>}
            </form>
        </>
    )
};

export default AddNewLocation;