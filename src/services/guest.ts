/**
 * Guest mode service
 * For now, we only expose a check function stub.
 * Later, integrate with persisted storage or app store to determine user mode.
 */
export function isGuestMode(): boolean {
  // TODO: Implement real check (e.g., based on token or stored preference)
  return false;
}