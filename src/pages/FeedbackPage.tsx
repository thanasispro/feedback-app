import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FeedbackModal } from "@/components/FeedbackModal";
import { FeedbackList } from "@/components/FeedbackList";
import { Button } from "../atoms/Button/Button";
import { SortDropdown } from "../atoms/SortDropdown/SortDropdown";
import type { Feedback, FeedbackInput } from "../types";
import { useFeedbacks } from "@/hooks/useFeedback";
import { MobileHeader } from "@/components/MobileHeader";
import { MobileSidebar } from "@/components/MobileSidebar";
import { FilterSection } from "@/components/FilterSection";
import { SuggestionsInfo } from "@/components/SuggestionsInfo";
import { AppInfoCard } from "@/components/AppInfoCard";
import iconSuggestions from "@/assets/suggestions/icon-suggestions.svg";
import iconIllustrationEmpty from "@/assets/suggestions/illustration-empty.svg";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export const FeedbackPage = () => {
  const { feedbacks, addFeedback, updateFeedback } = useFeedbacks();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [editing, setEditing] = useState<Feedback | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const [sortBy, setSortBy] = useState("Most Upvotes");

  const sortOptions = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (selectedFilters.includes("All")) return true;
    return selectedFilters.includes(feedback.category);
  });

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    switch (sortBy) {
      case "Most Upvotes":
        return b.upvotes - a.upvotes;
      case "Least Upvotes":
        return a.upvotes - b.upvotes;
      case "Most Comments":
        return (b.comments?.length || 0) - (a.comments?.length || 0);
      case "Least Comments":
        return (a.comments?.length || 0) - (b.comments?.length || 0);
      default:
        return 0;
    }
  });

  const suggestionsCounts = {
    planned: feedbacks.filter((f) => f.status === "Planned").length,
    inProgress: feedbacks.filter((f) => f.status === "InProgress").length,
    live: feedbacks.filter((f) => f.status === "Live").length,
  };

  const handleSave = (data: FeedbackInput) => {
    if (editing) {
      updateFeedback({ ...editing, ...data });
    } else {
      addFeedback(data);
    }
    setEditing(null);
    setModalOpen(false);
  };

  const handleAddFeedbackClick = () => {
    if (isMobile) {
      setEditing(null);
      setModalOpen(true);
    } else {
      navigate("/feedback/new");
    }
  };

  const handleEditFeedback = (feedback: Feedback) => {
    if (isMobile) {
      setEditing(feedback);
      setModalOpen(true);
    } else {
      navigate(`/feedback/edit/${feedback.id}`);
    }
  };

  return (
    <div className={`min-h-screen bg-neutral-gray-100 
      lg:py-20 lg:px-15
      md:p-10`}>
      <MobileHeader
        appName="Frontend Mentor"
        pageName="Feedback Board"
        isMenuOpen={isMobileSidebarOpen}
        onMenuToggle={setIsMobileSidebarOpen}
      />

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
        suggestionsCounts={suggestionsCounts}
      />

      <div className="flex lg:gap-8">
        <div className="hidden lg:block w-[255px] space-y-6">
          <AppInfoCard
            appName={"Frontend Mentor"}
            pageName={"Feedback Board"}
          />
          <FilterSection
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />
          <SuggestionsInfo
            plannedCount={suggestionsCounts.planned}
            inProgressCount={suggestionsCounts.inProgress}
            liveCount={suggestionsCounts.live}
          />
        </div>

        <div className="flex-1 md:flex md:flex-col md:gap-6">
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-3 gap-4">
              <AppInfoCard
                appName={"Frontend Mentor"}
                pageName={"Feedback Board"}
              />

              <FilterSection
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
              />
              <SuggestionsInfo
                plannedCount={suggestionsCounts.planned}
                inProgressCount={suggestionsCounts.inProgress}
                liveCount={suggestionsCounts.live}
              />
            </div>
          </div>

          <div className="bg-neutral-gray-300 px-6 py-4 flex items-center justify-between md:rounded-[10px]">
            <div className="flex items-center gap-4">
              <img
                src={iconSuggestions}
                alt="Suggestions"
                className="w-6 h-6 hidden md:block"
              />
              <h1 className="text-[18px] leading-[26px] font-bold text-neutral-white">
                {filteredFeedbacks.length} Suggestions
              </h1>
              <SortDropdown
                value={sortBy}
                options={sortOptions}
                onSelect={setSortBy}
              />
            </div>
            <Button
              text="+ Add Feedback"
              onClick={handleAddFeedbackClick}
              className="bg-primary-purple hover:bg-primary-purple-hover"
            />
          </div>

          <div className="p-6 md:p-0">
            {sortedFeedbacks.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-[10px]">
                <img
                  src={iconIllustrationEmpty}
                  alt="No feedback"
                  className="mx-auto mb-6 w-32 h-32"
                />
                <h2 className="text-[18px] leading-[26px] font-bold text-neutral-gray-300 mb-4">
                  There is no feedback yet.
                </h2>
                <p className="text-[16px] leading-[23px] text-neutral-gray-400 mb-6">
                  Got a suggestion? Found a bug that needs to be squashed? We
                  love hearing about new ideas to improve our app.
                </p>
                <Button
                  text="+ Add Feedback"
                  onClick={handleAddFeedbackClick}
                  className="bg-primary-purple hover:bg-primary-purple-hover"
                />
              </div>
            ) : (
              <FeedbackList
                feedbacks={sortedFeedbacks}
                onEdit={handleEditFeedback}
              />
            )}
          </div>
        </div>
      </div>

      {isMobile && (
        <FeedbackModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
          initialData={editing}
        />
      )}
    </div>
  );
};