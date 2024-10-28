const displayCompleted =(status)=>{
    setCompleted(status);
  }
//   RenderTabList
    const renderTabList = () => {
        return (
        <div className="my-5 tab-list show-tasks">
            <span
            onClick={() => displayCompleted(true)}
            className={Completed ? "active" : ""}
            >
            Completed
            </span>
            <span
            onClick={() => displayCompleted(false)}
            className={Completed ? "" : "active"}
            >
            Incomplete
            </span>
        </div>
        );
    };