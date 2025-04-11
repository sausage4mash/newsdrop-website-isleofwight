import { Link } from 'react-router-dom';

export default function Home() {
  // Mock data for featured stories
  const featuredStories = [
    {
      id: 1,
      title: "Council Approves New Cycling Initiative",
      summary: "Isle of Wight Council has approved a £2.5 million cycling infrastructure project.",
      date: "2025-04-10",
      category: "Council"
    },
    {
      id: 2,
      title: "Summer Festival Dates Announced",
      summary: "The annual Isle of Wight Summer Festival will take place from July 15-22.",
      date: "2025-04-09",
      category: "Events"
    },
    {
      id: 3,
      title: "Local School Wins National Award",
      summary: "Carisbrooke College has been recognized for its innovative teaching methods.",
      date: "2025-04-08",
      category: "Education"
    }
  ];

  return (
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
          <Link to="/stories" className="text-accent hover:underline">View all stories</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStories.map(story => (
            <div key={story.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-accent text-white mb-2">
                  {story.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{story.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{story.date}</span>
                  <button className="text-accent hover:underline">Read more</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-8">
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
}
