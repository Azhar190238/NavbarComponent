
"use client";
import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import ThemeControl from '@/components/ThemeControl';

// Dropdown menu items for "Home"
const items = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/home1">
        Home 1
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/home2">
        Home 2
      </a>
    ),
    key: '1',
  },
];

const more = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/home1">
        more 1
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/home2">
        more 2
      </a>
    ),
    key: '1',
  },
];

const Navbar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);

  // Navbar links including dropdown for "Home"
  const links = [
    {
      name: 'Home',
      dropdown: (
        <Dropdown
          className=''
          menu={{
            items,
          }}
        >
          <a
            onClick={(e) => e.preventDefault()}
            className={`flex items-center space-x-1 ${activeLink === 'Home' ? 'text-[#E67529]' : 'text-[#2B2B2B] dark:text-white'}`}
          >
            <Space>
              Home
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Shop', path: '/shop' },
    { name: 'Blogs', path: '/blogs' },
    // { name: 'More', path: '/More' },
    {
      name: 'Home',
      dropdown: (
        <Dropdown
          className=''
          menu={{
            items,
          }}
        >
          <a
            onClick={(e) => e.preventDefault()}
            className={`flex items-center space-x-1 ${activeLink === 'More' ? 'text-[#E67529]' : 'text-[#2B2B2B] dark:text-white'}`}
          >
            <Space>
              More
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];




  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle link click and set active link
  const handleLinkClick = (linkName, path) => {
    setActiveLink(linkName);
    setIsOpen(false); // Close menu for mobile
    if (path) {
      router.push(path);
    }
  };

  return (
    <nav className="bg-white dark:bg-[#2B2B2B] shadow-md">
      <div className="max-w-[1320px] mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="">
          <Image src="/images/Logo.png" height={77} width={218} alt="logoImage" className='w-56 h-12' />
        </a>

        {/* Hamburger for mobile */}
        <div className="lg:hidden relative left-10">
          <button
            onClick={toggleMenu}
            className="text-gray-600 dark:text-white focus:outline-none"
          >
            {isOpen ? (
              <IoMdCloseCircle className="text-3xl" />
            ) : (
              <GiHamburgerMenu className="text-3xl" />
            )}
          </button>
        </div>

        {/* Links for larger screens */}
        <div className={`hidden lg:flex items-center text-[#2B2B2B] dark:text-white font-noto text-[18px] font-medium space-x-10 ml-[346px]`}>
          {links.map((link, index) => (
            <div key={index}>
              {link.dropdown ? (
                // Dropdown for Home and more
                <div
                  onClick={() => setActiveLink(link.name)}
                >
                  {link.dropdown}
                </div>
              ) : (
                <a
                  href={link.path}
                  className={`font-noto text-[18px] font-medium ${activeLink === link.name ? 'text-[#E67529]' : 'text-[#2B2B2B] dark:text-white'}`}
                  onClick={() => handleLinkClick(link.name, link.path)}
                >
                  {link.name}
                </a>
              )}
            </div>
          ))}
        </div>
        <ThemeControl />
        {/* Join Us button */}
        <div className="flex items-center ml-10 md:ml-20">
          <button
            className="border-2 border-[#E67529] px-8 py-4 rounded-[4px] whitespace-pre font-noto text-[18px] font-medium hover:bg-[#E67529] hover:text-white text-[#2B2B2B] dark:text-white transition"
          >
            Join Us
          </button>
        </div>
      </div>

      {/* Mobile view dropdown (only vertical on small screens) */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-start bg-[#2D2E31] shadow-md px-4 space-y-4 text-white font-noto text-[18px] font-medium">
          {links.map((link, index) => (
            <div key={index}>
              {link.dropdown ? (
                // Mobile dropdown for Home
                link.dropdown
              ) : (
                <a
                  href={link.path}
                  className={`text-[18px] w-full text-left ${activeLink === link.name ? 'text-[#E67529]' : 'text-[#2B2B2B] dark:text-white'}`}
                  onClick={() => handleLinkClick(link.name, link.path)}
                >
                  {link.name}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
