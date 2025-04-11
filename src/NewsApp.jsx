
import { useState } from 'react';

const NewsApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Mock data for stories
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
  ];
  
  // Filter stories for featured stories (home page)
  const featuredStories = allStories.slice(0, 3);

  // Navbar component
  const Navbar = () => (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="15" fill="#1ABC9C" />
            <path d="M15 15 L25 20 L15 25 Z" fill="white" />
          </svg>
          <span className="text-xl font-bold">News Drop IoW</span>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-6 text-lg">
          <button 
            className={`hover:text-accent transition-colors ${activeTab === 'home' ? 'text-accent font-bold' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`hover:text-accent transition-colors ${activeTab === 'stories' ? 'text-accent font-bold' : ''}`}
            onClick={() => setActiveTab('stories')}
          >
            All Stories
          </button>
          <button 
            className={`hover:text-accent transition-colors ${activeTab === 'about' ? 'text-accent font-bold' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {menuOpen && (
        <div className="md:hidden mt-2 p-2 flex flex-col space-y-2">
          <button 
            className={`py-2 text-left hover:text-accent transition-colors ${activeTab === 'home' ? 'text-accent font-bold' : ''}`}
            onClick={() => {
              setActiveTab('home');
              setMenuOpen(false);
            }}
          >
            Home
          </button>
          <button 
            className={`py-2 text-left hover:text-accent transition-colors ${activeTab === 'stories' ? 'text-accent font-bold' : ''}`}
            onClick={() => {
              setActiveTab('stories');
              setMenuOpen(false);
            }}
          >
            All Stories
          </button>
          <button 
            className={`py-2 text-left hover:text-accent transition-colors ${activeTab === 'about' ? 'text-accent font-bold' : ''}`}
            onClick={() => {
              setActiveTab('about');
              setMenuOpen(false);
            }}
          >
            About
          </button>
        </div>
      )}
    </nav>
  );

  // HomePage component
  const HomePage = () => (
    <div className="space-y-6">
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Welcome to News Drop Isle of Wight</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Your source for the latest news and updates from Isle of Wight council, police, and public services.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Stories</h2>
          <button 
            className="text-accent hover:underline"
            onClick={() => setActiveTab('stories')}
          >
            View all stories
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStories.map(story => (
            <div key={story.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-accent text-white mb-2">
                  {story.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                <p className="mb-4">{story.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{story.date}</span>
                  <button className="text-accent hover:underline">Read more</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 p-6 rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Updates</h2>
        <p className="mb-4">Get the latest news delivered directly to your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-accent"
          />
          <button className="bg-accent text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );

  // StoriesPage component
  const StoriesPage = () => {
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
        <div className="flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-lg">
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
        <p>
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
              <p className="mb-4">{story.summary}</p>
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
  };

  // AboutPage component
  const AboutPage = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-primary">About News Drop Isle of Wight</h1>
      
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          News Drop Isle of Wight automatically aggregates and shares news updates from Isle of Wight council, police, and public services to keep residents informed about important local developments.
        </p>
        <p>
          Our goal is to provide a single, reliable source of information that helps the community stay connected and informed about matters that affect daily life on the Isle of Wight.
        </p>
      </section>
      
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          We use automated systems to collect official announcements and press releases from:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Isle of Wight Council</li>
          <li>Hampshire & Isle of Wight Constabulary</li>
          <li>Isle of Wight NHS Trust</li>
          <li>Isle of Wight Fire and Rescue Service</li>
          <li>Other public service organizations</li>
        </ul>
        <p>
          These updates are categorized, summarized, and published on our platform without editorial modification to ensure accuracy and reliability.
        </p>
      </section>
      
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          We value your feedback and suggestions. If you have any questions or comments about News Drop Isle of Wight, please don't hesitate to get in touch.
        </p>
        <div className="bg-gray-100 p-4 rounded">
          <p className="font-medium">Email: <a href="#" className="text-accent hover:underline">info@newsdropisleofwight.co.uk</a></p>
          <p className="font-medium mt-2">Twitter: <a href="#" className="text-accent hover:underline">@NewsDropIoW</a></p>
        </div>
      </section>
    </div>
  );

  // Footer component
  const Footer = () => (
    <footer className="bg-primary text-white p-4 text-center mt-12">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} News Drop Isle of Wight</p>
      </div>
    </footer>
  );

  // Main App render
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'stories' && <StoriesPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>
      <Footer />
    </div>
  );
};

export default NewsApp;
