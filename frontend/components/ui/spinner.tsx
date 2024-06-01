import { Loader2 } from "lucide-react";

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const Spinner = ({ size = 24, className, ...props }: ISVGProps) => {
  return <Loader2 className="animate-spin" size={size} strokeWidth={2} />;
};

export { Spinner };
