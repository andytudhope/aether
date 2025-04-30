import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Hekima Wisdom',
  projectId: '888',
  chains: [base],
});
