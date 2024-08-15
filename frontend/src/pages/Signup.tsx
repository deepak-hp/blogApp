import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col">
        <Auth />
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};
