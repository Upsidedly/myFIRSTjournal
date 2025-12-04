// Dictionary definitions for double-bracketed terms
export interface DictionaryEntry {
  term: string;
  definition: string;
  category?: string;
  mainPage?: string; // Optional link to main article/page
}

export const dictionary: Record<string, DictionaryEntry> = {
  "robot": {
    term: "Robot",
    definition: "A programmable machine capable of carrying out a complex series of actions automatically.",
    category: "General",
    mainPage: "/docs/getting-started"
  },
  "ftc": {
    term: "FTC",
    definition: "FIRST Tech Challenge is a robotics competition for students in grades 7-12 organised by FIRST. The world championship is held in Houston, Texas, every year.",
    category: "Competition",
    // mainPage: "/docs/getting-started"
  },
  "autonomous": {
    term: "Autonomous",
    definition: "A period in FTC matches where robots operate without human control using pre-programmed instructions.",
    category: "Competition"
  },
  "teleop": {
    term: "TeleOp",
    definition: "Teleoperated period where drivers control the robot using gamepads.",
    category: "Competition"
  },
  "servo": {
    term: "Servo",
    definition: "A rotary actuator that allows for precise control of angular position.",
    category: "Hardware"
  },
  "motor": {
    term: "Motor",
    definition: "An electrical component that converts electrical energy into mechanical motion.",
    category: "Hardware"
  },
  "sensor": {
    term: "Sensor",
    definition: "A device that detects and responds to input from the physical environment.",
    category: "Hardware"
  },
  "pid": {
    term: "PID",
    definition: "Proportional-Integral-Derivative controller - A control loop mechanism for precise automated control.",
    category: "Programming"
  },
  "odometry": {
    term: "Odometry",
    definition: "The use of data from motion sensors to estimate change in position over time.",
    category: "Programming"
  },
  // Add more terms as needed
};

export function getDictionaryEntry(term: string): DictionaryEntry | null {
  const key = term.toLowerCase().trim();
  return dictionary[key] || null;
}
