import { getGrids } from "@/api/grids";
import ClientGridPreviews from "@/app/components/landing/ClientGridPreviews";
import { SCROLL_BATCH_SIZE } from "@/app/components/landing/constants";

const GridPreviews: React.FC = async () => {
  const grids = await getGrids({ limit: SCROLL_BATCH_SIZE });

  return <ClientGridPreviews initialGrids={grids} />
};

export default GridPreviews;
