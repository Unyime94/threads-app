import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";
import WriteIcon from "./components/icons/WriteIcon";

const App = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [interactingThread, setInteractingThread] = useState(null);
  const [popUpFeedThreads, setPopUpFeedThreads] = useState(null);
  const [text, setText] = useState("");

  const userId = "4984e9b8-1364-4bb6-b6cf-d4cbcf9994e6";

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${userId}`
      );
      const data = await response.json();
      setUser(data[0]); //to get the object in the array
    } catch (error) {
      console.error(error);
    }
  };

  const getThreads = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?thread_from=${userId}`
      );
      console.log(response);
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getThreadsFeed = () => {
    if (threads) {
      if (viewThreadsFeed) {
        const standAloneThreads = threads.filter(
          (thread) => thread.reply_to === null
        );
        setFilteredThreads(standAloneThreads);
      }
      if (!viewThreadsFeed) {
        const replyThreads = threads?.filter(
          (thread) => thread.reply_to !== null
        );
        setFilteredThreads(replyThreads);
      }
    }
  };

  const getReplies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply_to=${interactingThread?.id}`
      );
      const data = await response.json();
      setPopUpFeedThreads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const postThread = async () => {
    const thread = {
      timestamp: user.user_uuid,
      thread_from: user.user_uuid,
      thread_to: user.user_uuid || null,
      reply_to: interactingThread?.id || null,
      text: text,
      likes: [],
    };

    try {
      const response = await fetch("http://localhost:3000/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thread),
      });
      const result = await response.json();
      console.log("post result", result);
      getThreads();
      getReplies();
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setPopUpFeedThreads(null);
    setInteractingThread(null);
    setOpenPopUp(true);
  };

  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed();
  }, [user, threads, viewThreadsFeed]);

  useEffect(() => {
    getReplies();
  }, [interactingThread]);

  return (
    <>
      {user && (
        <div className="app">
          <Nav url={user.instagram_url} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          <Feed
            user={user}
            filteredThreads={filteredThreads}
            setOpenPopUp={setOpenPopUp}
            getThreads={getThreads}
            setInteractingThread={setInteractingThread}
          />
          {openPopUp && (
            <PopUp
              user={user}
              setOpenPopUp={setOpenPopUp}
              popUpFeedThreads={popUpFeedThreads}
              postThread={postThread}
              text={text}
              setText={setText}
            />
          )}
          <div onClick={handleClick}>
            <WriteIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
