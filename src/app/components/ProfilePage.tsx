import { useState } from "react";
import { motion } from "motion/react";
import { Edit3, Minus, Plus, Watch, Smartphone, Activity } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

const healthConditions = ["Asthma", "Hypertension", "Diabetes", "Heart Disease", "None"];
const fitnessLevels = ["Beginner", "Moderate", "Athletic"];
const defaultActivities = ["Walking", "Running", "Cycling", "Swimming"];
const workoutTimes = ["Early Morning", "Morning", "Evening", "Night"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "44px",
        height: "24px",
        borderRadius: "999px",
        background: enabled ? "#E8B94F" : "#2A2620",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 250ms ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3px",
          left: enabled ? "23px" : "3px",
          width: "18px",
          height: "18px",
          borderRadius: "999px",
          background: enabled ? "#111110" : "#5C5548",
          transition: "left 250ms ease, background 250ms ease",
        }}
      />
    </button>
  );
}

export function ProfilePage() {
  const { user, setUser, saveProfile } = useAppContext();
  
  // Local state for non-persisted UI toggles (simulated)
  const [notifications, setNotifications] = useState({
    activityReminders: true,
    hydrationAlerts: true,
    uvWarnings: true,
    weeklyReport: false,
    communityCheckins: false,
  });
  const [weeklyReport, setWeeklyReport] = useState(true);

  const handleUpdate = (updates: Partial<typeof user>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const toggleCondition = (condition: string) => {
    if (condition === "None") {
      handleUpdate({ healthConditions: ["None"] });
    } else {
      const current = user.healthConditions;
      const withoutNone = current.filter((c) => c !== "None");
      if (withoutNone.includes(condition)) {
        const next = withoutNone.filter((c) => c !== condition);
        handleUpdate({ healthConditions: next.length === 0 ? ["None"] : next });
      } else {
        handleUpdate({ healthConditions: [...withoutNone, condition] });
      }
    }
  };

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onSave = () => {
    saveProfile();
    toast.success("Profile saved successfully!");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ padding: "0 16px 24px" }}
    >
      {/* Avatar / Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center"
        style={{ padding: "28px 0 20px" }}
      >
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #E8B94F, #C49A30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 800,
              color: "#111110",
              border: "3px solid rgba(232,185,79,0.3)",
            }}
          >
            {user.name.charAt(0)}
          </div>
          <button
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "26px",
              height: "26px",
              borderRadius: "999px",
              background: "#E8B94F",
              border: "2px solid #111110",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Edit3 size={12} color="#111110" />
          </button>
        </div>
        <h2
          className="fw-display"
          style={{ fontSize: "20px", color: "#F5EDD8", marginBottom: "2px" }}
        >
          {user.name === "User" ? "Guest User" : user.name}
        </h2>
        <p style={{ fontSize: "13px", color: "#9A9080" }}>{user.location}</p>
        <div
          style={{
            marginTop: "10px",
            background: "rgba(232,185,79,0.1)",
            border: "1px solid rgba(232,185,79,0.25)",
            borderRadius: "999px",
            padding: "4px 14px",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#E8B94F" }}>
            {user.fitnessLevel} · {user.age} yrs
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Health Profile Card */}
          <motion.div variants={itemVariants} className="fw-card transition-all hover:border-[#E8B94F40]" style={{ padding: "20px" }}>
            <p
              style={{
                fontSize: "11px",
                color: "#9A9080",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              HEALTH PROFILE
            </p>

            {/* Age Stepper */}
            <div className="mb-4">
              <p style={{ fontSize: "13px", color: "#9A9080", marginBottom: "8px" }}>Age</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleUpdate({ age: Math.max(10, user.age - 1) })}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    background: "#222119",
                    border: "1px solid rgba(255,248,235,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Minus size={16} color="#9A9080" />
                </button>
                <span
                  className="fw-mono"
                  style={{ fontSize: "24px", fontWeight: 700, color: "#F5EDD8", minWidth: "48px", textAlign: "center" }}
                >
                  {user.age}
                </span>
                <button
                  onClick={() => handleUpdate({ age: Math.min(100, user.age + 1) })}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    background: "#222119",
                    border: "1px solid rgba(255,248,235,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={16} color="#9A9080" />
                </button>
              </div>
            </div>

            {/* Fitness Level */}
            <div className="mb-4">
              <p style={{ fontSize: "13px", color: "#9A9080", marginBottom: "8px" }}>Fitness Level</p>
              <div className="flex gap-2">
                {fitnessLevels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => handleUpdate({ fitnessLevel: lvl })}
                    style={{
                      flex: 1,
                      padding: "8px 4px",
                      borderRadius: "999px",
                      border: "1px solid",
                      borderColor: user.fitnessLevel === lvl ? "#E8B94F" : "rgba(255,248,235,0.1)",
                      background: user.fitnessLevel === lvl ? "rgba(232,185,79,0.12)" : "transparent",
                      color: user.fitnessLevel === lvl ? "#E8B94F" : "#9A9080",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 200ms ease",
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Conditions */}
            <div>
              <p style={{ fontSize: "13px", color: "#9A9080", marginBottom: "8px" }}>Health Conditions</p>
              <div className="flex flex-wrap gap-2">
                {healthConditions.map((cond) => {
                  const isSelected = user.healthConditions.includes(cond);
                  return (
                    <button
                      key={cond}
                      onClick={() => toggleCondition(cond)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        border: "1px solid",
                        borderColor: isSelected ? "#E8B94F" : "rgba(255,248,235,0.1)",
                        background: isSelected ? "rgba(232,185,79,0.12)" : "transparent",
                        color: isSelected ? "#E8B94F" : "#9A9080",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 200ms ease",
                      }}
                    >
                      {cond}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Preferences Card */}
          <motion.div variants={itemVariants} className="fw-card transition-all hover:border-[#E8B94F40]" style={{ padding: "20px" }}>
            <p
              style={{
                fontSize: "11px",
                color: "#9A9080",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              PREFERENCES
            </p>

            <div className="mb-4">
              <p style={{ fontSize: "13px", color: "#9A9080", marginBottom: "8px" }}>Default Activity</p>
              <div className="flex gap-2 flex-wrap">
                {defaultActivities.map((act) => (
                  <button
                    key={act}
                    onClick={() => handleUpdate({ defaultActivity: act })}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "999px",
                      border: "1px solid",
                      borderColor: user.defaultActivity === act ? "#E8B94F" : "rgba(255,248,235,0.1)",
                      background: user.defaultActivity === act ? "rgba(232,185,79,0.12)" : "transparent",
                      color: user.defaultActivity === act ? "#E8B94F" : "#9A9080",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 200ms ease",
                    }}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: "13px", color: "#9A9080", marginBottom: "8px" }}>Preferred Workout Time</p>
              <div className="flex gap-2 flex-wrap">
                {workoutTimes.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleUpdate({ workoutTime: t })}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "999px",
                      border: "1px solid",
                      borderColor: user.workoutTime === t ? "#E8B94F" : "rgba(255,248,235,0.1)",
                      background: user.workoutTime === t ? "rgba(232,185,79,0.12)" : "transparent",
                      color: user.workoutTime === t ? "#E8B94F" : "#9A9080",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 200ms ease",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Connected Devices */}
          <motion.div variants={itemVariants} className="fw-card transition-all hover:border-[#E8B94F40]" style={{ padding: "20px" }}>
            <p
              style={{
                fontSize: "11px",
                color: "#9A9080",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              CONNECTED DEVICES
            </p>
            {[
              { name: "Apple Watch", icon: Watch, connected: true, sub: "Series 9 · Last sync 2h ago" },
              { name: "Fitbit", icon: Activity, connected: false, sub: "Not connected" },
              { name: "Garmin", icon: Smartphone, connected: false, sub: "Not connected" },
            ].map((device) => {
              const Icon = device.icon;
              return (
                <div
                  key={device.name}
                  className="flex items-center justify-between"
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255,248,235,0.06)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "12px",
                        background: device.connected ? "rgba(232,185,79,0.12)" : "#222119",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={18} color={device.connected ? "#E8B94F" : "#5C5548"} />
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#F5EDD8" }}>{device.name}</p>
                      <p style={{ fontSize: "11px", color: "#9A9080" }}>{device.sub}</p>
                    </div>
                  </div>
                  {device.connected ? (
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#7DBF72",
                        background: "rgba(125,191,114,0.12)",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        border: "1px solid rgba(125,191,114,0.25)",
                      }}
                    >
                      SYNCED
                    </div>
                  ) : (
                    <button
                      onClick={() => toast.info(`Connecting to ${device.name}...`)}
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#E8B94F",
                        background: "transparent",
                        border: "1px solid rgba(232,185,79,0.3)",
                        borderRadius: "999px",
                        padding: "4px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Connect
                    </button>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Notification Settings */}
          <motion.div variants={itemVariants} className="fw-card transition-all hover:border-[#E8B94F40]" style={{ padding: "20px" }}>
            <p
              style={{
                fontSize: "11px",
                color: "#9A9080",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              NOTIFICATIONS
            </p>
            {[
              { key: "activityReminders", label: "Activity Reminders", desc: "Get nudges at your preferred workout time" },
              { key: "hydrationAlerts", label: "Hydration Alerts", desc: "Reminders to drink water based on conditions" },
              { key: "uvWarnings", label: "UV Warnings", desc: "Alert when UV index becomes dangerous" },
              { key: "communityCheckins", label: "Community Check-ins", desc: "See how others are doing in your area" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between"
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,248,235,0.06)",
                }}
              >
                <div style={{ flex: 1, marginRight: "12px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#F5EDD8", marginBottom: "2px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "11px", color: "#9A9080" }}>{item.desc}</p>
                </div>
                <Toggle
                  enabled={notifications[item.key as keyof typeof notifications]}
                  onToggle={() => toggleNotif(item.key as keyof typeof notifications)}
                />
              </div>
            ))}
          </motion.div>

          {/* Weekly Report */}
          <motion.div variants={itemVariants} className="fw-card transition-all hover:border-[#E8B94F40]" style={{ padding: "20px" }}>
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-3">
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#F5EDD8", marginBottom: "3px" }}>
                  📊 Weekly Fitness–Weather Report
                </p>
                <p style={{ fontSize: "12px", color: "#9A9080" }}>
                  Receive an AI-generated weekly analysis of your activity patterns and environmental exposure every Monday.
                </p>
              </div>
              <Toggle enabled={weeklyReport} onToggle={() => setWeeklyReport(!weeklyReport)} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Save Button */}
      <motion.div variants={itemVariants}>
        <button 
          className="fw-btn-primary w-full group"
          onClick={onSave}
        >
          <span className="group-active:scale-95 transition-transform inline-block">Save Profile</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
