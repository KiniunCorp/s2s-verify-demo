// Network interchange, in basis points.
const NETWORK_FEE_BPS = {
  visa: 29,
  mastercard: 29,
  amex: 175,
};

export function networkFeeBps(network) {
  if (network in NETWORK_FEE_BPS) {
    return NETWORK_FEE_BPS[network];
  }
  return 29;
}

export function applePayTotalCents(subtotalCents, network) {
  const fee = Math.round((subtotalCents * networkFeeBps(network)) / 10000);
  return subtotalCents + fee;
}
