import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { ChevronRight, TrendingUp, Award, Calendar } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const statusColors = {
  safe: "#7DBF72",
  caution: "#E8B94F",
  danger: "#D96B4E",
};

const filters = ["All", "Walk", "Run", "Cycle"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1A1916",
          border: "1px solid rgba(255,248,235,0.1)",
          borderRadius: "10px",
          padding: "8px 12px",
        }}
      >
        <p style={{ fontSize: "11px", color: "#9A9080", marginBottom: "3px" }}>{label}</p>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#E8B94F" }}>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function HistoryPage() {
  const { history } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    return activeFilter === "All"
      ? history
      : history.filter((a) => a.type.toLowerCase() === activeFilter.toLowerCase());
  }, [history, activeFilter]);

  const stats = useMemo(() => {
    if (history.length === 0) return { avgScore: 0, bestDay: "N/A", count: 0 };
    const avg = Math.round(history.reduce((sum, a) => sum + a.score, 0) / history.length);
    const best = [...history].sort((a, b) => b.score - a.score)[0];
    return {
      avgScore: avg,
      bestDay: best.date.split(",")[0],
      count: history.length,
    };
  }, [history]);

  const weeklyScores = useMemo(() => {
    // Basic day aggregation (simplified for demo)
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const scores = days.map(day => {
      const dayData = history.filter(h => h.date.startsWith(day));
      if (dayData.length === 0) return { day, score: 0 };
      const avg = Math.round(dayData.reduce((sum, d) => sum + d.score, 0) / dayData.length);
      return { day, score: avg };
    });
    return scores;
  }, [history]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ padding: "0 16px 24px" }}
    >
      {/* Header */}
      <motion.div variants={itemVariants} style={{ padding: "20px 4px 16px" }}>
        <h2
          className="fw-display"
          style={{ fontSize: "22px", color: "#F5EDD8", marginBottom: "2px" }}
        >
          Activity Log
        </h2>
        <p style={{ fontSize: "13px", color: "#9A9080" }}>Your outdoor fitness history</p>
      </motion.div>

      {/* Filter Chips */}
      <motion.div variants={itemVariants} className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid",
              borderColor:
                activeFilter === f ? "#E8B94F" : "rgba(255,248,235,0.1)",
              background:
                activeFilter === f ? "rgba(232,185,79,0.12)" : "transparent",
              color: activeFilter === f ? "#E8B94F" : "#9A9080",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
          >
            {f}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stats & Charts */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
          {/* Week Summary Card */}
          <motion.div variants={itemVariants} className="fw-card" style={{ padding: "20px" }}>
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
              WEEKLY SUMMARY
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Calendar size={16} />, value: stats.count, label: "Activities" },
                { icon: <TrendingUp size={16} />, value: stats.avgScore, label: "Avg Score" },
                { icon: <Award size={16} />, value: stats.bestDay, label: "Best Day" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="fw-data-pill flex-1 text-center"
                  style={{ padding: "12px 8px" }}
                >
                  <div style={{ color: "#E8B94F", display: "flex", justifyContent: "center", marginBottom: "5px" }}>
                    {stat.icon}
                  </div>
                  <div
                    className="fw-mono"
                    style={{ fontSize: "18px", fontWeight: 700, color: "#F5EDD8" }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "10px", color: "#9A9080", marginTop: "2px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Trend Chart */}
          <motion.div variants={itemVariants} className="fw-card" style={{ padding: "20px" }}>
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
              7-DAY SAFETY TREND
            </p>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={weeklyScores} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,248,235,0.05)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#5C5548", fontFamily: "'DM Sans'" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: "#5C5548", fontFamily: "'DM Sans'" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,248,235,0.03)" }} />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} animationBegin={0} animationDuration={900}>
                  {weeklyScores.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.score >= 75 ? "#7DBF72" : entry.score >= 50 ? "#E8B94F" : entry.score === 0 ? "rgba(255,248,235,0.05)" : "#D96B4E"
                      }
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex-1">
            <p
              style={{
                fontSize: "11px",
                color: "#9A9080",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "10px",
                padding: "0 4px",
              }}
            >
              {activeFilter === "All" ? "RECENT ACTIVITIES" : `${activeFilter.toUpperCase()} LOG`}
            </p>
            <div className="flex flex-col gap-3">
              {filtered.length === 0 ? (
                <div className="text-center py-10 fw-card">
                  <p style={{ color: "#5C5548", fontSize: "14px" }}>No activities found for this filter.</p>
                </div>
              ) : (
                filtered.map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                    className="fw-card"
                    style={{ padding: "16px" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "14px",
                          background: "#222119",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                          flexShrink: 0,
                        }}
                      >
                        {activity.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p style={{ fontSize: "14px", fontWeight: 700, color: "#F5EDD8" }}>
                            {activity.label}
                          </p>
                          <div
                            style={{
                              background: `${statusColors[activity.status as keyof typeof statusColors]}18`,
                              border: `1px solid ${statusColors[activity.status as keyof typeof statusColors]}40`,
                              borderRadius: "999px",
                              padding: "3px 10px",
                            }}
                          >
                            <span
                              className="fw-mono"
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: statusColors[activity.status as keyof typeof statusColors],
                              }}
                            >
                              {activity.score}
                            </span>
                          </div>
                        </div>
                        <p style={{ fontSize: "12px", color: "#9A9080", marginBottom: "8px" }}>
                          {activity.date} · {activity.time} · {activity.duration}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3">
                            {[
                              { icon: "🌡", val: activity.temp },
                              { icon: "☀️", val: `UV ${activity.uv}` },
                              { icon: "💨", val: `AQI ${activity.aqi}` },
                            ].map((item) => (
                              <span key={item.icon} style={{ fontSize: "11px", color: "#5C5548" }}>
                                {item.icon} {item.val}
                              </span>
                            ))}
                          </div>
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "2px",
                              color: "#E8B94F",
                              fontSize: "11px",
                              fontWeight: 600,
                            }}
                          >
                            Details <ChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
