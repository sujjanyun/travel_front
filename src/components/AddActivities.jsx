import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '@material-ui/core';

const AddActivities = ({ handleReload }) => {
    const { location_slug } = useParams();
    const [date, setDate] = useState('');
    const [activity_title, setActivityTitle] = useState('');
    const [activity_body, setActivityBody] = useState('');
    const [submitError, setSubmitError] = useState(null);

    const _handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const _handleActivityTitleChange = (e) => {
        setActivityTitle(e.target.value);
    };

    const _handleActivityBodyChange = (e) => {
        setActivityBody(e.target.value);
    };

    const _handleSubmit = async (e) => {
        e.preventDefault();
        const submitResponse = await fetch(`http://127.0.0.1:3333/activity`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date: date, activity_title: activity_title, activity_body: activity_body, location_slug: location_slug }),
        }).then((response) => response);
        console.log('Submitted response is', submitResponse.status);
        setDate('');
        setActivityTitle('');
        setActivityBody('');

        if (submitResponse.status === 200) {
            handleReload(true);
        } else {
            setSubmitError(submitResponse.statusText);
        }
    };

    return (
        <>
            <h3>Add New Activities</h3>
            <form onSubmit = {_handleSubmit}>
            <select 
                value={date}
                onChange={_handleDateChange}
                required>
                <option value="">Select Day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
            </select>
            <div>
            <label className="activity_title">
                <input
                    type="text"
                    name="activity_title"
                    value={activity_title}
                    onChange={_handleActivityTitleChange}
                    placeholder="Activity"
                />
            </label>
            </div>
            <div>
            <label className="activity_body">
                <input
                    type="text"
                    name="activity_body"
                    value={activity_body}
                    onChange={_handleActivityBodyChange}
                    placeholder="Details"
                />
            </label>
            </div>
            <Button size="small" variant="contained" color="secondary" type='submit'>Lez Get It!</Button>
        </form>
        </>
    )
};

export default AddActivities;