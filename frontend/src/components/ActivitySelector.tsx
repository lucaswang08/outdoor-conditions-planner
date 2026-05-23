function ActivitySelector() {
  return (
    <section className="activity-selector">
      <p>Choose your activity</p>

      <div className="activities">
        <button className="activity-button active">Hiking</button>
        <button className="activity-button">Snowboarding</button>
        <button className="activity-button">Stargazing</button>
      </div>
    </section>
  )
}

export default ActivitySelector