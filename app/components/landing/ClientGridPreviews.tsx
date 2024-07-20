'use client'

import Link from "next/link";
import { getGrids } from "@/api/grids";
import Grid from "@/app/components/Grid";
import { useCallback, useState } from "react";
import { useInView } from "react-intersection-observer";
import { SCROLL_BATCH_SIZE } from "@/app/components/landing/constants";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import Loading from "@/app/loading";

const ClientGridPreviews: React.FC<{ initialGrids: Awaited<ReturnType<typeof getGrids>> }> = ({ initialGrids }) => {
  const [grids, setGrids] = useState(initialGrids);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const onInView = useCallback(async (inView: boolean) => {
    if (!inView) {
      return;
    }

    try {
      setIsLoadingMore(true);
      const afterParam = grids.length ? `&after=${grids[grids.length - 1].id}` : '';
      const data = await (await fetch(`/apis/grids?limit=${SCROLL_BATCH_SIZE}${afterParam}`)).json();

      // Intentional to not use (prev) => setState([...prev, ...data]) here
      // As the fetch was based on the assumption of a certain snapshot of grids
      setGrids([...grids, ...data]);
    } catch (ex) {
      enqueueSnackbar({
        message: 'Failed to load more data! Try refreshing the page.',
        variant: 'error',
        key: 'loadingDataError',
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    } finally {
      setIsLoadingMore(false)
    }
  }, [grids]);

  const [ref] = useInView({
    onChange: onInView,
    triggerOnce: true,
    threshold: 0.5,
  });

  return <SnackbarProvider>
    <div className="w-full flex-wrap flex gap-10 items-center justify-center">
      {grids.map((grid, idx) => (
        <Link
          key={grid.id}
          href={`puzzle/${grid.id}`}
          className="min-w-[200px] w-1/4 py-2 px-3 hover:scale-125 transition-transform font-medium text-base"
          {...(idx === grids.length - 1 ? {ref} : {})}
        >
          <Grid previewMode grid={grid.puzzle}/>
        </Link>
      ))}
    </div>
    {isLoadingMore && <Loading />}
  </SnackbarProvider>
}

export default ClientGridPreviews;
