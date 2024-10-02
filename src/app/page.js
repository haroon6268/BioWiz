import Image from "next/image";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import SplitContent from "./components/SplitContent";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import SignIn from "./components/GoogleSignin";
import { getServerSession } from "next-auth";
import { auth } from "@/auth";

export default async function Home() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <SplitContent
        reverse={true}
        img="content1.jpg"
        header="Smart Anatomy Flashcards"
        subHeader="Our app uses AI to generate personalized anatomy flashcards from your images. Learn faster and more efficiently by focusing on the areas that matter most."
      />
      <SplitContent
        reverse={false}
        img="content2.jpg"
        header="Interactive Quizzes"
        subHeader="Test your knowledge with interactive quizzes based on your uploaded images. Our quizzes adapt to your performance, making sure you strengthen any weak spots."
      />
      <SplitContent
        reverse={true}
        img="content3.jpg"
        header="Image Recognition Technology"
        subHeader="Upload your anatomy diagrams and let our app automatically label and organize them. Say goodbye to manual input and save time for what really matters—learning."
      />

      <CTA />
    </div>
  );
}
