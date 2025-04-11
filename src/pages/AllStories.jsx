import { useState } from 'react';

export default function AllStories() {
  // Mock data for news stories
  const allStories = [
    {
      id: 1,
      title: "Council Approves New Cycling Initiative",
      summary: "Isle of Wight Council has approved a £2.5 million cycling infrastructure project.",
      content: "The Isle of Wight Council has given the green light to a comprehensive cycling infrastructure project worth £2.5 million. The initiative aims to create more dedicated cycling lanes across the island, improve signage, and install secure bicycle parking facilities at key locations.",
      date: "2025-04-10",
      category: "Council"
    },
    {
      id: 2,
      title: "Summer Festival Dates Announced",
      summary: "The annual Isle of Wight Summer Festival will take place from July 15-22.",
      content: "Organizers have announced that the popular Isle of Wight Summer Festival will run from July 15-22 this year. The event will feature local musicians, artists, and food vendors across multiple venues in Newport, Ryde, and Cowes.",
      date: "2025-04-09",
      category: "Events"
    },
    {
      id: 3,
      title: "Local School Wins National Award",
      summary: "Carisbrooke College has been recognized for its innovative teaching methods.",
      content: "Carisbrooke College has received national recognition for its pioneering approach to education. The school was awarded the 'Innovation in Education' prize at the National Teaching Awards ceremony in London last week.",
      date: "2025-04-08",
      category: "Education"
    },
    {
      id: 4,
      title: "New Ferry Service Launched",
      summary: "A new high-speed ferry service between Ryde and Portsmouth has been launched.",
      content: "Travelers between the Isle of Wight and the mainland now have a new transportation option. The high-speed ferry service, operated by Island Connect, promises to reduce journey times between Ryde and Portsmouth by up to 15 minutes.",
      date: "2025-04-07",
      category: "Transport"
    },
    {
      id: 5,
      title: "Police Report Drop in Crime Rates",
      summary: "The latest statistics show a 12% reduction in crime across the Isle of Wight.",
      content: "Isle of Wight Police have released crime statistics for the first quarter of 2025, showing a significant 12% reduction in overall crime rates compared to the same period last year. The decrease is particularly notable in property-related offenses.",
      date: "2025-04-06",
      category: "Police"
    },
    {
      id: 6,
      title: "Historic Building Restoration Complete",
      summary: "The restoration of Osborne House's East Wing has been completed after two years.",
      content: "After two years of careful work, the restoration of the East Wing at Osborne House has been completed. The project, which cost £3.2 million, has returned the historic rooms to their original Victorian splendor.",
      date: "2025-04-05",
      category: "Heritage"
    }
  ];

  // State for filters
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories for filter dropdown
  const categories = ['All', ...new Set(allStories.map(story => story.category))];

  // Filter stories based on category and search term
  const filteredStories = allStories.filter(story => {
    const matchesCategory = categoryFilter === 'All' || story.category === categoryFilter;
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">All News Stories</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search stories..."
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-accent"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Results count */}
      <p className="text-gray-600 dark:text-gray-300">
        Showing {filteredStories.length} of {allStories.length} stories
      </p>
      
      {/* Stories list */}
      <div className="space-y-6">
        {filteredStories.map(story => (
          <div key={story.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-accent text-white">
                {story.category}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{story.summary}</p>
            <p className="mb-4">{story.content}</p>
            <div className="text-right">
              <span className="text-sm text-gray-500">{story.date}</span>
            </div>
          </div>
        ))}
        
        {filteredStories.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl">No stories found matching your criteria.</p>
            <button 
              className="mt-4 bg-accent text-white px-4 py-2 rounded"
              onClick={() => {setCategoryFilter('All'); setSearchTerm('');}}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
