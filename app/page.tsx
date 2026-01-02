import { HomeView } from "@/src/presentation/components/home/HomeView";
import { createServerHomePresenter } from "@/src/presentation/presenters/home/HomePresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the home page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerHomePresenter();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Infinite Battle - Epic Card Combat",
      description: "Experience epic Dragon Ball style battles with card-based combat",
    };
  }
}

/**
 * Home Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function HomePage() {
  const presenter = createServerHomePresenter();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <HomeView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching home data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-white/60 mb-4">Unable to load the home page</p>
          <Link
            href="/"
            className="main-btn main-btn-primary inline-block"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }
}
