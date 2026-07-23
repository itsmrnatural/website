import Head from "next/head";
import { useState, useCallback } from "react";
import swr from "@lib/swr";
import Repositories from "@components/Repositories";
import Pagination from "@components/Pagination";

export default function Projects() {
  const PAGE_SIZE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCount, setFilteredCount] = useState(null);

  const featuredRepoNames = ["my-website", "c-problems"];

  const { data: _repositories, error, isValidating } = swr("/api/repos");
  const repositories = _repositories || [];
  const featuredRepos = repositories.filter((repo) => featuredRepoNames.includes(repo.name));
  const regularRepos = repositories.filter((repo) => !featuredRepoNames.includes(repo.name));
  const regularRepoCount = regularRepos.length;

  const handleRepositoryFiltering = useCallback(({ count, resetPage }) => {
    setFilteredCount(count);
    if (resetPage) {
      setCurrentPage(1);
    }
  }, []);

  const effectiveCount = filteredCount !== null ? filteredCount : regularRepoCount;
  const totalPages = Math.max(1, Math.ceil(effectiveCount / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  /**
   * Handles navigation to the previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * Handles navigation to the next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Head>
        <title>Mr. Natural • Projects</title>
        <meta name="description" content="Explore my GitHub repositories and personal projects" />
        <meta property="og:title" content="Mr. Natural • Projects" />
        <meta
          property="og:description"
          content="Explore my GitHub repositories and personal projects"
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="py-6 md:py-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-coffee-900 dark:text-white mb-3">
            My Projects
          </h1>
          <p className="text-sm md:text-base text-coffee-600 dark:text-gray-400 mb-6">
            Explore my open source repositories and personal projects
          </p>
        </div>

        {/* Loading state */}
        {isValidating && repositories.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coffee-600 dark:border-white"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-900/20 border border-red-900 rounded-lg p-4 my-4">
            <p className="text-red-400">Failed to load repositories. Please try again later.</p>
          </div>
        )}

        {/* Empty state */}
        {!isValidating && repositories.length === 0 && (
          <div className="bg-coffee-100 dark:bg-neutral-800/20 rounded-lg p-8 text-center my-8">
            <p className="text-xl text-coffee-900 dark:text-white">No projects found</p>
            <p className="text-coffee-700 dark:text-neutral-400 mt-2">
              Check back later for updates
            </p>
          </div>
        )}

        {/* Repository list */}
        {repositories.length > 0 && (
          <>
            {/* Featured Section */}
            {featuredRepos.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-coffee-900 dark:text-white">
                    Featured Projects
                  </h2>
                  <div className="flex-1 h-px bg-coffee-300/60 dark:bg-white/10" />
                </div>
                <Repositories
                  repositories={featuredRepos}
                  startIndex={0}
                  endIndex={featuredRepos.length}
                  isFeatured={true}
                />
              </div>
            )}

            {/* Regular Repositories Section */}
            {regularRepos.length > 0 && (
              <>
                {featuredRepos.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl md:text-2xl font-heading font-bold text-coffee-900 dark:text-white">
                      All Projects
                    </h2>
                    <div className="flex-1 h-px bg-coffee-300/60 dark:bg-white/10" />
                  </div>
                )}
                <Repositories
                  repositories={regularRepos}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  isFeatured={false}
                  onFilterChange={handleRepositoryFiltering}
                />
                {filteredCount > PAGE_SIZE && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
