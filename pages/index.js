import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";

const elevation = 2;

export default function Home() {
  const age = useRef(null);
  const weight = useRef(null);
  const height = useRef(null);
  const neck = useRef(null);
  const chest = useRef(null);
  const ab = useRef(null);
  const hip = useRef(null);
  const thigh = useRef(null);
  const knee = useRef(null);
  const ankle = useRef(null);
  const biceps = useRef(null);
  const forearm = useRef(null);
  const wrist = useRef(null);

  const [bodyFat, setBodyFat] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const eventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const query = new URLSearchParams({
      age: age.current.value,
      weight: weight.current.value,
      height: height.current.value,
      neck: neck.current.value,
      chest: chest.current.value,
      abdomen: ab.current.value,
      hip: hip.current.value,
      thigh: thigh.current.value,
      knee: knee.current.value,
      ankle: ankle.current.value,
      biceps: biceps.current.value,
      forearm: forearm.current.value,
      wrist: wrist.current.value,
    });
    const url = "https://snek152.pythonanywhere.com?" + query.toString();
    try {
      const res = await fetch(url);
      const json = await res.json();
      setTimeout(() => {
        setBodyFat(json.pred[0]);
        setShow(true);
        setLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.centerarrow}>
        <h3>&rarr;</h3>
      </div>
      <Head>
        <title>FitGoals</title>
        <meta
          name="description"
          content="The ultimate fitness tracking and goal making app, powered by machine learning"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>FitGoals</h1>
        <p className={styles.description}>
          FitGoals is the ultimate fitness tracking and goal making app. With
          predictions powered by machine learning, FitGoals analyzes details
          about your body and generates recommendations intelligently for
          workout plans. Enter the details on the left and generate your results
          on the right!
        </p>
        <div className={styles.form}>
          <form onSubmit={eventHandler}>
            <div className={styles.grid}>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Age</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={age}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Weight (lbs)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={weight}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Height (inches)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={height}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Neck Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={neck}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Chest Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={chest}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Abdomen Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={ab}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Hip Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={hip}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Thigh Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={thigh}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Knee Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={knee}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Ankle Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={ankle}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Biceps Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={biceps}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Forearm Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={forearm}
                />
              </Paper>
              <Paper elevation={elevation} className={styles.card}>
                <h3>Wrist Circumference (cm)</h3>
                <TextField
                  required
                  type="number"
                  size="small"
                  variant="standard"
                  inputRef={wrist}
                />
              </Paper>
            </div>
            <Button variant="contained" type="submit" className={styles.button}>
              Submit
            </Button>
          </form>
          <div className={styles.result}>
            {show ? (
              <Panel bodyFat={bodyFat} />
            ) : loading ? (
              <CircularProgress />
            ) : (
              <h2>Submit the form to get results!</h2>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Panel(props) {
  const [workout, setWorkout] = useState("running");
  return (
    <div>
      <h2>Body Fat: ~{Math.round(props.bodyFat)}%</h2>
      <FormControl fullWidth variant="standard" sx={{ marginBottom: "1rem" }}>
        <InputLabel id="workout">Workout Type</InputLabel>
        <Select
          value={workout}
          labelId="workout"
          label="Workout Type"
          onChange={(v) => setWorkout(v.target.value)}
        >
          <MenuItem value="running">Running</MenuItem>
          <MenuItem value="strength">Strength</MenuItem>
        </Select>
      </FormControl>
      <div>Recommendation: {prediction(workout, props.bodyFat)}</div>
    </div>
  );
}

function prediction(workout, bodyFat) {
  if (workout === "running") {
    if (bodyFat >= 30) {
      return "1 mile a day, 7 days a week, for 8 weeks";
    } else {
      return "1 mile a day, 4 days a week, for 8 weeks";
    }
  } else {
    if (bodyFat >= 30) {
      return "30 situps a day, 7 days a week, for 8 weeks";
    } else {
      return "10 situps a day, 7 days a week, for 8 weeks";
    }
  }
}
