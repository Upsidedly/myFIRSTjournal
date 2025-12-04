export default function ConstructionCard() {
  return (
    <div className="relative overflow-hidden bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-6 my-6">
      {/* Subtle diagonal stripes background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #d97706 0px,
            #d97706 8px,
            transparent 8px,
            transparent 16px
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className="!font-normal text-amber-800 dark:text-amber-300">🚧 Under Development</h3>
          <p className="text-amber-700 dark:text-amber-400 font-semibold">This section is currently being built — check in another time!</p>
      </div>
    </div>
  )
}
