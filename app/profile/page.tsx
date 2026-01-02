import { ProfileView } from "@/src/presentation/components/profile/ProfileView";
import { createServerProfilePresenter } from "@/src/presentation/presenters/profile/ProfilePresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the profile page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerProfilePresenter();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Profile - Infinite Battle",
      description: "View and manage your Infinite Battle profile",
    };
  }
}

/**
 * Profile Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function ProfilePage() {
  const presenter = createServerProfilePresenter();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <ProfileView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching profile data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-white/60 mb-4">Unable to load your profile</p>
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
