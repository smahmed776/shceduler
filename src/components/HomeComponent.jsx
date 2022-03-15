import {
  ArrowBackIosNew,
  ArrowDropDown,
  ArrowForwardIos,
  Person,
  Star,
  KeyboardArrowUp,
  Verified,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import TimeDialogs from "./TimeDialogs";
import React, { useEffect, useState } from "react";
import { getMonthDays } from "../utils/CustomFunctions";

const HomeComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [today, setToday] = useState(Date.now());
  const [showingDate, setShowingDate] = useState(null);
  const [data, setData] = useState([]);
  const [week, setWeek] = useState(null);
  const oneDay = 86400000;
  const [weekComponents, setWeekComponents] = useState([]);

  const increaseByMonth = () => {
    setToday((prev) => prev + oneDay * 30);
  };
  const decreaseByMonth = () => {
    setToday((prev) => {
      if (
        new Date(prev).getUTCMonth() === new Date(Date.now()).getUTCMonth() &&
        new Date(prev).getUTCFullYear() ===
          new Date(Date.now()).getUTCFullYear()
      ) {
        return prev;
      }
      return prev - oneDay * 30;
    });
  };

  const increaseByWeek = () => {
    setWeek((prev) => {
      if (prev.from === 0 && prev.to === 7) {
        return { from: 7, to: 14 };
      }
      if (prev.from === 7 && prev.to === 14) {
        return { from: 14, to: 21 };
      }
      if (prev.from === 14 && prev.to === 21) {
        return { from: 21, to: 28 };
      }
      if (prev.from === 21 && prev.to === 28) {
        return { from: 28, to: 35 };
      }
      if (prev.from === 28 && prev.to === 35) {
        return prev;
      }
    });
  };
  const decreaseByWeek = () => {
    setWeek((prev) => {
      if (prev.from === 0 && prev.to === 7) {
        return prev;
      }
      if (prev.from === 7 && prev.to === 14) {
        return { from: 0, to: 7 };
      }
      if (prev.from === 14 && prev.to === 21) {
        return { from: 7, to: 14 };
      }
      if (prev.from === 21 && prev.to === 28) {
        return { from: 14, to: 21 };
      }
      if (prev.from === 28 && prev.to === 35) {
        return { from: 21, to: 28 };
      }
    });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (new Date(today).getDate() >= 1 && new Date(today).getDate() <= 7) {
      setWeek({ from: 0, to: 7 });
    } else if (
      new Date(today).getDate() >= 8 &&
      new Date(today).getDate() <= 14
    ) {
      setWeek({ from: 7, to: 14 });
    } else if (
      new Date(today).getDate() >= 15 &&
      new Date(today).getDate() <= 21
    ) {
      setWeek({ from: 14, to: 21 });
    } else if (
      new Date(today).getDate() >= 22 &&
      new Date(today).getDate() <= 28
    ) {
      setWeek({ from: 21, to: 28 });
    } else {
      setWeek({ from: 28, to: 35 });
    }
  }, [today]);
  useEffect(() => {
    setWeekComponents(
      getMonthDays(new Date(today).getMonth(), new Date(today).getFullYear())
    );
  }, [today]);

  const getsxObject = (comp) => {
    const dateNow = new Date(Date.now());
    if (
      dateNow.getDate() === comp.date &&
      dateNow.getMonth() === comp.month &&
      dateNow.getFullYear() === comp.year
    ) {
      return "dateActive";
    }
    return "not-date";
  };

  const appendZero = (number) => {
    if (number < 10) {
      return `0${number}`;
    }
    return number.toString();
  };

  const checkDateAvailability = (obj) => {
    const dateNow = new Date(Date.now());
    if (
      (obj.month < dateNow.getMonth() && obj.year === dateNow.getFullYear()) ||
      (obj.month === dateNow.getMonth() &&
        obj.date < dateNow.getDate() &&
        obj.year === dateNow.getFullYear())
    ) {
      return true;
    }
    return false;
  };

  const checkAvailability = (obj) => {
    const stringFormat = `${appendZero(obj.date.date)}${appendZero(
      obj.date.month
    )}${obj.date.year.toString().slice(2)}`;
 
    if (data[stringFormat]) {
      const timeString = obj.time.toString().replace(":", "_");
      if (data[stringFormat][timeString]) {
        return true;
      }
      return false;
    }
    return false;
  };

  const generateFormat = (obj) => {
    return `${obj.date}- ${months[obj.month]}- ${obj.year}`;
  };

  const fetchData = async () => {
    fetch("./data.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((idata) => setData(idata))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Box sx={{width: '380px'}}>
        <Stack direction={"row"} alignItems="center" sx={{ p: 1, width:"100%", justifyContent:"center" }}>
          <Person sx={{ height: "75px", width: "75px", borderRadius: "50%" }} />
          <Stack direction={"column"}>
            <Typography variant="h6">Mourizio Calcogno</Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Verified sx={{ mr: 1 }} /> verificato il 14 aprile 2019
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Star sx={{ mr: 1 }} /> 4.3 /24 recensioni
            </Typography>
          </Stack>
        </Stack>
        <Divider />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton onClick={decreaseByWeek}>
            <ArrowBackIosNew />{" "}
          </IconButton>
          <Stack direction="row" alignItems="center">
            <Typography>
              <span>{`${months[new Date(today).getUTCMonth()]}, ${new Date(
                today
              ).getUTCFullYear()}`}</span>
            </Typography>
            <IconButton onClick={decreaseByMonth}>
              <KeyboardArrowUp />
            </IconButton>
            <IconButton onClick={increaseByMonth}>
              <ArrowDropDown />
            </IconButton>
          </Stack>
          <IconButton onClick={increaseByWeek}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
        <Box sx={{ px: 1 }}>
          <Stack direction="row" spacing={0.3} sx={{width: "375px", "& button":{width: "calc((370px /7) - 5px)", minWidth:"0px"}}}>
            {weekComponents.length > 0 &&
              weekComponents.map((comp, index) => (
                <React.Fragment key={index}>
                  {index >= week.from && index < week.to && (
                    <Button
                      disabled={checkDateAvailability(comp)}
                      className={getsxObject(comp)}
                      onBlur={(e) => {
                        e.target.classList.remove("active");
                      }}
                      sx={{ flexDirection: "column", p: 0.2, fontSize: "13px" }}
                      onClick={(e) => {
                        e.target.classList.add("active");
                        setShowingDate({ index: index });
                      }}
                    >
                      <Typography
                        component={"span"}
                        sx={{ pointerEvents: "none" }}
                      >
                        {days[comp.day]}
                      </Typography>
                      <Typography
                        component={"span"}
                        sx={{ pointerEvents: "none" }}
                      >
                        {comp.date}
                      </Typography>
                    </Button>
                  )}
                </React.Fragment>
              ))}
          </Stack>

          <Grid container spacing={1} sx={{ alignItems: "center", mt: 1 }}>
            {showingDate &&
              weekComponents[showingDate.index].time.map((time) => (
                <Tooltip title={generateFormat(time.date)} key={time.time}>
                  <Grid item xs={3}>
                    <Button
                      onClick={() => setOpenDialog(true)}
                      disabled={checkAvailability(time)}
                    >
                      {time.time}
                    </Button>
                  </Grid>
                </Tooltip>
              ))}
          </Grid>
        </Box>
        <TimeDialogs open={openDialog} close={() => setOpenDialog(false)} />
      </Box>
    </Container>
  );
};

export default HomeComponent;
