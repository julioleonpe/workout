import { useState } from "react";

const hiitStructure = [
  { phase: "Warm-Up", duration: "2 min", intensity: "Easy", pct: "50–60% HR" },
  { phase: "Interval 1 — HARD", duration: "4 min", intensity: "Max effort", pct: "90–95% HR", isHard: true },
  { phase: "Recovery 1", duration: "3 min", intensity: "Easy pace", pct: "60–65% HR" },
  { phase: "Interval 2 — HARD", duration: "4 min", intensity: "Max effort", pct: "90–95% HR", isHard: true },
  { phase: "Recovery 2", duration: "3 min", intensity: "Easy pace", pct: "60–65% HR" },
  { phase: "Interval 3 — HARD", duration: "4 min", intensity: "Max effort", pct: "90–95% HR", isHard: true },
  { phase: "Recovery 3", duration: "3 min", intensity: "Easy pace", pct: "60–65% HR" },
  { phase: "Interval 4 — HARD", duration: "4 min", intensity: "Max effort", pct: "90–95% HR", isHard: true },
  { phase: "Cool-Down", duration: "3 min", intensity: "Very easy", pct: "50–55% HR" },
];

const cardioOptions = {
  pull: [
    { id: "row", name: "Rowing Machine", why: "Pull-dominant — primes lats & biceps, full posterior chain", tag: "BEST" },
    { id: "ski", name: "Ski Erg", why: "Upper-body pull pattern, high calorie burn", tag: "GREAT" },
    { id: "bike", name: "Assault Bike", why: "Full body, arms engaged throughout", tag: "GOOD" },
    { id: "treadmill", name: "Treadmill (Incline)", why: "Lower body only — full upper body recovery", tag: "ALT" },
  ],
  push: [
    { id: "bike", name: "Assault Bike", why: "Push-dominant arms — chest/shoulders stay under load", tag: "BEST" },
    { id: "stair", name: "Stairmaster", why: "Lower body dominant — upper body fully recovers", tag: "GREAT" },
    { id: "row", name: "Rowing Machine", why: "Mixed — lighter push recovery", tag: "GOOD" },
    { id: "treadmill", name: "Treadmill (Incline)", why: "Pure lower body — max upper body rest", tag: "ALT" },
  ],
  legs: [
    { id: "bike", name: "Assault Bike", why: "Low impact on joints — legs active but not loaded", tag: "BEST" },
    { id: "row", name: "Rowing Machine", why: "Upper body dominant — lets legs semi-recover", tag: "GREAT" },
    { id: "treadmill", name: "Treadmill (Incline)", why: "Glutes & hamstrings — extends leg stimulus lightly", tag: "GOOD" },
    { id: "stair", name: "Stairmaster", why: "High leg demand — only if legs feel fresh", tag: "ALT" },
  ],
  arms: [
    { id: "stair", name: "Stairmaster", why: "Pure lower body — arms fully recover", tag: "BEST" },
    { id: "treadmill", name: "Treadmill (Incline)", why: "Lower body only — arms rest completely", tag: "GREAT" },
    { id: "row", name: "Rowing Machine", why: "Arms engaged — extends stimulus lightly", tag: "GOOD" },
    { id: "bike", name: "Assault Bike", why: "Full body — arms under continued load", tag: "ALT" },
  ],
};

const tagColors = { BEST: "#059669", GREAT: "#0891B2", GOOD: "#7C3AED", ALT: "#555" };

