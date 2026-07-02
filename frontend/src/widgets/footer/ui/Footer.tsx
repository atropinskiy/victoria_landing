export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} My App. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
