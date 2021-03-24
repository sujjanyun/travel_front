import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useHistory, Route } from "react-router-dom";
import { Button } from '@material-ui/core';

const ActivityDetails = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const activityData = await fetch(
        `http://127.0.0.1:3333/activity/${id}`
      ).then((response) => response.json());
      setActivity(activityData);
      console.log('made it to activity details!', activityData)
    })();
  }, [setActivity, id]);

  return (
    <>
      {!!activity.length ? (
        <>
          <Route path='/activity/'>
            <ol>
              {activity.map((activity, index) => {
                return (
                  <li key={index}>
                    <h1>{activity.date}</h1>
                    <h2>{activity.activity_title}</h2>
                    <h3>{activity.activity_body}</h3>
                  </li>
                )
              })}
            </ol>
          </Route>
        </>
      ) : (
        <p>No activities...</p>  
      )}
        <Button size="small" variant="contained" color="primary" type="button" onClick={() => history.goBack()}>Back</Button>
    </>
  );
};

export default ActivityDetails;