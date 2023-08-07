'use client';
import { RecoilRoot } from 'recoil';

export default function GlobalStateRoot({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
