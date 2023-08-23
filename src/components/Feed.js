import Thread from "./Thread";

const Feed = ({
  user,
  filteredThreads,
  setOpenPopUp,
  getThreads,
  setInteractingThread,
}) => {
  return (
    <div className="feed">
      {filteredThreads?.map((filteredThread) => (
        <Thread
          key={filteredThread.id}
          filteredThread={filteredThread}
          setOpenPopUp={setOpenPopUp}
          getThreads={getThreads}
          setInteractingThread={setInteractingThread}
          user={user}
        />
      ))}
    </div>
  );
};

export default Feed;
