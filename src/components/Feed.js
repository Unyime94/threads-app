import Thread from "./Thread";

const Feed = ({ user, filteredThreads, setOpenPopUp }) => {
  return (
    <div className="feed">
      {filteredThreads &&
        filteredThreads.map((filteredThread) => (
          <Thread
            key={filteredThread.id}
            filteredThread={filteredThread}
            setOpenPopUp={setOpenPopUp}
            user={user}
          />
        ))}
    </div>
  );
};

export default Feed;
