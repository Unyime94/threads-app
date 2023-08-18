import Thread from "./Thread";

const Feed = ({ user, filteredThreads }) => {
  return (
    <div className="feed">
      {filteredThreads &&
        filteredThreads.map((filteredThread) => (
          <Thread
            key={filteredThread.id}
            filteredThread={filteredThread}
            user={user}
          />
        ))}
    </div>
  );
};

export default Feed;
