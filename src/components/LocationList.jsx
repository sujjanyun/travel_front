import { useState, useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { actionReload } from "../redux/action";
import LocationDetails from "./LocationDetails";

const LocationList = ({ refresh, triggerReload }) => {
    const [location, setLocation] = useState([]);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const locationData = await fetch('http://127.0.0.1:3333/location').then(response => response.json());
            console.log("location Data is: ", locationData)
            setLocation(locationData);
        })();
    },[]);

    return (
        <>
            <h3>Choose a Destination:</h3>
            <br />
            {!!location.length ? (
                <>
                    <Route exact path="/">
                        <ul data-testid="locationList">
                            {location.map((location) => {
                                return (
                                    <li key={location.id}>
                                        <Link data-testid={location.id} to={`/location/${location.id}`}>
                                            <strong>{location.location}</strong>
                                        </Link>
                                        <hr />
                                    </li>
                                );
                            })}
                        </ul>
                    </Route>
                    <Route path="/location/:id">
                        <LocationDetails location={location} data-testid="locationDetails" />
                        <button
                            data-testid="backButton"
                            type="button"
                            onClick={() => history.goBack()}
                        >
                            GO BACK
                        </button>
                    </Route>
                </>
            ) : (
                <p>Loading Locations...</p>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        refresh: state.refresh,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        triggerReload: () => {
            dispatch(actionReload(false));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);