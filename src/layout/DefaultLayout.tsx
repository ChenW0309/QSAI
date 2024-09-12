import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import { useWalletStore } from '../store';

const DefaultLayout = () => {

  const { isConnected, isDisconnected } = useAccount();
  const { connectToWallet, disconnectFromWallet } = useWalletStore() as { connectToWallet: () => void, disconnectFromWallet: () => void };

  const [sidebarDesktopOpen, setSidebarDesktopOpen] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  useEffect(() => {
    if (isConnected) {
      connectToWallet();
    } else if (isDisconnected) {
      disconnectFromWallet();
    }
  }, [isConnected, isDisconnected]);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden bg-[#180938]">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarDesktopOpen={sidebarDesktopOpen} setSidebarDesktopOpen={setSidebarDesktopOpen} sidebarMobileOpen={sidebarMobileOpen} setSidebarMobileOpen={setSidebarMobileOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarDesktopOpen={sidebarDesktopOpen} sidebarMobileOpen={sidebarMobileOpen} setSidebarMobileOpen={setSidebarMobileOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className='min-h-[calc(100vh-80px)]'>
            <div className="min-h-full flex relative">
              {/* <img
                src='https://framerusercontent.com/images/nw1bTqpgHNELBRa4PB1qRVXgsQg.png'
                alt='jewel'
                className='absolute w-50 rotate-45 bottom-25 left-0' /> */}
              <img
                src='https://framerusercontent.com/images/nw1bTqpgHNELBRa4PB1qRVXgsQg.png'
                alt='jewel'
                className='absolute w-50 -rotate-45 bottom-25 right-0 z-99' />
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
