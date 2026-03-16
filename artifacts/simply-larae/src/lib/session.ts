import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'simply_larae_session_id';

export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

const INTAKE_KEY = 'simply_larae_intake_data';
const SERVICE_ID_KEY = 'simply_larae_service_id';

export function saveIntakeData(data: any) {
  sessionStorage.setItem(INTAKE_KEY, JSON.stringify(data));
}

export function getIntakeData(): any {
  const data = sessionStorage.getItem(INTAKE_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveServiceId(id: number) {
  sessionStorage.setItem(SERVICE_ID_KEY, id.toString());
}

export function getServiceId(): number | null {
  const id = sessionStorage.getItem(SERVICE_ID_KEY);
  return id ? parseInt(id, 10) : null;
}

export function clearIntakeSession() {
  sessionStorage.removeItem(INTAKE_KEY);
  sessionStorage.removeItem(SERVICE_ID_KEY);
}