// Stretch day — grouped by region
const stretchRoutine = [
  {
    region: "HIPS",
    color: "#FF6B35",
    icon: "◎",
    stretches: [
      { name: "90/90 Hip Stretch", hold: "60s each side", cue: "Sit tall, both legs at 90°. Lean forward over front shin. Switch sides.", focus: "Hip internal + external rotation, hip capsule" },
      { name: "Pigeon Pose", hold: "90s each side", cue: "Front shin parallel to mat. Sink hips down evenly. Fold forward for deeper release.", focus: "Glute med, piriformis, hip flexor" },
      { name: "Deep Squat Hold (Malasana)", hold: "60s", cue: "Feet shoulder-width, toes out. Elbows press knees out. Chest tall.", focus: "Hip adductors, groin, ankle mobility" },
      { name: "Lateral Hip Flexor Stretch", hold: "45s each side", cue: "Half-kneeling. Drive hip forward, squeeze glute of back leg. Don't arch low back.", focus: "Hip flexors, psoas, TFL" },
    ],
  },
  {
    region: "LOWER BACK",
    color: "#7C3AED",
    icon: "▽",
    stretches: [
      { name: "Child's Pose (wide knee)", hold: "90s", cue: "Knees wide, big toes touch. Arms extended, forehead to floor. Breathe into lower back.", focus: "QL, erector spinae, thoracolumbar fascia" },
      { name: "Supine Knee-to-Chest", hold: "45s each side + 45s both", cue: "Pull one knee to chest, keep opposite leg flat. Then both knees. Breathe out tension.", focus: "Lower lumbar, SI joint, glutes" },
      { name: "Cat-Cow (slow)", hold: "10 slow reps", cue: "On all fours. Exhale arch up (cat), inhale drop belly (cow). Move vertebra by vertebra.", focus: "Lumbar mobility, spinal articulation" },
      { name: "Supine Spinal Twist", hold: "60s each side", cue: "On back. One knee crosses body. Opposite arm out. Gaze away from knee.", focus: "QL, obliques, thoracic rotation" },
    ],
  },
  {
    region: "PELVIC FLOOR",
    color: "#0891B2",
    icon: "△",
    stretches: [
      { name: "Happy Baby", hold: "90s", cue: "On back. Grab outer edges of feet. Pull knees toward armpits. Rock gently side to side.", focus: "Pelvic floor release, inner groin, sacrum" },
      { name: "Supported Bridge + Breathing", hold: "10 breaths", cue: "Bridge up, hold. Inhale expand belly, exhale engage pelvic floor gently up and in. Don't brace.", focus: "Pelvic floor activation + release cycle" },
      { name: "Reclined Bound Angle (Supta Baddha Konasana)", hold: "2 min", cue: "On back. Soles of feet together, knees fall out. Arms relaxed. Breathe into inner thighs.", focus: "Pelvic floor, hip adductors, inner groin" },
      { name: "Standing Hip Circle", hold: "10 circles each direction", cue: "Feet hip-width. Slow large circles with hips. Smooth and controlled.", focus: "Pelvic mobility, hip joint lubrication" },
    ],
  },
  {
    region: "FULL BODY",
    color: "#059669",
    icon: "✦",
    stretches: [
      { name: "Doorway / Band Chest Stretch", hold: "45s each side", cue: "Arm at 90°, elbow on door frame. Step through and rotate chest open.", focus: "Pec major/minor, anterior shoulder" },
      { name: "Overhead Lat Stretch", hold: "45s each side", cue: "One arm overhead, grab something fixed. Lean away. Feel stretch down the side of the torso.", focus: "Lats, teres major, serratus anterior" },
      { name: "Thoracic Extension over Foam Roller", hold: "60s", cue: "Roller across mid-back. Support head. Let upper back extend over roller. Move up/down spine.", focus: "Thoracic mobility, postural reset" },
      { name: "Standing Forward Fold", hold: "60s", cue: "Feet hip-width. Soft knees. Hang completely — head heavy. Nod yes and no slowly.", focus: "Hamstrings, lumbar, cervical decompression" },
      { name: "Cross-Body Shoulder Stretch", hold: "30s each side", cue: "Pull arm across chest. Keep shoulder down. Don't rotate torso.", focus: "Rear delt, rhomboids, posterior capsule" },
      { name: "Wrist + Forearm Flexor/Extensor", hold: "30s each direction", cue: "Arm extended, palm up — pull fingers back. Then palm down — pull fingers back.", focus: "Forearm flexors/extensors, grip recovery" },
    ],
  },
];

