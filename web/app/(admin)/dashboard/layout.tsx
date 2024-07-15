import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Layout = async () => {
  const session = await auth();
  if (session?.user.role === 'User') {
    redirect('/');
  }
  return <div></div>;
};

export default Layout;
