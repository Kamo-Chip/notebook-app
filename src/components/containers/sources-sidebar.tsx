import { fetchSources } from "@/lib/data";
import { PlusIcon } from "@heroicons/react/24/outline";
import SidebarSource from "../sidebar-source";

async function SourcesSidebar({ playlistId }: { playlistId: string }) {
  const sources = await fetchSources(playlistId);

  return (
    <div className=" h-screen border-r bg-black/5 flex flex-col p-4">
      <div className="flex justify-between items-center  mb-8">
        <span className="text-2xl">Sources 📑</span>
        <button>
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {sources.map((source) => (
        <SidebarSource key={source.id} source={source} />
      ))}
    </div>
  );
}

export default SourcesSidebar;
