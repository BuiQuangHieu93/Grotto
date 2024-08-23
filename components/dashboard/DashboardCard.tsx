import { DashboardCardProps } from "@/types";

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  changeType,
  linkText,
  linkHref,
  icon,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 text-lg font-semibold">{title}</h2>
        <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
      </div>
      <div className="text-3xl font-bold my-2">{value}</div>
      <div
        className={`text-sm ${
          changeType === "increase"
            ? "text-green-500"
            : changeType === "decrease"
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {change} %
      </div>
      <a href={linkHref} className="text-blue-500 text-sm mt-4">
        {linkText}
      </a>
    </div>
  );
};

export default DashboardCard;
