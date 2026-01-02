import { MatchHistoryView } from "@/src/presentation/components/match-history/MatchHistoryView";
import { createServerMatchHistoryPresenter } from "@/src/presentation/presenters/match-history/MatchHistoryPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the match history page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerMatchHistoryPresenter();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Match History - Infinite Battle",
      description: "View your battle history and statistics",
    };
  }
}

/**
 * Match History Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function MatchHistoryPage() {
  const presenter = createServerMatchHistoryPresenter();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <MatchHistoryView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching match history:", error);

    // Fallback UI
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-white/60 mb-4">Unable to load match history</p>
          <Link
            href="/"
            className="main-btn main-btn-primary inline-block"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}
