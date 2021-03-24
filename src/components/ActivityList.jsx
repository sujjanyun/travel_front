import { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import ActivityDetails from "./ActivityDetails";
import { Button } from '@material-ui/core';


const ActivityList = () => {
    const [activity, setActivity] = useState([]);
    const [reload, setReload] = useState(false);
    
    useEffect(() => {
        (async () => {
            const activityData = await fetch(`http://127.0.0.1:3333/activity`).then(response => response.json());
            console.log("activity data is: ", activityData)
            setActivity(activityData);
        })();
    },[reload]);

    const _handleDelete = (id) => {
        fetch(`http://localhost:3333/activity/${id}`, {
            method: 'DELETE'
        });
        setReload(reload => !reload);
    }

    return (
        <>
            <br />
            {!!activity.length ? (
                <>
                    <Route path="/">
                        <div>
                            {activity.map((activity, index) => {
                                return (
                                    <ol key={index}>
                                        <Link to={`/activity/${activity.id}`}>
                                            <strong>{activity.activity_title}, {activity.date}</strong>
                                        </Link>
                                        <Button type="button" onClick={() => _handleDelete(activity.id)}>X</Button>
                                        <hr />
                                    </ol>
                                );
                            })}
                        </div>
                    </Route>
                    <Route path="/activity/:id">
                        <ActivityDetails/>
                    </Route>
                </>
            ) : (
                <p>Loading Activities...</p>
            )}
        </>
    );
}

export default ActivityList;