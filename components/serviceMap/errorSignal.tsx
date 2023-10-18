import { signal } from "@preact/signals";

export const errorSignal = signal<string | null>(null);
