const BoundingBoxViewer = ({ bbox, screenshotUrl, margin = 20 }) => {
  const { top, left, width, height } = bbox;

  const previewWidth = 240;
  const previewHeight = 240;

  // Calculate the required scaling factor to fit the bounding box + margin within the preview
  const scaleX = previewWidth / (width + 2 * margin);
  const scaleY = previewHeight / (height + 2 * margin);
  const scale = Math.min(scaleX, scaleY);

  const containerStyle = {
    width: previewWidth,
    height: previewHeight,
    overflow: "hidden",
    position: "relative",
    border: "2px solid black",
    marginTop: "25px"
  };

  const imgStyle = {
    position: "absolute",
    transformOrigin: "top left",
    transform: `translate(${-left * scale + margin}px, ${
      -top * scale + margin
    }px) scale(${scale})`
  };

  const bboxStyle = {
    position: "absolute",
    top: margin,
    left: margin,
    width: width * scale,
    height: height * scale,
    border: "2px solid red",
    boxSizing: "border-box",
    pointerEvents: "none"
  };

  return (
    <div style={containerStyle}>
      <img src={screenshotUrl} alt="Lighthouse Screenshot" style={imgStyle} />
      <div style={bboxStyle}></div>
    </div>
  );
};

const boundingBoxes = [
  {
    top: 35,
    bottom: 53,
    left: 103,
    right: 238,
    width: 135,
    height: 18
  },
  {
    top: 24,
    bottom: 64,
    left: 0,
    right: 1350,
    width: 1350,
    height: 40
  },
  {
    top: 35,
    bottom: 53,
    left: 292,
    right: 380,
    width: 88,
    height: 18
  },
  {
    top: 2274,
    bottom: 2298,
    left: 520,
    right: 606,
    width: 86,
    height: 24
  },
  {
    top: 2105,
    bottom: 2225,
    left: 520,
    right: 829,
    width: 309,
    height: 120
  },
  {
    top: 2274,
    bottom: 2298,
    left: 520,
    right: 606,
    width: 86,
    height: 24
  }
];

export default function App() {
  return (
    <div className="App">
      <h3></h3>
      <div>The bounding boxes are taken from -> accessibility -> Background and foreground colors do not have a sufficient contrast ratio. - Rule</div>
      {boundingBoxes.map((box) => {
        return (
          <BoundingBoxViewer
            bbox={box}
            screenshotUrl="https://hpj2wy.csb.app/screenshot.jpeg"
          />
        );
      })}
    </div>
  );
}
