import { Suspense } from "react";
import Loading from "@/app/loading";
import GridPreviews from "@/app/GridPreviews";

export default function LandingPage() {
  return (
    <div className="h-full justify-center flex-1 p-10 max-w-3xl">
      <h2 className="text-5xl text-center font-bold mx-auto mb-7 leading-relaxed">
        Sudoku
      </h2>
      <div className="w-full flex-wrap flex gap-10 items-center justify-center">
        <Suspense fallback={<Loading />}>
          <GridPreviews />
        </Suspense>
      </div>
    </div>
  )
}