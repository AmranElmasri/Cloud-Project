import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Paper, Grid } from '@mui/material';
import './style.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Statistics = () => {
  const [configuration, setConfiguration] = useState({
    capacity: 10,
    replacepolicy: 'least-recently-used',
    hit_rate: 0,
    miss_rate: 0,
  });

  useEffect(() => {
    (async () => {
      const { data: data1 } = await axios.get('/api/v1/getConfiguraiton');
      const { data: data2 } = await axios.get('/api/v1/statistics');
      setConfiguration({
        ...configuration,
        capacity: data1[data1.length - 1].capacity,
        replacepolicy: data1[data1.length - 1].replacepolicy,
        hit_rate: data2[data2.length - 1].hit_rate,
        miss_rate: data2[data2.length - 1].miss_rate,
      });
    })();
  }, []);

  return (
    <Container>
      <h1>Statistics</h1>
      <p>the current statistics for the mem-cache over the past 10 minutes</p>

      <Grid container spacing={1} sx={{ width: '100%', margin: '0' }}>
        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
          <Paper
            sx={{ width: '100%', height: '200px', margin: 'auto' }}
            elevation={4}
          >
            <div className="capacity__color"></div>
            <div className="capacity_stat">
              <h2>capacity</h2>
              <p>{`${configuration.capacity} mb`}</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
          <Paper
            sx={{ width: '100%', height: '200px', margin: 'auto' }}
            elevation={4}
          >
            <div className="policy__color"></div>
            <div className="capacity_stat">
              <h2>replacement policy</h2>
              <p>{configuration.replacepolicy}</p>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              width: '100%',
              height: '200px',
              margin: 'auto',
              textAlign: 'center',
            }}
            elevation={4}
            className="CircularProgressbar__paper"
          >
            <div className="hit__rate__color"></div>
            <div className="CircularProgressbar">
              <p>Hit Rate</p>
              <ProgressProvider
                valueStart={0}
                valueEnd={configuration.hit_rate}
              >
                {(value) => (
                  <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                      pathColor: `rgba(0,128,0)`,
                      textColor: 'green',
                      pathTransitionDuration: 1.2,
                    })}
                  />
                )}
              </ProgressProvider>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
          <Paper
            sx={{ width: '100%', height: '200px', margin: 'auto' }}
            elevation={4}
            className="CircularProgressbar__paper"
          >
            <div className="miss__rate__color"></div>
            <div className="CircularProgressbar">
              <p>Miss Rate</p>
              <ProgressProvider
                valueStart={0}
                valueEnd={configuration.miss_rate}
              >
                {(value) => (
                  <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                      pathColor: `rgba(206, 23, 17)`,
                      textColor: 'rgb(206, 23, 17)',
                      pathTransitionDuration: 1.2,
                    })}
                  />
                )}
              </ProgressProvider>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};

export default Statistics;
