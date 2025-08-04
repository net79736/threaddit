import { useQuery } from "@tanstack/react-query";
import * as PropType from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

// 더미 데이터 - 계층적 구조
const dummyThreadsData = {
  subscribed: [
    { id: 1, name: "react", logo: null, subscriberCount: 15, category: "Technology" },
    { id: 2, name: "javascript", logo: null, subscriberCount: 23, category: "Technology" },
    { id: 3, name: "gaming", logo: null, subscriberCount: 8, category: "Games" },
  ],
  all: [
    // Technology 카테고리
    { id: 1, name: "react", logo: null, subscriberCount: 15, category: "Technology" },
    { id: 2, name: "javascript", logo: null, subscriberCount: 23, category: "Technology" },
    { id: 3, name: "python", logo: null, subscriberCount: 18, category: "Technology" },
    { id: 4, name: "webdev", logo: null, subscriberCount: 12, category: "Technology" },
    { id: 5, name: "programming", logo: null, subscriberCount: 31, category: "Technology" },
    
    // Games 카테고리
    { id: 6, name: "gaming", logo: null, subscriberCount: 8, category: "Games" },
    { id: 7, name: "minecraft", logo: null, subscriberCount: 14, category: "Games" },
    { id: 8, name: "valorant", logo: null, subscriberCount: 9, category: "Games" },
    { id: 9, name: "leagueoflegends", logo: null, subscriberCount: 22, category: "Games" },
    
    // Entertainment 카테고리
    { id: 10, name: "movies", logo: null, subscriberCount: 16, category: "Entertainment" },
    { id: 11, name: "tvshows", logo: null, subscriberCount: 11, category: "Entertainment" },
    { id: 12, name: "anime", logo: null, subscriberCount: 13, category: "Entertainment" },
    
    // Lifestyle 카테고리
    { id: 13, name: "fitness", logo: null, subscriberCount: 7, category: "Lifestyle" },
    { id: 14, name: "cooking", logo: null, subscriberCount: 19, category: "Lifestyle" },
    { id: 15, name: "travel", logo: null, subscriberCount: 6, category: "Lifestyle" },
  ],
  popular: [
    { id: 5, name: "programming", logo: null, subscriberCount: 31, category: "Technology" },
    { id: 9, name: "leagueoflegends", logo: null, subscriberCount: 22, category: "Games" },
    { id: 2, name: "javascript", logo: null, subscriberCount: 23, category: "Technology" },
    { id: 14, name: "cooking", logo: null, subscriberCount: 19, category: "Lifestyle" },
    { id: 10, name: "movies", logo: null, subscriberCount: 16, category: "Entertainment" },
  ]
};

export function ThreadsSidebar() {
  const [expandedCategories, setExpandedCategories] = useState({
    subscribed: true,
    all: true,
    popular: true
  });

  // 실제 API 호출 대신 더미 데이터 사용
  const { data } = useQuery({
    queryKey: ["threads/all"],
    queryFn: async () => {
      // 실제 API가 없으므로 더미 데이터 반환
      return dummyThreadsData;
    },
  });

  const toggleCategory = (section) => {
    setExpandedCategories(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 카테고리별로 스레드 그룹핑
  const groupThreadsByCategory = (threads) => {
    const grouped = {};
    threads?.forEach(thread => {
      if (!grouped[thread.category]) {
        grouped[thread.category] = [];
      }
      grouped[thread.category].push(thread);
    });
    return grouped;
  };

  return (
    <aside className="hidden flex-col w-56 md:flex">
      {data?.subscribed.length !== 0 && (
        <>
          <div className="flex flex-col m-5 space-y-4">
            <div 
              className="flex justify-between w-48 cursor-pointer"
              onClick={() => toggleCategory('subscribed')}
            >
              <h2 className="font-semibold uppercase">Subscribed</h2>
              <span className="pr-1">{expandedCategories.subscribed ? '▼' : '▶'}</span>
            </div>
            {expandedCategories.subscribed && (
              <HierarchicalThreadList threadList={data?.subscribed} />
            )}
          </div>
          <span className="mx-5 border border-theme-silver-chalice"></span>
        </>
      )}
      <div className="flex flex-col m-5 space-y-4">
        <div 
          className="flex justify-between w-48 cursor-pointer"
          onClick={() => toggleCategory('all')}
        >
          <h2 className="font-semibold uppercase">Threads</h2>
          <span className="pr-1">{expandedCategories.all ? '▼' : '▶'}</span>
        </div>
        {expandedCategories.all && (
          <HierarchicalThreadList threadList={data?.all} />
        )}
      </div>
      <span className="mx-5 border border-theme-silver-chalice"></span>
      <div className="flex flex-col m-5 space-y-4">
        <div 
          className="flex justify-between w-48 cursor-pointer"
          onClick={() => toggleCategory('popular')}
        >
          <h2 className="font-semibold uppercase">Popular Threads</h2>
          <span className="pr-1">{expandedCategories.popular ? '▼' : '▶'}</span>
        </div>
        {expandedCategories.popular && (
          <HierarchicalThreadList threadList={data?.popular} />
        )}
      </div>
    </aside>
  );
}

// 계층적 스레드 리스트 컴포넌트
function HierarchicalThreadList({ threadList }) {
  const groupedThreads = groupThreadsByCategory(threadList);
  
  return (
    <div className="flex flex-col space-y-3 w-48">
      {Object.entries(groupedThreads).map(([category, threads]) => (
        <div key={category} className="category-group">
          <div className="category-header text-xs font-medium text-gray-600 mb-2 pl-2">
            {category}
          </div>
          <div className="threads-list space-y-1">
            {threads.map((thread) => (
              <Link 
                to={`/${thread.name}`} 
                className="flex justify-between w-48 cursor-pointer hover:bg-gray-50 rounded px-2 py-1" 
                key={thread.name}
              >
                <div className={`flex items-center space-x-3 ${!thread.logo && "pl-9"}`}>
                  {thread.logo && (
                    <img 
                      loading="lazy" 
                      width="auto" 
                      height="100%" 
                      src={thread.logo} 
                      alt="" 
                      className="object-cover w-6 h-6 rounded-full" 
                    />
                  )}
                  <span className="truncate text-sm">{thread.name}</span>
                </div>
                <span className="p-1 px-2 text-xs font-semibold rounded-md bg-theme-gray-blue">
                  {thread.subscriberCount > 9 ? thread.subscriberCount : `0${thread.subscriberCount}`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 카테고리별 그룹핑 함수
function groupThreadsByCategory(threads) {
  const grouped = {};
  threads?.forEach(thread => {
    if (!grouped[thread.category]) {
      grouped[thread.category] = [];
    }
    grouped[thread.category].push(thread);
  });
  return grouped;
}

SideBarComponent.propTypes = {
  threadList: PropType.array,
};

function SideBarComponent({ threadList }) {
  return (
    <div className="flex flex-col space-y-4 w-48 list-none">
      {threadList?.slice(0, 10).map((thread) => (
        <Link to={`/${thread.name}`} className="flex justify-between w-48 cursor-pointer" key={thread.name}>
          <div className={`flex items-center space-x-3 ${!thread.logo && "pl-9"}`}>
            {thread.logo && <img loading="lazy" width="auto" height="100%" src={thread.logo} alt="" className="object-cover w-6 h-6 rounded-full" />}
            <span className="truncate">{thread.name}</span>
          </div>
          <span className="p-1 px-2 text-sm font-semibold rounded-md bg-theme-gray-blue">
            {thread.subscriberCount > 9 ? thread.subscriberCount : `0${thread.subscriberCount}`}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default ThreadsSidebar;
