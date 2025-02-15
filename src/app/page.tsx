import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Welcome to BookFlow
          </h1>
          <p className="text-lg md:text-xl mb-8 text-text-light dark:text-text-dark">
            A modern self-publishing platform for authors to share their stories with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/books"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Browse Books
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 rounded-lg border border-primary-100 dark:border-primary-900 bg-white/50 dark:bg-black/50">
            <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
              📚 Multiple Books
            </h3>
            <p className="text-text-light dark:text-text-dark">
              Host and manage multiple books in one place with easy navigation and organization.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-primary-100 dark:border-primary-900 bg-white/50 dark:bg-black/50">
            <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
              📖 MDX Support
            </h3>
            <p className="text-text-light dark:text-text-dark">
              Write your content in MDX, combining the simplicity of Markdown with the power of React components.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-primary-100 dark:border-primary-900 bg-white/50 dark:bg-black/50">
            <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
              🎨 Beautiful Design
            </h3>
            <p className="text-text-light dark:text-text-dark">
              Enjoy a beautiful reading experience with customizable themes and responsive design.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary-100 dark:border-primary-900 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-text-light dark:text-text-dark">
          <p>Built with Next.js and MDX • Open Source on GitHub</p>
        </div>
      </footer>
    </div>
  );
}
