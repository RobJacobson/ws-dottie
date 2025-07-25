import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type PageLayoutProps = {
  icon: LucideIcon;
  iconBgColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

const PageLayout = ({ icon: Icon, iconBgColor, title, description, children }: PageLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className={`${iconBgColor} p-3 rounded-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default PageLayout; 