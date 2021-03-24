import { useState, useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import LocationDetails from "./LocationDetails";
import AddActivities from "./AddActivities";
import ActivityList from "./ActivityList";
import { Button } from '@material-ui/core';


const LocationList = () => {
    const [location, setLocation] = useState([]);
    const history = useHistory();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        (async () => {
            const locationData = await fetch('http://127.0.0.1:3333/location').then(response => response.json());
            console.log("@locationlist data is: ", locationData)
            setLocation(locationData);
        })();
    },[reload]);

    const _handleDelete = (slug) => {
        fetch(`http://localhost:3333/location/${slug}`, {
            method: 'DELETE'
        });
        setReload(reload => !reload);
    }

    return (
        <>
            <br />
            {!!location.length ? (
                <>
                    <Route exact path="/">
                        <div className="LocationList">
                            {location.map((location, index) => {
                                return (
                                    <ul key={index}>
                                        <Link to={`/location/${location.slug}`}>
                                            <strong>{location.location}</strong>
                                        </Link>
                                        <Button type="button" onClick={() => _handleDelete(location.slug)}>X</Button>
                                        <hr />
                                    </ul>
                                );
                            })};
                        </div>
                    </Route>
                    <Route path="/location/:slug">
                        <LocationDetails />
                        <AddActivities/>
                        <ActivityList/>
                        <Button size="small" variant="contained" color="primary" type="button" onClick={() => history.goBack()}>Back</Button>
                    </Route>
                </>
            ) : (
                <p>Loading Locations...</p>
            )}
        </>
    );
};

export default LocationList;