import React from "react";
import {
  ArrowRight,
  Code,
  Palette,
  Zap,
  Settings,
  Star,
  GitBranch,
  Users,
  Activity,
} from "lucide-react";

const projectName = import.meta.env.VITE_PROJECT_NAME;

function Home() {
  return (
    <div className="">
      <div className="flex items-center justify-between space-x-48">
        <div className="text-left flex-1">
          <div className="">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-light-text dark:text-dark-text leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-light-highlight to-light-highlight/80 dark:from-dark-highlight dark:to-dark-highlight/80 bg-clip-text text-transparent">
                {projectName}
              </span>
            </h1>

            <p className="text-xl text-light-muted-text dark:text-dark-muted-text mb-8 leading-relaxed">
              Transform your workflow with our powerful, intuitive platform
              designed for modern teams and individuals.
              <span className="text-light-text dark:text-dark-text font-semibold">
                {" "}
                Built for speed, designed for scale.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
              <a
                href="/login"
                className="group bg-light-highlight dark:bg-dark-highlight text-white font-semibold py-4 px-10 rounded-xl hover:shadow-lg hover:shadow-light-highlight/25 dark:hover:shadow-dark-highlight/25 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="/setup"
                className="bg-light-muted-background dark:bg-dark-muted-background border-2 border-light-muted-text/20 dark:border-dark-muted-text/20 hover:border-light-highlight dark:hover:border-dark-highlight font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-md"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
