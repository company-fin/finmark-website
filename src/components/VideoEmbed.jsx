import { useState } from 'react'
import { Play } from 'lucide-react'

/**
 * Click-to-play YouTube embed.
 *
 * The player is NOT loaded until someone actually clicks. A YouTube iframe
 * pulls in several hundred KB of third-party JS and sets cookies on load,
 * which would undo most of the work that took this site from 375KB to 213KB.
 * Until the click there is one image on the page and nothing else.
 *
 * Uses youtube-nocookie.com so no tracking cookie is set for visitors who
 * never press play.
 *
 * Props:
 *   - youtubeId   the id from the watch URL (the v= part)
 *   - title       accessible name, also the tooltip
 *   - poster      optional self-hosted still. Falls back to YouTube's
 *                 thumbnail, which costs one request to i.ytimg.com.
 *   - placeholder render an empty frame when there is no id yet, so the
 *                 layout can be reviewed before the video exists. Never
 *                 pass this on a page that is publicly reachable — an empty
 *                 video box reads as broken.
 */
export default function VideoEmbed({ youtubeId, title, poster, placeholder = false }) {
  const [playing, setPlaying] = useState(false)

  if (!youtubeId) {
    if (!placeholder) return null
    return (
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] aspect-video">
        <div className="text-center">
          <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-electric/40 to-purple/40">
            <Play size={26} className="ml-1 text-white/70" fill="currentColor" />
          </span>
          <p className="font-display text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-1 text-xs text-gray-600">Video coming soon</p>
        </div>
      </div>
    )
  }

  const thumbnail = poster || `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-dark-card aspect-video">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            // maxresdefault only exists for videos uploaded at 1080p or above;
            // below that YouTube 404s it and the frame renders broken. hqdefault
            // is always generated, so fall back to it once.
            onError={(e) => {
              if (poster || e.currentTarget.dataset.fallback) return
              e.currentTarget.dataset.fallback = '1'
              e.currentTarget.src = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-85"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-electric to-purple shadow-lg shadow-electric/30 transition-transform group-hover:scale-105">
              <Play size={26} className="ml-1 text-white" fill="currentColor" />
            </span>
          </span>
          <span className="absolute bottom-0 left-0 right-0 p-5 text-left">
            <span className="block font-display text-sm sm:text-base font-medium text-white">
              {title}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
