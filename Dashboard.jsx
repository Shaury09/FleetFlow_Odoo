import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/analytics/overview")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>FleetFlow Command Center</h1>
      {data && (
        <>
          <p>Active Fleet: {data.activeFleet}</p>
          <p>Maintenance Alerts: {data.maintenance}</p>
          <p>Utilization Rate: {data.utilization}%</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;