declare var process: Process;

interface Process {
  env: Env;
}

interface Env {
  FIREBASE_KEY: string;
  MAPS_KEY: string;
}

interface GlobalEnvironment {
  process: Process;
}