const workouts = {
  pull: {
    label: "PULL", icon: "↑", color: "#0891B2", glow: "0 0 30px #0891B244",
    setA: {
      strength: [
        { exercise: "Weighted Pull-ups", sets: "3 × 5–6", muscles: "Lats, biceps, rear delts, rhomboids", note: "Heavy — add belt weight" },
        { exercise: "Barbell Bent-Over Row", sets: "3 × 6–8", muscles: "Mid/lower traps, rhomboids, lats, biceps", note: "Overhand grip" },
        { exercise: "Cable Seated Row (wide grip)", sets: "3 × 10", muscles: "Mid-back thickness, rear delts, biceps", note: "Elbows flared" },
        { exercise: "Cable Face Pull", sets: "2 × 15", muscles: "Rear delts, rotator cuff, upper traps", note: "Finisher — squeeze at peak" },
      ],
    },
    setB: {
      strength: [
        { exercise: "Barbell Deadlift", sets: "3 × 5", muscles: "Posterior chain — hamstrings, glutes, lats, traps, erectors", note: "Heavy — CNS prime" },
        { exercise: "Single-Arm Dumbbell Row", sets: "3 × 8", muscles: "Lats, rhomboids, rear delt, bicep", note: "Full range of motion" },
        { exercise: "Cable Straight-Arm Pulldown", sets: "3 × 12", muscles: "Lats isolation, teres major", note: "Keep arms straight, hinge at shoulder" },
        { exercise: "Incline Dumbbell Rear Delt Fly", sets: "2 × 15", muscles: "Rear delts, rhomboids", note: "Light weight, controlled" },
      ],
    },
  },
  push: {
    label: "PUSH", icon: "↓", color: "#FF6B35", glow: "0 0 30px #FF6B3544",
    setA: {
      strength: [
        { exercise: "Barbell Bench Press", sets: "3 × 5", muscles: "Chest, anterior delts, triceps", note: "Heavy — CNS first" },
        { exercise: "Overhead Press (OHP)", sets: "3 × 6–8", muscles: "Shoulders, upper chest, triceps, core", note: "Standing for core demand" },
        { exercise: "Incline Dumbbell Press", sets: "3 × 8–10", muscles: "Upper chest, anterior delts, triceps", note: "Less spinal load" },
        { exercise: "Cable Lateral Raise", sets: "2 × 15", muscles: "Medial delts", note: "Shoulder width finisher" },
      ],
    },
    setB: {
      strength: [
        { exercise: "Dumbbell Shoulder Press", sets: "3 × 6–8", muscles: "Shoulders, upper chest, triceps", note: "Neutral grip for joint health" },
        { exercise: "Incline Barbell Press", sets: "3 × 6–8", muscles: "Upper chest, anterior delts, triceps", note: "30–45° incline" },
        { exercise: "Cable Chest Fly (low-to-high)", sets: "3 × 12", muscles: "Lower/outer chest, anterior delts", note: "Full stretch at bottom" },
        { exercise: "Tricep Rope Pushdown", sets: "2 × 15", muscles: "Triceps long/lateral head", note: "Flare at bottom" },
      ],
    },
  },
  legs: {
    label: "LEGS", icon: "⬛", color: "#7C3AED", glow: "0 0 30px #7C3AED44",
    setA: {
      strength: [
        { exercise: "Barbell Back Squat", sets: "3 × 5", muscles: "Quads, glutes, hamstrings, core, erectors", note: "King of compounds — CNS first" },
        { exercise: "Romanian Deadlift (RDL)", sets: "3 × 8", muscles: "Hamstrings, glutes, lower back", note: "Control the eccentric" },
        { exercise: "Leg Press (wide stance)", sets: "3 × 10", muscles: "Quads, glutes, adductors", note: "Full depth, no knee lock-out" },
        { exercise: "Walking Lunges", sets: "2 × 12 each", muscles: "Quads, glutes, hamstrings, balance", note: "Dumbbell loaded" },
      ],
    },
    setB: {
      strength: [
        { exercise: "Barbell Front Squat", sets: "3 × 5", muscles: "Quads, core, upper back", note: "More quad dominant than back squat" },
        { exercise: "Bulgarian Split Squat", sets: "3 × 8 each", muscles: "Quads, glutes, hip flexors", note: "Rear foot elevated — brutal" },
        { exercise: "Seated Leg Curl", sets: "3 × 10–12", muscles: "Hamstrings isolation", note: "Slow eccentric 3s" },
        { exercise: "Goblet Squat", sets: "2 × 15", muscles: "Quads, glutes, adductors", note: "Metabolic finisher" },
      ],
    },
  },
  arms: {
    label: "ARMS+", icon: "◆", color: "#059669", glow: "0 0 30px #05966944",
    setA: {
      strength: [
        { exercise: "Barbell Curl", sets: "3 × 8", muscles: "Biceps long/short head, brachialis", note: "Full supination at top" },
        { exercise: "Skull Crushers (EZ Bar)", sets: "3 × 10", muscles: "Triceps all three heads", note: "Elbows tucked" },
        { exercise: "Barbell Shrug", sets: "3 × 12", muscles: "Upper traps, levator scapulae", note: "Hold 1s at top" },
        { exercise: "Hammer Curl", sets: "2 × 12", muscles: "Brachialis, brachioradialis, forearms", note: "Neutral grip" },
        { exercise: "Overhead Tricep Extension (cable)", sets: "2 × 15", muscles: "Triceps long head", note: "Full stretch overhead" },
      ],
    },
    setB: {
      strength: [
        { exercise: "Incline Dumbbell Curl", sets: "3 × 10", muscles: "Biceps long head, peak contraction", note: "Full stretch at bottom" },
        { exercise: "Close-Grip Bench Press", sets: "3 × 8", muscles: "Triceps, inner chest", note: "Compound — most weight on triceps" },
        { exercise: "Dumbbell Shrug (seated)", sets: "3 × 15", muscles: "Upper traps", note: "Slow and controlled" },
        { exercise: "Cable Curl", sets: "2 × 12", muscles: "Biceps, constant tension", note: "Don't swing" },
        { exercise: "Lateral Raise superset w/ Face Pull", sets: "2 × 12+12", muscles: "Medial delts + rear delts + traps", note: "No rest between exercises" },
      ],
    },
  },
};

