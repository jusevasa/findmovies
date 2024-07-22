import React, { useState, useEffect, useRef } from 'react';
import { Categories } from '@/enums/categories';

interface INavigationCategories {
  onCategoryChange: (category: Categories) => void;
  isLoading: boolean;
}

export const NavigationCategories: React.FC<INavigationCategories> = ({
  onCategoryChange,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<Categories>(Categories.MOVIES);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector('.active-tab');
      if (activeTabElement) {
        setIndicatorStyle({
          left:
            activeTabElement.getBoundingClientRect().left -
            tabsRef.current.getBoundingClientRect().left,
          width: activeTabElement.clientWidth,
        });
      }
    }
  }, [activeTab]);

  const handleTabClick = (category: Categories) => {
    setActiveTab(category);
    onCategoryChange(category);
  };

  if (isLoading) {
    return (
      <div className='flex gap-6 w-full mt-5'>
        <div className='bg-lightGray-36 w-20 h-9 rounded-md'></div>
        <div className='bg-lightGray-36 w-20 h-9 rounded-md'></div>
      </div>
    );
  }

  return (
    <div className='relative mt-5 w-screen overflow-hidden border-b border-lightGray-16'>
      <ul ref={tabsRef} className='text-gray-400 flex gap-4'>
        {Object.values(Categories).map((category) => (
          <li
            key={category}
            className={`cursor-pointer px-4 py-1 font-normal ${
              activeTab === category ? 'active-tab text-white' : ''
            }`}
            onClick={() => handleTabClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      <div
        className='absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-in-out rounded-lg'
        style={indicatorStyle}
      ></div>
    </div>
  );
};
