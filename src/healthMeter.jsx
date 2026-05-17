import { useState } from 'react';

// Animation CSS string
const PULSE_ANIMATION = `
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  }
`;

const CONTAINER_STYLE = {
  width: "60%",
  margin: "auto",
  position: "relative",
  top: "90px",
  minHeight: "40vh",
  borderRadius: "20px 5px 100px",
  backgroundColor: "#ab0",
  padding: "20px",
  boxSizing: "border-box",
};

const INNER_STYLE = {
  display: "flex",
  alignItems: "center",
  width: "95%",
  margin: "2% auto",
  border: "2px solid black",
  backgroundColor: "#052",
  height: "6vh",
};

const BAR_BASE_STYLE = {
  height: "100%",
  transition: "width 0.3s ease-out, background-color 0.3s ease-out",
  borderRadius: "3px",
};

const BUTTON_STYLE = {
  marginTop: '20px',
  textAlign: 'center'
};

const getHealthColor = (currentHealth) => {
  if (currentHealth > 70) return 'green';
  if (currentHealth > 40) return 'gold';
  return 'red';
};

export function HealthMeter() {
  const [health, setHealth] = useState(100);

  const isCritical = health <= 20 && health > 0;

  const dynamicBarStyle = {
    ...BAR_BASE_STYLE,
    width: `${health}%`,
    backgroundColor: getHealthColor(health),
    animation: isCritical ? "pulse 0.6s infinite ease-in-out" : "none",
  };

  const barMinus = () => setHealth(prev => Math.max(0, prev - 10));
  const barAdd = () => setHealth(prev => Math.min(100, prev + 10));
  const destroy = () => setHealth(prev => (prev > 10 ? Math.floor(prev / 3) : 0));

  return (
    <div style={CONTAINER_STYLE}>
      {/* Injecting the keyframe styles into the document */}
      <style>{PULSE_ANIMATION}</style>
      
      <h2>❤️ Health: {health}%</h2>
      
      <div style={INNER_STYLE}>
        <div style={dynamicBarStyle}></div>
      </div>

      <div className="button-container" style={BUTTON_STYLE}>
        <button onClick={barMinus} disabled={health === 0} style={btn}>Damage</button>
        <button onClick={barAdd} disabled={health === 100} style={btn}>Heal</button>
        <button onClick={() => setHealth(100)} style={btn}>Reset</button>
        <button onClick={destroy} disabled={health === 0} 
                style={{...btn, backgroundColor: 'red', color: 'white'}}>
          Destroy
        </button>
      </div>
    </div>
  );
}

const btn = { marginRight: '10px', padding: '10px', cursor: 'pointer', border: '2px solid black' };
