export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-primary">About News Drop Isle of Wight</h1>
      
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          News Drop Isle of Wight automatically aggregates and shares news updates from Isle of Wight council, police, and public services to keep residents informed about important local developments.
        </p>
        <p>
          Our goal is to provide a single, reliable source of information that helps the community stay connected and informed about matters that affect daily life on the Isle of Wight.
        </p>
      </section>
      
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
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
      
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          We value your feedback and suggestions. If you have any questions or comments about News Drop Isle of Wight, please don't hesitate to get in touch.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <p className="font-medium">Email: <a href="mailto:info@newsdropisleofwight.co.uk" className="text-accent hover:underline">info@newsdropisleofwight.co.uk</a></p>
          <p className="font-medium mt-2">Twitter: <a href="https://twitter.com/NewsDropIoW" className="text-accent hover:underline">@NewsDropIoW</a></p>
        </div>
      </section>
      
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Legal Information</h2>
        <p className="mb-2">
          News Drop Isle of Wight is an independent service and is not officially affiliated with the Isle of Wight Council or any other organization mentioned on this site.
        </p>
        <p>
          All information is shared for public interest purposes. Original content remains the property of its respective owners.
        </p>
      </section>
    </div>
  );
}
  
