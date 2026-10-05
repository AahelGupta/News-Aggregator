import useOnlineStatus from '../hooks/useOnlineStatus'

export default function OfflineBanner() {
  if (useOnlineStatus()) return null
  return <p role="status" className="bg-flare p-2 text-center font-medium text-black">You’re offline. Recently loaded articles are still available.</p>
}
