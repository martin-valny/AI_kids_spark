
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Lessons from "./pages/Lessons";

import ActivityDetails from "./pages/ActivityDetails";
import PatternDetective from "./pages/PatternDetective";
import WeatherPredictor from "./pages/WeatherPredictor";
import ImageRecognition from "./pages/ImageRecognition";
import SimpleAlgorithms from "./pages/SimpleAlgorithms";
import AIEthics from "./pages/AIEthics";
import QuickDrawActivity from "./pages/QuickDrawActivity";
import PictureCipherActivity from "./pages/PictureCipherActivity";
import PictureSortingActivity from "./pages/PictureSortingActivity";
import RodocodoActivity from "./pages/RodocodoActivity";
import RobotIslandsActivity from "./pages/RobotIslandsActivity";
import AIDetectiveActivity from "./pages/AIDetectiveActivity";
import DrawAIFriendActivity from "./pages/DrawAIFriendActivity";
import Projects from "./pages/Projects";
import Games from "./pages/Games";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

import MusicAndAI from "./pages/MusicAndAI";
import IntroToAI from "./pages/IntroToAI";
import MachineLearningBasics from "./pages/MachineLearningBasics";
import DataAndPatterns from "./pages/DataAndPatterns";
import FutureOfAI from "./pages/FutureOfAI";
import BuildImageClassifierActivity from "./pages/BuildImageClassifierActivity";
import EmojiDetectorActivity from "./pages/EmojiDetectorActivity";
import SortingChallengeActivity from "./pages/SortingChallengeActivity";
import AIEthicsScenariosActivity from "./pages/AIEthicsScenariosActivity";
import DesignResponsibleAIActivity from "./pages/DesignResponsibleAIActivity";
import FutureAIInventionActivity from "./pages/FutureAIInventionActivity";
import AICareerExplorerActivity from "./pages/AICareerExplorerActivity";
import TrainDrawingRecognizerActivity from "./pages/TrainDrawingRecognizerActivity";
import GuessWhoActivity from "./pages/GuessWhoActivity";
import MusicAIProject from "./pages/projects/MusicAIProject";
import AIArtStudioProject from "./pages/projects/AIArtStudioProject";
import BuildChatbotProject from "./pages/projects/BuildChatbotProject";
import AIVideoProject from "./pages/projects/AIVideoProject";

import DesignPilot from "./pages/DesignPilot";

// Lumora Landing Pages
import LandingShowcase from "./pages/landing/LandingShowcase";
import NeoBrutalist from "./pages/landing/NeoBrutalist";
import VaporStudio from "./pages/landing/VaporStudio";
import LinearMotion from "./pages/landing/LinearMotion";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AccountSettings from "./pages/AccountSettings";
import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { AITutorProvider } from "./contexts/AITutorContext";
import AITutor from "./components/AITutor";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

import NeuralGalaxy from "@/components/NeuralGalaxy";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SubscriptionProvider>
        <AITutorProvider>
          <TooltipProvider>
          <NeuralGalaxy />
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/design-pilot" element={<DesignPilot />} />
          <Route path="/lessons/intro-to-ai" element={<IntroToAI />} />
          <Route path="/lessons/machine-learning-basics" element={<MachineLearningBasics />} />
          <Route path="/lessons/data-and-patterns" element={<DataAndPatterns />} />
          <Route path="/lessons/image-recognition" element={<ImageRecognition />} />
          <Route path="/lessons/simple-algorithms" element={<SimpleAlgorithms />} />
          <Route path="/lessons/ai-ethics" element={<AIEthics />} />
          <Route path="/lessons/music-and-ai" element={<MusicAndAI />} />
          <Route path="/lessons/future-of-ai" element={<FutureOfAI />} />
          {/* Specific activity routes with dedicated components */}
          <Route path="/activities/pattern-detective" element={<PatternDetective />} />
          <Route path="/activities/weather-predictor" element={<WeatherPredictor />} />
          <Route path="/activities/build-image-classifier" element={<BuildImageClassifierActivity />} />
          <Route path="/activities/emoji-detector" element={<EmojiDetectorActivity />} />
          <Route path="/activities/sorting-challenge" element={<SortingChallengeActivity />} />
          <Route path="/activities/ai-ethics-scenarios" element={<AIEthicsScenariosActivity />} />
          <Route path="/activities/design-responsible-ai" element={<DesignResponsibleAIActivity />} />
          <Route path="/activities/future-ai-invention" element={<FutureAIInventionActivity />} />
          <Route path="/activities/ai-career-explorer" element={<AICareerExplorerActivity />} />

          {/* Legacy/Short Routes maintained for backward compatibility */}
          <Route path="/activities/train-drawing-recognizer" element={<TrainDrawingRecognizerActivity />} />
          <Route path="/activities/guess-who-ai-edition" element={<GuessWhoActivity />} />
          <Route path="/activities/ai-detective" element={<AIDetectiveActivity />} />
          <Route path="/activities/draw-ai-friend" element={<DrawAIFriendActivity />} />

          <Route path="/activities/image-recognition/quick-draw" element={<QuickDrawActivity />} />
          <Route path="/activities/image-recognition/picture-cipher" element={<PictureCipherActivity />} />
          <Route path="/activities/image-recognition/picture-sorting" element={<PictureSortingActivity />} />
          <Route path="/activities/algorithms/rodocodo" element={<RodocodoActivity />} />
          <Route path="/activities/algorithms/robot-islands" element={<RobotIslandsActivity />} />
          <Route path="/activities/algorithms/ai-detective" element={<AIDetectiveActivity />} />
          <Route path="/activities/algorithms/draw-ai-friend" element={<DrawAIFriendActivity />} />
          {/* Generic catch-all route for ActivityDetails - handles ai-detective, draw-ai-friend, train-drawing-recognizer, guess-who-ai-edition */}
          <Route path="/activities/:activityId" element={<ActivityDetails />} />
          <Route path="/projects" element={<Projects />} />
          {/* Project Routes */}
          <Route path="/projects/music-ai-creator" element={<MusicAIProject />} />
          <Route path="/projects/ai-art-studio" element={<AIArtStudioProject />} />
          <Route path="/projects/build-chatbot" element={<BuildChatbotProject />} />
          <Route path="/projects/ai-video-magic" element={<AIVideoProject />} />
          <Route path="/games" element={<Games />} />
          <Route path="/resources" element={<Resources />} />
          {/* Auth Routes */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          {/* Pricing Route */}
          <Route path="/pricing" element={<Pricing />} />
          {/* Legal & Account Routes */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/account" element={<AccountSettings />} />
          {/* Lumora Landing Pages */}
          <Route path="/landing-showcase" element={<LandingShowcase />} />
          <Route path="/landing/neo-brutalist" element={<NeoBrutalist />} />
          <Route path="/landing/vapor-studio" element={<VaporStudio />} />
          <Route path="/landing/linear-motion" element={<LinearMotion />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
          <AITutor />
        </BrowserRouter>
        </TooltipProvider>
        </AITutorProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