const muscleGroupOrder = ["pull", "push", "legs", "arms", "stretch"];

// Estimate total time for stretch day
const totalStretchTime = () => {
  let mins = 0;
  stretchRoutine.forEach(group => {
    group.stretches.forEach(s => {
      const match = s.hold.match(/(\d+)s/g);
      if (match) match.forEach(m => { mins += parseInt(m) / 60; });
      const minMatch = s.hold.match(/(\d+)\s*min/);
      if (minMatch) mins += parseInt(minMatch[1]);
      const repMatch = s.hold.match(/(\d+)\s*rep/);
      if (repMatch) mins += (parseInt(repMatch[1]) * 5) / 60;
    });
  });
  return Math.round(mins);
};

export default function WorkoutApp() {
  const [activeGroup, setActiveGroup] = useState("pull");
  const [activeSet, setActiveSet] = useState("setA");
  const [expandedBlock, setExpandedBlock] = useState("strength");
  const [selectedCardio, setSelectedCardio] = useState({ pull: null, push: null, legs: null, arms: null });
  const [expandedStretchRegion, setExpandedStretchRegion] = useState("HIPS");

  const isStretchDay = activeGroup === "stretch";
  const group = isStretchDay ? null : workouts[activeGroup];
  const currentSet = group ? group[activeSet] : null;
  const accentColor = isStretchDay ? "#DB2777" : group.color;
  const groupGlow = isStretchDay ? "0 0 30px #DB277722" : group.glow;
  const options = isStretchDay ? null : cardioOptions[activeGroup];
  const lockedMachine = isStretchDay ? null : selectedCardio[activeGroup];
  const lockedOption = options ? options.find(o => o.id === lockedMachine) : null;

  return (
    <div style={{
      minHeight: "100vh", background: "#f4f4f0", color: "#1a1a2e",
      fontFamily: "'DM Mono', 'Courier New', monospace", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%",
        background: accentColor, opacity: 0.04, filter: "blur(80px)", transition: "background 0.5s ease",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", padding: "32px 20px 60px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "4px", color: accentColor, marginBottom: "8px", transition: "color 0.3s" }}>
            {isStretchDay ? "RECOVERY PROTOCOL · REST DAY · NO CARDIO" : "FAT BURN PROTOCOL · ADVANCED · FULL GYM"}
          </div>
          <h1 style={{ fontSize: "clamp(28px, 7vw, 42px)", fontWeight: "900", letterSpacing: "-2px", color: "#111", margin: 0, lineHeight: 1 }}>
            {isStretchDay ? <>STRETCH &<br /><span style={{ color: accentColor, transition: "color 0.3s" }}>RECOVERY</span></> : <>WORKOUT<br /><span style={{ color: accentColor, transition: "color 0.3s" }}>ROUTINES</span></>}
          </h1>
          <div style={{ marginTop: "12px", fontSize: "11px", color: "#888", letterSpacing: "2px" }}>
            {isStretchDay ? "HIPS · LOWER BACK · PELVIC FLOOR · FULL BODY" : "20 MIN STRENGTH → 30 MIN 4×4 NORWEGIAN HIIT"}
          </div>
        </div>

        {/* Tabs — 5 across */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px", marginBottom: "20px" }}>
          {muscleGroupOrder.map((key) => {
            const isActive = activeGroup === key;
            const isStr = key === "stretch";
            const g = isStr ? { label: "STRETCH", icon: "~", color: "#DB2777", glow: "0 0 30px #DB277722" } : workouts[key];
            const hasLocked = !isStr && selectedCardio[key] !== null;
            return (
              <button key={key} onClick={() => setActiveGroup(key)} style={{
                background: isActive ? (isStr ? "#DB2777" : g.color) : "#f0f0ec",
                color: isActive ? "#fff" : "#888",
                border: `1px solid ${isActive ? (isStr ? "#DB2777" : g.color) : "#ddddd8"}`,
                borderRadius: "6px", padding: "10px 2px", cursor: "pointer",
                fontFamily: "'DM Mono', monospace", fontWeight: "700",
                fontSize: "10px", letterSpacing: "1px", transition: "all 0.25s ease",
                boxShadow: isActive ? g.glow : "none", position: "relative",
              }}>
                {hasLocked && !isActive && (
                  <div style={{ position: "absolute", top: "4px", right: "4px", width: "5px", height: "5px", borderRadius: "50%", background: g.color }} />
                )}
                <div style={{ fontSize: "14px", marginBottom: "3px" }}>{g.icon}</div>
                {g.label}
              </button>
            );
          })}
        </div>

        {/* ── STRETCH DAY ── */}
        {isStretchDay && (
          <>
            {/* Stats banner */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "24px" }}>
              {[{ label: "REGIONS", value: "4" }, { label: "STRETCHES", value: stretchRoutine.reduce((a, r) => a + r.stretches.length, 0).toString() }, { label: "~TOTAL", value: `${totalStretchTime()} MIN` }].map(({ label, value }) => (
                <div key={label} style={{ background: "#f0f0ec", border: "1px solid #ddddd8", borderRadius: "6px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "9px", color: "#777", letterSpacing: "2px", marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#DB2777" }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Instruction */}
            <div style={{ padding: "12px 16px", background: "#f0f0ec", border: "1px solid #ddddd8", borderRadius: "8px", marginBottom: "20px", fontSize: "10px", color: "#888", letterSpacing: "1px", lineHeight: "1.9" }}>
              🌿 NO CARDIO TODAY — ONLY STRETCH & BREATHE<br />
              🌿 HOLD EACH STRETCH THROUGH FULL DURATION — NO BOUNCING<br />
              🌿 EXHALE INTO THE STRETCH · INHALE TO RESET
            </div>

            {/* Stretch regions */}
            {stretchRoutine.map((region) => {
              const isOpen = expandedStretchRegion === region.region;
              return (
                <div key={region.region} style={{
                  marginBottom: "10px", background: "#ffffff",
                  border: `1px solid ${isOpen ? region.color + "66" : "#ddddd8"}`,
                  borderRadius: "10px", overflow: "hidden", transition: "border-color 0.3s",
                  boxShadow: isOpen ? `0 0 24px ${region.color}22` : "none",
                }}>
                  <button onClick={() => setExpandedStretchRegion(isOpen ? null : region.region)} style={{
                    width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "transparent", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", color: "#1a1a2e",
                  }}>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "16px", color: region.color }}>{region.icon}</span>
                        <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "2px", color: isOpen ? region.color : "#555" }}>{region.region}</span>
                      </div>
                      <div style={{ fontSize: "9px", color: "#777", letterSpacing: "2px", marginTop: "3px", paddingLeft: "26px" }}>{region.stretches.length} STRETCHES</div>
                    </div>
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "50%",
                      background: isOpen ? region.color : "#e2e2dc",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", color: isOpen ? "#fff" : "#888",
                      transition: "all 0.25s ease", flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}>▼</div>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 16px 16px" }}>
                      {region.stretches.map((s, i) => (
                        <div key={i} style={{
                          padding: "14px 16px", background: i % 2 === 0 ? "#f0f0ec" : "#ffffff",
                          borderRadius: "6px", marginBottom: "6px",
                          borderLeft: `3px solid ${region.color}`,
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                            <div style={{ fontSize: "13px", fontWeight: "700", color: "#111", flex: 1 }}>{s.name}</div>
                            <div style={{ fontSize: "11px", color: region.color, fontWeight: "700", whiteSpace: "nowrap" }}>{s.hold}</div>
                          </div>
                          <div style={{ fontSize: "10px", color: "#888", marginTop: "4px" }}>{s.focus}</div>
                          <div style={{ fontSize: "10px", color: "#888", marginTop: "5px", lineHeight: "1.6", fontStyle: "italic" }}>→ {s.cue}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* ── WORKOUT DAYS ── */}
        {!isStretchDay && (
          <>
            {/* Set A / B toggle */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px", background: "#f0f0ec", borderRadius: "8px", padding: "4px", border: "1px solid #ddddd8" }}>
              {["setA", "setB"].map((s) => (
                <button key={s} onClick={() => setActiveSet(s)} style={{
                  flex: 1, padding: "10px", borderRadius: "5px",
                  background: activeSet === s ? "#ffffff" : "transparent",
                  color: activeSet === s ? accentColor : "#999",
                  border: activeSet === s ? `1px solid ${accentColor}33` : "1px solid transparent",
                  fontFamily: "'DM Mono', monospace", fontWeight: "700",
                  fontSize: "12px", letterSpacing: "3px", cursor: "pointer", transition: "all 0.2s ease",
                }}>
                  {s === "setA" ? "SET A" : "SET B"}
                </button>
              ))}
            </div>

            {/* Duration banner */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "24px" }}>
              {[{ label: "TOTAL", value: "50 MIN" }, { label: "STRENGTH", value: "20 MIN" }, { label: "HIIT", value: "30 MIN" }].map(({ label, value }) => (
                <div key={label} style={{ background: "#f0f0ec", border: "1px solid #ddddd8", borderRadius: "6px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "9px", color: "#777", letterSpacing: "2px", marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: accentColor, transition: "color 0.3s" }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Strength block */}
            <div style={{
              marginBottom: "12px", background: "#ffffff",
              border: `1px solid ${expandedBlock === "strength" ? accentColor + "66" : "#ddddd8"}`,
              borderRadius: "10px", overflow: "hidden", transition: "border-color 0.3s",
              boxShadow: expandedBlock === "strength" ? groupGlow : "none",
            }}>
              <button onClick={() => setExpandedBlock(expandedBlock === "strength" ? null : "strength")} style={{
                width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "transparent", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", color: "#1a1a2e",
              }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "1px" }}>💪 STRENGTH BLOCK</div>
                  <div style={{ fontSize: "9px", color: "#777", letterSpacing: "2px", marginTop: "3px" }}>FIRST — CNS IS FRESHEST</div>
                </div>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  background: expandedBlock === "strength" ? accentColor : "#e2e2dc",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", color: expandedBlock === "strength" ? "#fff" : "#888",
                  transition: "all 0.25s ease", flexShrink: 0,
                  transform: expandedBlock === "strength" ? "rotate(180deg)" : "rotate(0deg)",
                }}>▼</div>
              </button>
              {expandedBlock === "strength" && (
                <div style={{ padding: "0 16px 16px" }}>
                  {currentSet.strength.map((row, i) => (
                    <div key={i} style={{
                      padding: "14px 16px", background: i % 2 === 0 ? "#f5f5f2" : "#ffffff",
                      borderRadius: "6px", marginBottom: "6px", borderLeft: `3px solid ${accentColor}`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: "#111", flex: 1 }}>{row.exercise}</div>
                        <div style={{ fontSize: "11px", color: accentColor, fontWeight: "700", whiteSpace: "nowrap" }}>{row.sets}</div>
                      </div>
                      <div style={{ fontSize: "10px", color: "#888", marginTop: "4px" }}>{row.muscles}</div>
                      {row.note && <div style={{ fontSize: "10px", color: "#777", marginTop: "3px", fontStyle: "italic" }}>→ {row.note}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cardio block */}
            <div style={{
              marginBottom: "12px", background: "#ffffff",
              border: `1px solid ${expandedBlock === "cardio" ? accentColor + "66" : "#ddddd8"}`,
              borderRadius: "10px", overflow: "hidden", transition: "border-color 0.3s",
              boxShadow: expandedBlock === "cardio" ? groupGlow : "none",
            }}>
              <button onClick={() => setExpandedBlock(expandedBlock === "cardio" ? null : "cardio")} style={{
                width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "transparent", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", color: "#1a1a2e",
              }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "1px" }}>🔥 CARDIO — 4×4 NORWEGIAN HIIT</div>
                  <div style={{ fontSize: "9px", color: "#777", letterSpacing: "2px", marginTop: "3px" }}>
                    {lockedOption ? `LOCKED: ${lockedOption.name.toUpperCase()}` : "TAP TO SELECT YOUR MACHINE"}
                  </div>
                </div>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  background: expandedBlock === "cardio" ? accentColor : "#e2e2dc",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", color: expandedBlock === "cardio" ? "#fff" : "#888",
                  transition: "all 0.25s ease", flexShrink: 0,
                  transform: expandedBlock === "cardio" ? "rotate(180deg)" : "rotate(0deg)",
                }}>▼</div>
              </button>

              {expandedBlock === "cardio" && (
                <div style={{ padding: "0 16px 16px" }}>
                  {/* Machine picker */}
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "9px", color: "#888", letterSpacing: "3px", marginBottom: "10px" }}>
                      SELECT MACHINE — RANKED FOR {group.label} DAY
                    </div>
                    {options.map((opt) => {
                      const isSelected = lockedMachine === opt.id;
                      const tColor = tagColors[opt.tag];
                      return (
                        <button key={opt.id} onClick={() => setSelectedCardio(prev => ({ ...prev, [activeGroup]: isSelected ? null : opt.id }))} style={{
                          width: "100%", marginBottom: "6px", padding: "12px 14px",
                          background: isSelected ? accentColor + "18" : "#f5f5f2",
                          border: `1px solid ${isSelected ? accentColor : "#ddddd8"}`,
                          borderRadius: "8px", cursor: "pointer", textAlign: "left",
                          fontFamily: "'DM Mono', monospace", transition: "all 0.2s ease",
                          display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px",
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                              <span style={{ fontSize: "12px", fontWeight: "700", color: isSelected ? accentColor : "#333" }}>{opt.name}</span>
                              <span style={{ fontSize: "8px", color: tColor, border: `1px solid ${tColor}`, borderRadius: "3px", padding: "1px 5px", letterSpacing: "1px" }}>{opt.tag}</span>
                            </div>
                            <div style={{ fontSize: "10px", color: "#777", fontStyle: "italic" }}>{opt.why}</div>
                          </div>
                          <div style={{
                            width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                            border: `2px solid ${isSelected ? accentColor : "#bbb"}`,
                            background: isSelected ? accentColor : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                          }}>
                            {isSelected && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#000" }} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* HIIT protocol */}
                  <div>
                    <div style={{ fontSize: "9px", color: "#888", letterSpacing: "3px", marginBottom: "10px" }}>
                      4×4 PROTOCOL — 30 MIN{lockedOption ? ` · ${lockedOption.name.toUpperCase()}` : ""}
                    </div>
                    {hiitStructure.map((row, i) => (
                      <div key={i} style={{
                        padding: "11px 14px", marginBottom: "4px", borderRadius: "6px",
                        background: row.isHard ? "#fff3ee" : "#f5f5f2",
                        borderLeft: `3px solid ${row.isHard ? "#E85D20" : "#c8c8d0"}`,
                        display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px",
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "11px", fontWeight: row.isHard ? "700" : "400", color: row.isHard ? "#E85D20" : "#666" }}>{row.phase}</div>
                          <div style={{ fontSize: "9px", color: "#999", marginTop: "2px" }}>{row.intensity} · {row.pct}</div>
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: "700", color: row.isHard ? "#E85D20" : "#aaa", whiteSpace: "nowrap" }}>{row.duration}</div>
                      </div>
                    ))}
                    <div style={{ marginTop: "12px", padding: "10px 14px", background: "#f0f0ec", borderRadius: "6px", fontSize: "9px", color: "#777", letterSpacing: "1px", lineHeight: "1.8" }}>
                      ⚡ TARGET 90–95% MAX HR ON HARD INTERVALS<br />
                      ⚡ HARD = YOU CANNOT HOLD A CONVERSATION<br />
                      ⚡ RECOVERY = FULLY PREP FOR NEXT INTERVAL
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              marginTop: "24px", padding: "16px 20px", background: "#ffffff",
              border: "1px solid #ddddd8", borderRadius: "8px",
              fontSize: "10px", color: "#888", letterSpacing: "1px", lineHeight: "1.8",
            }}>
              ⚡ STRENGTH FIRST — CNS PRIMED, GLYCOGEN DEPLETES, CARDIO BURNS FAT FASTER<br />
              ⚡ REST 60–75s BETWEEN SETS TO KEEP HEART RATE ELEVATED<br />
              ⚡ FULL GYM · ADVANCED · COMPOUND-PRIORITY
            </div>
          </>
        )}
      </div>
    </div>
  );
}
