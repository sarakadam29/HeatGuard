import { useState } from "react";
import { motion } from "motion/react";
import { Search, Wind, Thermometer, Droplets, Activity, MapPin } from "lucide-react";

const MAP_URL =
  "https://images.unsplash.com/photo-1762096177941-ef84f7709136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwbWFwJTIwZGFyayUyMG92ZXJoZWFkJTIwdmlld3xlbnwxfHx8fDE3NzYxNDY3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const layers = [
  { id: "wind", label: "Wind", icon: Wind, color: "#7DBF72" },
  { id: "temp", label: "Temp", icon: Thermometer, color: "#E8B94F" },
  { id: "humidity", label: "Hum", icon: Droplets, color: "#6EA8D9" },
  { id: "aqi", label: "AQI", icon: Activity, color: "#D96B4E" },
];

const nearbyPlaces = [
  { name: "Lodhi Garden", type: "Park · 1.2 km", score: 82, status: "safe", temp: "31°C", aqi: "98" },
  { name: "India Gate Loop", type: "Route · 2.8 km", score: 58, status: "caution", temp: "34°C", aqi: "142" },
  { name: "Sanjay Lake Trail", type: "Trail · 4.1 km", score: 75, status: "safe", temp: "30°C", aqi: "110" },
  { name: "Nehru Park", type: "Park · 3.5 km", score: 40, status: "danger", temp: "37°C", aqi: "178" },
];

const statusColors = {
  safe: "#7DBF72",
  caution: "#E8B94F",
  danger: "#D96B4E",
};

const legendColors = [
  { color: "#7DBF72", label: "Safe" },
  { color: "#A8D068", label: "" },
  { color: "#E8B94F", label: "Moderate" },
  { color: "#D99040", label: "" },
  { color: "#D96B4E", label: "Danger" },
];

export function MapPage() {
  const [activeLayer, setActiveLayer] = useState("temp");
  const [search, setSearch] = useState("");

  return (
    <div style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
      {/* Map Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#2A2620",
        }}
      >
        <img
          src={MAP_URL}
          alt="Map"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.45,
            filter: "sepia(60%) brightness(0.6)",
          }}
        />
        {/* Overlay color tint based on active layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              activeLayer === "temp"
                ? "radial-gradient(ellipse at 50% 40%, rgba(232,185,79,0.18) 0%, transparent 70%)"
                : activeLayer === "aqi"
                ? "radial-gradient(ellipse at 50% 40%, rgba(217,107,78,0.18) 0%, transparent 70%)"
                : activeLayer === "humidity"
                ? "radial-gradient(ellipse at 50% 40%, rgba(110,168,217,0.18) 0%, transparent 70%)"
                : "radial-gradient(ellipse at 50% 40%, rgba(125,191,114,0.18) 0%, transparent 70%)",
            transition: "background 500ms ease",
          }}
        />
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          top: "20px",
          left: "16px",
          right: "64px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "rgba(26,25,22,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,248,235,0.12)",
            borderRadius: "999px",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Search size={16} color="#9A9080" />
          <input
            placeholder="Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "14px",
              color: "#F5EDD8",
              flex: 1,
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
        </div>
      </motion.div>

      {/* Layer Toggle Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {layers.map((layer) => {
          const Icon = layer.icon;
          const isActive = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: isActive
                  ? `${layer.color}20`
                  : "rgba(26,25,22,0.85)",
                backdropFilter: "blur(12px)",
                border: isActive
                  ? `1px solid ${layer.color}60`
                  : "1px solid rgba(255,248,235,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
              title={layer.label}
            >
              <Icon size={18} color={isActive ? layer.color : "#9A9080"} />
            </button>
          );
        })}
      </motion.div>

      {/* Current Location Beacon */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "48%",
          zIndex: 10,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            className="fw-beacon"
            style={{
              position: "absolute",
              top: "-8px",
              left: "-8px",
              width: "32px",
              height: "32px",
              borderRadius: "999px",
              background: "rgba(232,185,79,0.2)",
            }}
          />
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              background: "#E8B94F",
              border: "3px solid #F5EDD8",
              boxShadow: "0 0 12px rgba(232,185,79,0.6)",
              position: "relative",
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          position: "absolute",
          bottom: "220px",
          left: "16px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "rgba(26,25,22,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,248,235,0.1)",
            borderRadius: "12px",
            padding: "10px 12px",
          }}
        >
          <p style={{ fontSize: "10px", color: "#9A9080", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {layers.find((l) => l.id === activeLayer)?.label}
          </p>
          <div className="flex items-center gap-1">
            {legendColors.map((l, i) => (
              <div key={i} style={{ width: "16px", height: "8px", borderRadius: "4px", background: l.color }} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span style={{ fontSize: "9px", color: "#5C5548" }}>Safe</span>
            <span style={{ fontSize: "9px", color: "#5C5548" }}>Danger</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-[88px] md:bottom-8 left-0 right-0 z-10 px-4 md:w-[400px] md:right-auto md:left-4"
      >
        <div
          style={{
            background: "rgba(26,25,22,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,248,235,0.1)",
            borderRadius: "20px",
            padding: "16px",
          }}
        >
          <div className="flex items-center justify-between mb-12px">
            <p
              style={{
                fontSize: "11px",
                color: "#9A9080",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              NEARBY LOCATIONS
            </p>
          </div>
          <div
            className="fw-scroll flex gap-3 overflow-x-auto md:flex-col md:overflow-y-auto"
            style={{ paddingBottom: "4px", maxHeight: "40vh" }}
          >
            {nearbyPlaces.map((place) => (
              <div
                key={place.name}
                style={{
                  flexShrink: 0,
                  width: "160px",
                  background: "#222119",
                  border: "1px solid rgba(255,248,235,0.08)",
                  borderRadius: "14px",
                  padding: "12px",
                  cursor: "pointer",
                  transition: "border-color 200ms ease",
                }}
                className="md:w-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <MapPin size={12} color="#9A9080" />
                  <div
                    style={{
                      background: `${statusColors[place.status as keyof typeof statusColors]}18`,
                      border: `1px solid ${statusColors[place.status as keyof typeof statusColors]}40`,
                      borderRadius: "999px",
                      padding: "2px 8px",
                    }}
                  >
                    <span
                      className="fw-mono"
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: statusColors[place.status as keyof typeof statusColors],
                      }}
                    >
                      {place.score}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#F5EDD8", marginBottom: "2px" }}>
                  {place.name}
                </p>
                <p style={{ fontSize: "11px", color: "#9A9080", marginBottom: "8px" }}>{place.type}</p>
                <div className="flex gap-2">
                  <span style={{ fontSize: "10px", color: "#5C5548" }}>🌡 {place.temp}</span>
                  <span style={{ fontSize: "10px", color: "#5C5548" }}>💨 {place.aqi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
