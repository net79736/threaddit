import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

// 더미 토픽 데이터 (A로 시작하는 것들)
const dummyTopics = [
  "A Beautiful Day in the Neighborhood",
  "A Certain Magical Index",
  "A Christmas Story",
  "A Goofy Movie",
  "A House of Many Doors",
  "A Love Supreme",
  "A Nightmare on Elm Street (franchise)",
  "A Plague Tale: Innocence",
  "A Star Is Born (2018 movie)",
  "A Bird Story",
  "A Certain Scientific Railgun",
  "A Clockwork Orange",
  "A Hard Day's Night (album)",
  "A Knight's Tale",
  "A Million Ways to Die in the West",
  "A Song of Ice and Fire",
  "A Story About My Uncle",
  "A$AP Ferg",
  "A Boogie wit da Hoodie",
  "A Charlie Brown Christmas",
  "A Farewell to Kings",
  "A Girl Walks Home Alone at Night",
  "A Hard Day's Night (movie)",
  "A League of Their Own",
  "A Nightmare on Elm Street (1984 movie)",
  "A Pup Named Scooby-Doo",
  "A Streetcar Named Desire",
  "A Trip to the Moon",
  "A$AP Rocky",
  "A-10 Thunderbolt II",
  "A.C. Milan",
  "A10 Fusion",
  "A12X Bionic",
  "A15 Bionic",
  "A9X",
  "A Bug's Life",
  "A Charlie Brown Thanksgiving",
  "A Feast for Odin",
  "A Galaxy Next Door",
  "A Hat in Time",
  "A History of Western Philosophy",
  "A League of Their Own (TV series)",
  "A Nightmare on Elm Street (2010 movie)",
  "A Quiet Place",
  "A Thousand Miles",
  "A Wrinkle in Time",
  "A'keria C. Davenport",
  "A-4 Skyhawk",
  "A. J. Bouye",
  "A.D. 2044",
  "A.J. Styles",
  "A10X Fusion",
  "A12Z Bionic",
  "A24",
  "Aachen"
];

// 알파벳 배열
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];

export function Topics() {
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: topics } = useQuery({
    queryKey: ["topics", selectedLetter],
    queryFn: async () => {
      // 실제 API가 없으므로 더미 데이터 반환
      return dummyTopics;
    },
  });

  // 페이지당 항목 수
  const itemsPerPage = 20;
  const totalPages = Math.ceil((topics?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTopics = topics?.slice(startIndex, endIndex) || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Topics Directory</h1>
        
        {/* Alphabetical Navigation */}
        <div className="flex flex-wrap gap-1 mb-6">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => {
                setSelectedLetter(letter);
                setCurrentPage(1);
              }}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedLetter === letter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Current View */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Browse topics starting with '{selectedLetter}' - Page {currentPage}
          </h2>
          {totalPages > 1 && (
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentTopics.map((topic, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <Link 
              to={`/topics/${encodeURIComponent(topic)}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm leading-relaxed block"
            >
              {topic}
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {currentTopics.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No topics found</h3>
          <p className="text-gray-500">No topics starting with '{selectedLetter}' were found.</p>
        </div>
      )}
    </div>
  );
}

export default Topics; 