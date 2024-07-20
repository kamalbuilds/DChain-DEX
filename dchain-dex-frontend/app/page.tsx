import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Decentralized Trading on Dchain
                  </div>
                  <div className="max-w-[600px] text-muted-foreground md:text-xl">
                    Swap any token, add or remove liquidity, and convert to ETH - all on our secure, decentralized
                    exchange.
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Start Trading
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Add Liquidity
                  </Link>
                </div>
              </div>
              <div className="mx-auto  overflow-hidden rounded-xl object-contain sm:w-full lg:order-last lg:aspect-square">
                <img
                  src="/landing.png"
                  width="550"
                  height="550"
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <div className="text-3xl font-bold tracking-tighter sm:text-5xl">Decentralized Trading Made Easy</div>
                <div className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dchain DEX offers a seamless and secure trading experience, with features like token swapping,
                  liquidity management, and the ability to convert any token to ETH.
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
                <img
                  src="/swap.png"
                  width="550"
                  height="310"
                  alt="Token Swapping"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Token Swapping</h3>
                  <p className="text-muted-foreground">
                    Easily swap any token on the Dchain network. Our decentralized exchange ensures fast, secure, and
                    transparent transactions.
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Liquidity Management</h3>
                  <p className="text-muted-foreground">
                    Add or remove liquidity to the Dchain DEX, earning rewards for providing market depth and stability.
                  </p>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full">
                <img
                  src="/landing.png"
                  width="550"
                  height="310"
                  alt="Liquidity Management"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="mx-auto overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last">
                <img
                  src="/ethtotoken.png"
                  width="550"
                  height="310"
                  alt="Token to ETH Conversion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Token to ETH Conversion</h3>
                  <p className="text-muted-foreground">
                    Convert any token on the Dchain network to Ethereum (ETH) with just a few clicks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Dchain DEX</div>
                <div className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore Our Token Pairs and Liquidity
                </div>
                <div className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out the latest token pairs, trading volume, and liquidity on the Dchain DEX.
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Top Token Pairs</h3>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <EclipseIcon className="h-6 w-6" />
                        <span>ETH/USDC</span>
                      </div>
                      <div className="text-muted-foreground">$12.3M</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BitcoinIcon className="h-6 w-6" />
                        <span>BTC/USDT</span>
                      </div>
                      <div className="text-muted-foreground">$9.7M</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CircleDashedIcon className="h-6 w-6" />
                        <span>DCHAIN/ETH</span>
                      </div>
                      <div className="text-muted-foreground">$7.5M</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function BitcoinIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>
  )
}


function CircleDashedIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
      <path d="M13.9 21.818a10 10 0 0 1-3.8 0" />
      <path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" />
      <path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
      <path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" />
      <path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
      <path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
      <path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" />
    </svg>
  )
}


function EclipseIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
    </svg>
  )
}


function XIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}