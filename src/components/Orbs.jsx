// Ambient gradient orb backgrounds, purely decorative.
export default function Orbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-float absolute -left-20 top-10 h-64 w-64 rounded-full bg-orchid/30 blur-3xl" />
      <div className="animate-floatAlt absolute -right-24 top-40 h-72 w-72 rounded-full bg-rose/25 blur-3xl" />
      <div className="animate-float absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-blush/20 blur-3xl" />
    </div>
  )
}
