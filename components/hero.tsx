import { BackgroundLines } from "@/components/ui/background-lines"

export function Hero() {
  return (
    <BackgroundLines className="flex w-full flex-col items-center justify-center px-4">
      <h2 className="relative z-20 bg-linear-to-b from-neutral-900 to-neutral-700 bg-clip-text py-2 text-center font-sans text-2xl font-bold tracking-tight text-transparent md:py-10 md:text-4xl lg:text-7xl dark:from-neutral-600 dark:to-white">
        UWL Food Ordering, <br /> <span className="text-chart-3">Team 7</span>
      </h2>
      <p className="mx-auto max-w-xl text-center text-sm text-neutral-700 md:text-lg dark:text-neutral-400">
        A food ordering app, anytime anywhere!! Study hard, eat well. Your
        campus food hub.
      </p>
    </BackgroundLines>
  )
}
