import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AddCircleOutlineRounded, Edit } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  ListItemSecondaryAction,
  DialogActions,
  Dialog,
  DialogContent,
  Button,
  TextField,
  Container,
  Card,
  FormGroup,
  Divider,
  IconButton,
  ListItemText,
  Typography,
  Link,
} from "@material-ui/core";
import "./index.css";

const useStyles = makeStyles({
  done: {
    textDecoration: "line-through",
    opacity: ".5",
    display: "flex",
    width: "100%",
  },
  header: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    padding: "20px",
    margin: "20px 0",
  },
  todo: {
    position: "relative",
    display: "flex",
    flexFow: "row",
    alignContent: "space-between",
  },
  label: {
    display: "flex",
    width: "100%",
  },
  divider: {
    position: "absolute",
    width: "100%",
    top: 0,
  },
});

function Index() {
  const [Todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState("");
  const [updateTask, setUpdateTask] = useState("");
  const [input, setInput] = useState("");

  const classes = useStyles();

  const addActivity = () => {
    const newItem = document.getElementById("activity").value;
    setTodo([...Todo, newItem]);
    document.getElementById("activity").value = " ";
    console.log(Todo);
  };

  const deleteItem = (task) => {
    var ary = Todo.filter((a, index) => {
      if (task !== a) {
        return true;
      } else {
        return false;
      }
    });
    setTodo(ary);
  };

  const openUpdateDialog = (task) => {
    setOpen(true);
    setUpdateTask(task);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editTodo = () => {
    var arr = [];
    Todo.forEach((a, index) => {
      if (updateTask == a) {
        arr.push(taskUpdate);
      } else {
        arr.push(a);
      }
    });
    setTodo(arr);
    setOpen(false);
    setTaskUpdate("");
    setUpdateTask("");
  };

  const handleFormSubmit = () => {
    localStorage.setItem("myArray", JSON.stringify(Todo));
  };

  const something = (event) => {
    if (event.keyCode === 13) {
      console.log("enter");
      addActivity();
    }
  };
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom>
          Todo App
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          To demonstrate the usage of material UI and ReactJS
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Developers Info :-
          <Link href="http://rushikesh619.github.io/">
            http://rushikesh619.github.io/
          </Link>
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Button
          type="save"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleFormSubmit}
        >
          Save tasks
        </Button>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="activity"
          label="Enter ToDo"
          name="todo"
          autoFocus
          type="text"
          value={input}
          onKeyDown={(e) => something(e)}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />

        <Button
          type="submit"
          id="addTask"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addActivity}
          defaultValue="will focus"
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add Todo
        </Button>

        {Todo.length > 0 && (
          <Card className={classes.card}>
            <FormGroup>
              {Todo.map((task, index) => (
                <div key={index} className={classes.todo}>
                  {index > 0 ? <Divider className={classes.divider} /> : ""}
                  <ListItemText primary={task} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="update"
                      onClick={() => openUpdateDialog(task)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteItem(task)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </div>
              ))}
            </FormGroup>
          </Card>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              label="Update Todo"
              type="text"
              fullWidth
              name="updateTodo"
              value={taskUpdate}
              onChange={(event) => setTaskUpdate(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={editTodo} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default Index;
