import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { optimism } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Aether, Earth, & Art',
  projectId: '777',
  chains: [optimism],
});
