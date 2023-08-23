import Thread from "./Thread";

const Feed = ({ user, filteredThreads, setOpenPopUp, getThreads }) => {
  return (
    <div className="feed">
      {filteredThreads &&
        filteredThreads.map((filteredThread) => (
          <Thread
            key={filteredThread.id}
            filteredThread={filteredThread}
            setOpenPopUp={setOpenPopUp}
            getThreads={getThreads}
            user={user}
          />
        ))}
    </div>
  );
};

export default Feed;
