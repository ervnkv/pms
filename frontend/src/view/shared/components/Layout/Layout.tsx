import { Container } from '@mui/material';
import { ReactNode } from 'react';
import { Header } from '../Header';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container maxWidth={'xl'}>{children}</Container>
    </>
  );
}
