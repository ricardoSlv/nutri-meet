import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center w-full flex-col ">
      <div className="bg-linear-to-r from-emerald-400 to-emerald-500 w-full py-3 px-12  flex items-center justify-between ">
        <h1 className="text-2xl font-bold text-white">Nutritionists</h1>

        <div>
          <Button variant="link" className="">
            <Link to="/scheduling" className="text-blue-600 flex flex-row items-center gap-2">
              Scheduling <FaExternalLinkAlt />
            </Link>
          </Button>
          <Button variant="link" className="">
            <Link to="/nutritionists" className="text-blue-600 flex flex-row items-center gap-2">
              Nutritionists Page
              <FaExternalLinkAlt />
            </Link>
          </Button>
        </div>

        <p className="flex items-center text-white">
          Are you a nutrium professional? Get to know our software
          <Link to="/nutritionists" className="ml-2">
            <FaArrowRight />
          </Link>
        </p>
      </div>
    </nav>
  );
}
