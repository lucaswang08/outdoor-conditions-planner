import type { Activity } from "../types/forecast"

type ActivitySelectorProps = {
  selectedActivity: Activity
  onSelectActivity: (activity: Activity) => void
}

function ActivitySelector({ selectedActivity, onSelectActivity }: ActivitySelectorProps) {
  return (
    <section className="activity-selector">
      <p>Choose your activity</p>

      <div className="activities">
        <button
          className={`activity-button ${selectedActivity === "hiking" ? "active" : ""}`}
          onClick={() => onSelectActivity("hiking")}
        >
          Hiking
        </button>

        <button
          className={`activity-button ${selectedActivity === "snowboarding" ? "active" : ""}`}
          onClick={() => onSelectActivity("snowboarding")}
        >
          Snowboarding
        </button>
        
        <button
          className={`activity-button ${selectedActivity === "stargazing" ? "active" : ""}`}
          onClick={() => onSelectActivity("stargazing")}
        >
          Stargazing
        </button>
      </div>
    </section>
  )
}

export default ActivitySelector