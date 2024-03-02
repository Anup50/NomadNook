import { Sidebar, SidebarItem } from "./Sidebar";
import { Map, Package, Book, Users, CalendarClock, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Index = () => {
  return (
    <div className="h-full w-auto flex flex-col bg-blue-400 border-r shadow-sm">
      <Sidebar>
        <Link to="/admin/location" className='cursor-pointer'>
          <SidebarItem icon={<Map size={20} />} text="Locations" />
        </Link>
        <Link to="/admin/packages" className='cursor-pointer'>
          <SidebarItem icon={<Package size={20} />} text="Packages" />
        </Link>
        <Link to="/admin/blogs" className='cursor-pointer'>
          <SidebarItem icon={<Book size={20} />} text="Blogs" />
        </Link>
        <Link to="/admin/contactus" className='cursor-pointer'>
          <SidebarItem icon={<HelpCircle size={20} />} text="Queries" />
        </Link>
        <Link to="/admin/plantrip" className='cursor-pointer'>
          <SidebarItem icon={<CalendarClock size={20} />} text="Plan Trip" />
        </Link>
        <Link to="/auth/signup" className='cursor-pointer'>
          <SidebarItem icon={<Users size={20} />} text="Clients" />
        </Link>
      </Sidebar>
    </div>
  );
};
