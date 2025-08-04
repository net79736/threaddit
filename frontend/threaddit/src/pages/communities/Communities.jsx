import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// 더미 커뮤니티 데이터
const dummyCommunities = [
  { id: 1, name: "funny", description: "Reddit's largest humor depot", members: 67, icon: "😄" },
  { id: 2, name: "AskReddit", description: "A place for major news from around the world", members: 57, icon: "❓" },
  { id: 3, name: "gaming", description: "Things that make you go AWW!", members: 47, icon: "🎮" },
  { id: 4, name: "worldnews", description: "The best place for news and discussion", members: 41, icon: "🌍" },
  { id: 5, name: "todayilearned", description: "You learn something new every day", members: 38, icon: "📚" },
  { id: 6, name: "Music", description: "The best place for music lovers", members: 37, icon: "🎵" },
  { id: 7, name: "aww", description: "Things that make you go AWW!", members: 35, icon: "🐾" },
  { id: 8, name: "movies", description: "The best place for movie discussions", members: 34, icon: "🎬" },
  { id: 9, name: "memes", description: "The best place for memes", members: 33, icon: "😂" },
  { id: 10, name: "science", description: "The best place for science discussions", members: 31, icon: "🔬" },
  { id: 11, name: "Showerthoughts", description: "A subreddit for sharing those miniature epiphanies", members: 30, icon: "💭" },
  { id: 12, name: "pics", description: "A place to share interesting photographs", members: 28, icon: "📸" },
  { id: 13, name: "news", description: "The best place for news and discussion", members: 27, icon: "📰" },
  { id: 14, name: "Jokes", description: "The best place for jokes", members: 26, icon: "😆" },
  { id: 15, name: "space", description: "The best place for space discussions", members: 25, icon: "🚀" },
  { id: 16, name: "DIY", description: "Do it yourself", members: 24, icon: "🔧" },
  { id: 17, name: "books", description: "The best place for book discussions", members: 23, icon: "📖" },
  { id: 18, name: "videos", description: "The best place for videos", members: 22, icon: "📹" },
  { id: 19, name: "askscience", description: "Ask science questions", members: 21, icon: "🔬" },
  { id: 20, name: "nottheonion", description: "News so nice, you'd think it was from The Onion", members: 20, icon: "🧅" },
  { id: 21, name: "mildlyinteresting", description: "Aww, cripes. I didn't know I'd have to write a description", members: 19, icon: "🤔" },
  { id: 22, name: "food", description: "The best place for food discussions", members: 18, icon: "🍕" },
  { id: 23, name: "GetMotivated", description: "Get motivated!", members: 17, icon: "💪" },
  { id: 24, name: "EarthPorn", description: "EarthPorn is your community of landscape photographers", members: 16, icon: "🌍" },
  { id: 25, name: "explainlikeimfive", description: "Explain Like I'm Five", members: 15, icon: "👶" },
  { id: 26, name: "LifeProTips", description: "Life Pro Tips", members: 14, icon: "💡" },
  { id: 27, name: "gadgets", description: "The best place for gadget discussions", members: 13, icon: "📱" },
  { id: 28, name: "IAmA", description: "I Am A", members: 12, icon: "👤" },
  { id: 29, name: "Art", description: "The best place for art discussions", members: 11, icon: "🎨" },
  { id: 30, name: "sports", description: "The best place for sports discussions", members: 10, icon: "⚽" },
  { id: 31, name: "dataisbeautiful", description: "Data is beautiful", members: 9, icon: "📊" },
  { id: 32, name: "Futurology", description: "The best place for future discussions", members: 8, icon: "🔮" },
  { id: 33, name: "gifs", description: "The best place for gifs", members: 7, icon: "🎬" },
  { id: 34, name: "personalfinance", description: "Personal Finance", members: 6, icon: "💰" },
  { id: 35, name: "photoshopbattles", description: "Photoshop Battles", members: 5, icon: "🎭" },
  { id: 36, name: "UpliftingNews", description: "Uplifting News", members: 4, icon: "😊" },
  { id: 37, name: "Documentaries", description: "The best place for documentary discussions", members: 3, icon: "📺" },
  { id: 38, name: "Damnthatsinteresting", description: "Damn that's interesting", members: 2, icon: "🤯" },
  { id: 39, name: "technology", description: "The best place for technology discussions", members: 1, icon: "💻" },
  { id: 40, name: "wallstreetbets", description: "Wall Street Bets", members: 40, icon: "📈" },
  { id: 41, name: "OldSchoolCool", description: "Old School Cool", members: 39, icon: "👴" },
  { id: 42, name: "WritingPrompts", description: "Writing Prompts", members: 38, icon: "✍️" },
  { id: 43, name: "tifu", description: "Today I Fucked Up", members: 37, icon: "😅" },
  { id: 44, name: "history", description: "The best place for history discussions", members: 36, icon: "📜" },
  { id: 45, name: "philosophy", description: "The best place for philosophy discussions", members: 35, icon: "🤔" },
  { id: 46, name: "wholesomememes", description: "Wholesome Memes", members: 34, icon: "😊" },
  { id: 47, name: "nosleep", description: "No Sleep", members: 33, icon: "😱" },
  { id: 48, name: "listentothis", description: "Listen to This", members: 32, icon: "🎧" },
  { id: 49, name: "television", description: "The best place for television discussions", members: 31, icon: "📺" },
  { id: 50, name: "nba", description: "The best place for NBA discussions", members: 30, icon: "🏀" },
  { id: 51, name: "NaturelsFuckingLit", description: "Nature is Fucking Lit", members: 29, icon: "🌿" },
  { id: 52, name: "InternetisBeautiful", description: "Internet is Beautiful", members: 28, icon: "🌐" }
];

export function Communities() {
  const { data: communities } = useQuery({
    queryKey: ["communities"],
    queryFn: async () => {
      // 실제 API가 없으므로 더미 데이터 반환
      return dummyCommunities;
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Best of Threaddit</h1>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">Top Communities</h2>
          <p className="text-gray-500">Browse Threaddit's largest communities</p>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {communities?.map((community, index) => (
          <div key={community.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-2xl">{community.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">#{index + 1}</span>
                  <Link 
                    to={`/r/${community.name}`} 
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                  >
                    r/{community.name}
                  </Link>
                </div>
                <p className="text-sm text-gray-600 mt-1">{community.members}M members</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {community.description}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            1
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            2
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            3
          </button>
        </div>
      </div>
    </div>
  );
}

export default Communities; 