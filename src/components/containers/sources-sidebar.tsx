import { fetchSources } from "@/lib/data";
import { DocumentPlusIcon, PlusIcon } from "@heroicons/react/24/outline";
import SidebarSource from "../sidebar-source";
import AddSourceDialog from "../add-source-dialog";
import { MAX_SOURCES } from "@/lib/utils";

async function SourcesSidebar({ playlistId }: { playlistId: string }) {
  const sources = await fetchSources(playlistId);

  return (
    <div className=" h-screen border-r bg-black/5 flex flex-col p-4">
      <div className="flex justify-between items-center  mb-8">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-medium">Sources</span>
          <span className=" flex items-center justify-center bg-border p-4 rounded-full w-10 h-10 text-center font-bold text-sm text-gray-700/80">
            {sources.length}/{MAX_SOURCES}
          </span>
        </div>

        <AddSourceDialog
          playlistId={playlistId}
          trigger={
            <button>
              <DocumentPlusIcon className="w-6 h-6" />
            </button>
          }
        />
      </div>

      {sources.map((source) => (
        <SidebarSource key={source.id} source={source} />
      ))}
    </div>
  );
}

export default SourcesSidebar;
