import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Glow, GlowCapture } from "@codaworks/react-glow";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-nb text-center">
      <h1 className="text-n7 font-sans text-lg mb-4">Spikes Web 3 Experiments</h1>

      <div className="max-w-2xl px-8 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <Link href="/wishlist">  <Button>  Wishlistdd </Button> </Link>

        </div>
      </div>

      <GlowCapture className="flex flex-row gap-4">
        <Glow className="p-10 border-orange-700" color='purple'>
          <span className='text-primary  glow:bg-green-700'>
            This will glow purple when the mouse is passed over
          </span>
        </Glow>
        <Glow className="p-10" color='purple'>
          <span className='text-primary  glow:bg-green-700'>
            This will glow purple when the mouse is passed over
          </span>
        </Glow>
      </GlowCapture>


    </div>

  );
}