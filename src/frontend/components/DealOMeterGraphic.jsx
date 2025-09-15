const DealOMeterGraphic = () => {
  return (
    <div className="deal-o-meter-graphic-wrapper">
      <div className="dom-container">
        <div className="dom-top">
          <h3>Deal-O-Meter</h3>
        </div>
        <div className="dom-middle">
          <p className="dom-copy">
            Keep an eye on your local <strong>Deal-O-Meter</strong> to see how
            good of a deal you're getting!
          </p>
          <img
            className="dom-graphic"
            src="https://outdoorempire.com/wp-content/uploads/2025/09/Deal-o-meter-meter-graphic-2.png"
            alt=""
          />
          <div className="dom-graphic-container"></div>
        </div>
        <div className="dom-bottom">
          <h5>Only YOU can save on these deals!</h5>
        </div>
      </div>
    </div>
  );
};
export default DealOMeterGraphic;
