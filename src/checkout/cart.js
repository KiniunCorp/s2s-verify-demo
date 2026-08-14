export function subtotalCents(lines) {
  return lines.reduce((sum, line) => sum + line.unitCents * line.qty, 0);
}
