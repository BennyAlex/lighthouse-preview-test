const BoundingBoxViewer = ({bbox, snippet, label, screenshotUrl, margin = 20}) => {
  const {top, left, width, height} = bbox;

  const previewWidth = 240;
  const previewHeight = 240;

  // Calculate the required scaling factor to fit the bounding box + 2x margin within the preview
  const scaleX = previewWidth / (width + margin * 2);
  const scaleY = previewHeight / (height + margin * 2);
  const scale = Math.min(scaleX, scaleY);

  const containerStyle = {
    width: previewWidth,
    height: previewHeight,
    overflow: "hidden",
    position: "relative",
    border: "2px solid black",
    flexShrink: 0,
    flexGrow: 0
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
    top: margin - 4,
    left: margin + 4,
    width: (width + 8) * scale,
    height: (height + 8) * scale,
    border: "2px solid red",
    boxSizing: "border-box",
    pointerEvents: "none"
  };

  return (
    <div style={{display: 'flex', gap: 20, marginTop: 30, marginBottom: 30}}>
      <div style={containerStyle}>
        <img src={screenshotUrl} alt="Lighthouse Screenshot" style={imgStyle}/>
        <div style={bboxStyle}></div>
      </div>
      <div>
        <h4>{label}</h4>
        <div>{snippet}</div>
      </div>
    </div>
  );
};

const goodItems = [{
  "boundingRect": {
    "top": 26,
    "bottom": 74,
    "left": 1217,
    "right": 1349,
    "width": 133,
    "height": 47
  },
  "snippet": "<a href=\"/en/test-license-assistance-software/\" aria-label=\"Eye-Able jetzt testen\" class=\"elementor-button-link elementor-button elementor-size-md elementor-animati…\" role=\"button\">",
  "nodeLabel": "Test now",
}, {
  "boundingRect": {
    "top": 1171,
    "bottom": 1234,
    "left": 363,
    "right": 629,
    "width": 266,
    "height": 63
  },
  "snippet": "<a href=\"#softwareloesungen\" target=\"_blank\" aria-label=\"Zu unseren Softwarelösungen\" class=\"elementor-button-link elementor-button elementor-size-sm\" role=\"button\">",
  "nodeLabel": "To our software solutions",
}];

const badItems = [
  {
    "boundingRect": {
      "top": 775,
      "bottom": 813,
      "left": 1347,
      "right": 1501,
      "width": 154,
      "height": 38
    },
    "snippet": "<aside data-wg-notranslate=\"\" class=\"country-selector weglot-dropdown weglot-default weglot-invert\" tabindex=\"0\" aria-expanded=\"false\" role=\"listbox\" aria-activedescendant=\"weglot-language-en\" aria-label=\"Language selected: English\">",
    "nodeLabel": "English",
  },
  {
    "boundingRect": {
      "top": 775,
      "bottom": 813,
      "left": 1347,
      "right": 1501,
      "width": 154,
      "height": 38
    },
    "snippet": "<label data-l=\"en\" tabindex=\"-1\" id=\"weglot-language-en\" role=\"none\" for=\"wg1702555538657aef92978cb393\" class=\"wgcurrent wg-li weglot-lang weglot-language weglot-flags flag-3 en\" data-code-language=\"en\" data-name-language=\"English\">",
    "nodeLabel": "English"
  }
];

export default function App() {
  return (
    <div className="App">
      <h2>Not working Items</h2>
      <h4>The bounding boxes are taken from -> accessibility -> ARIA ->
        Elements with an ARIA [role] that require children to contain a specific [role] are missing some or all of those
        required children.
      </h4>
      {badItems.map((item) => {
        return (
          <BoundingBoxViewer
            bbox={item.boundingRect}
            snippet={item.snippet}
            label={item.nodeLabel}
            screenshotUrl="https://hpj2wy.csb.app/screenshot.jpeg"
            key={item.snippet}
          />
        );
      })}

      <hr/>
      <h2>Working Items</h2>
      <h4>The bounding boxes are taken from -> accessibility -> NAMES AND LABELS ->
        Elements with visible text labels do not have matching accessible names.
      </h4>
      {goodItems.map((item) => {
        return (
          <BoundingBoxViewer
            bbox={item.boundingRect}
            snippet={item.snippet}
            label={item.nodeLabel}
            screenshotUrl="/fullpage_screenshot.jpeg"
            key={item.snippet}
          />
        );
      })}


    </div>
  );
}
